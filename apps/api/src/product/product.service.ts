import { Prisma } from '@generated/prisma/client';
import { CreateCommentDto, ReplyCommentDto } from '@monorepo/shared-types';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CloudinaryService } from '@src/cloudinary/cloudinary.service';
import { JwtUser } from '@src/common/decorators/jwt-user.decorator';
import { DatabaseService } from '@src/database/database.service';
import { CreateProductDto } from './schemas/create-product.schema';

@Injectable()
export class ProductService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findOne(id: number) {
    const product = await this.databaseService.product.findUnique({
      where: { id },
      include: {
        comments: {
          include: {
            replies: {
              include: {
                profile: {
                  select: {
                    id: true,
                    name: true,
                    userId: true,
                  },
                },
              },
            },
            profile: {
              select: {
                id: true,
                name: true,
                userId: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async createProduct(
    file: Express.Multer.File,
    createProductDto: CreateProductDto,
  ) {
    const uploaded = await this.cloudinaryService.uploadFile(file, 'products');

    const product = await this.databaseService.product.create({
      data: {
        ...createProductDto,
        photo: uploaded.secure_url,
      },
    });

    return product;
  }

  async createComment(
    user: JwtUser,
    productId: number,
    createCommentDto: CreateCommentDto,
  ) {
    try {
      // Optimization: create the comment directly instead of updating the product.
      return await this.databaseService.comment.create({
        data: {
          ...createCommentDto,
          profileId: user.profileId,
          productId: productId,
        },
        include: {
          profile: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    } catch (error) {
      // Catch foreign key violation error (if a non-existent productId was passed)
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        (error.code === 'P2025' || error.code === 'P2003')
      ) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }
      throw new BadRequestException('Something went wrong adding a comment.');
    }
  }

  async replyOnComment(
    user: JwtUser,
    productId: number,
    replyCommentDto: ReplyCommentDto,
  ) {
    try {
      return await this.databaseService.comment.create({
        data: {
          ...replyCommentDto,
          rate: null,
          profileId: user.profileId,
          productId,
        },
        include: {
          profile: {
            select: {
              id: true,
              name: true,
              // avatar: true,
            },
          },
        },
      });
    } catch (error) {
      // Catch foreign key violation error (if a non-existent productId was passed)
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        (error.code === 'P2025' || error.code === 'P2003')
      ) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }
      throw new BadRequestException('Something went wrong adding a comment.');
    }
  }

  async uploadPhoto(file: Express.Multer.File) {
    return await this.cloudinaryService.uploadFile(file, 'products');
  }

  async deleteComment(user: JwtUser, commentId: number) {
    const commentToDelete = await this.databaseService.comment.findUnique({
      where: { id: commentId },
    });

    if (!commentToDelete) {
      throw new NotFoundException('Comment was not found.');
    }

    if (commentToDelete.profileId !== user.profileId) {
      throw new ForbiddenException('No rights to delete the comment.');
    }

    return await this.databaseService.comment.delete({
      where: { id: commentId },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
