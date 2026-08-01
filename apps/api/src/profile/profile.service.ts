import { ClientProfile } from '@monorepo/shared-types';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CloudinaryService } from '@src/cloudinary/cloudinary.service';
import { JwtUser } from '@src/common/decorators/jwt-user.decorator';
import { PrismaTransaction } from '@src/common/types/prisma-transaction.type';
import { DatabaseService } from '@src/database/database.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(data: { name: string; userId: number }, tx?: PrismaTransaction) {
    const db = tx ?? this.databaseService;

    return db.profile.create({ data });
  }

  async addToWishlist(user: JwtUser, id: number) {
    const findUser = await this.databaseService.user.findFirst({
      where: { id: user.userId },
    });

    if (!findUser) throw new UnauthorizedException();

    const findProduct = await this.databaseService.product.findFirst({
      where: { id },
    });

    if (!findProduct) throw new BadRequestException('Product was not found.');

    const profile = await this.databaseService.profile.findFirst({
      where: { userId: user.userId },
    });

    if (!profile) throw new BadRequestException('Profile was not found.');

    await this.databaseService.profile.update({
      where: { id: profile.id },
      data: {
        favorites: {
          connect: { id },
        },
      },
    });

    return { success: true };
  }

  async updateName(userId: number, name: string): Promise<ClientProfile> {
    const profile = await this.databaseService.profile.update({
      where: { userId },
      data: { name },
      select: {
        id: true,
        name: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    return profile;
  }

  async updateAvatar(user: JwtUser, file: Express.Multer.File) {
    const uploaded = await this.cloudinaryService.uploadFile(file, 'avatars');

    const profile = await this.databaseService.profile.update({
      where: { id: user.profileId },
      data: {
        avatar: uploaded.secure_url,
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    return profile;
  }

  async getMe(user: JwtUser) {
    const profile = await this.databaseService.profile.findUnique({
      where: { userId: user.userId },
      select: {
        id: true,
        name: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        // userId: false
        user: {
          select: { email: true },
        },
      },
    });

    if (!profile) {
      throw new UnauthorizedException();
    }

    return profile;
  }

  async getWishlist(user: JwtUser) {
    const profile = await this.databaseService.profile.findFirst({
      where: { userId: user.userId },
      include: {
        favorites: true,
      },
    });

    if (!profile) {
      throw new UnauthorizedException();
    }

    return profile.favorites;
  }

  async getWishlistIds(user: JwtUser) {
    const profile = await this.databaseService.profile.findFirst({
      where: { userId: user.userId },
      select: {
        favorites: { select: { id: true } },
      },
    });

    if (!profile) {
      throw new UnauthorizedException();
    }

    return profile.favorites.map((favorite) => favorite.id);
  }

  async removeFromWishlist(user: JwtUser, id: number) {
    const findProduct = await this.databaseService.product.findFirst({
      where: { id },
    });

    if (!findProduct) throw new BadRequestException('Product was not found.');

    const profile = await this.databaseService.profile.findFirst({
      where: { userId: user.userId },
    });

    if (!profile) throw new BadRequestException('Profile was not found.');

    await this.databaseService.profile.update({
      where: { id: profile.id },
      data: {
        favorites: {
          disconnect: { id },
        },
      },
    });

    return { success: true };
  }
}
