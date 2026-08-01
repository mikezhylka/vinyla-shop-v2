import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { JwtUser } from '@src/common/decorators/jwt-user.decorator';
import { ProductService } from './product.service';
import { CreateCommentDto, ReplyCommentDto } from '@monorepo/shared-types';
import { ZodValidationPipe } from '@src/common/decorators/zod-validation-pipe.decorator';
import {
  CreateProductDto,
  CreateProductSchema,
} from './schemas/create-product.schema';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(new BadRequestException('Only images allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ZodValidationPipe(CreateProductSchema))
    createProductDto: CreateProductDto,
  ) {
    return this.productService.createProduct(file, createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-comment/:productId')
  createComment(
    @JwtUser() user: JwtUser,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.productService.createComment(user, productId, createCommentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('reply-on-comment/:productId')
  replyOnComment(
    @JwtUser() user: JwtUser,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() replyCommentDto: ReplyCommentDto,
  ) {
    return this.productService.replyOnComment(user, productId, replyCommentDto);
  }

  @Post('upload-photo')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(new BadRequestException('Only images allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    const uploaded = await this.productService.uploadPhoto(file);

    return { url: uploaded.secure_url };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-comment/:commentId')
  deleteComment(
    @JwtUser() user: JwtUser,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return this.productService.deleteComment(user, commentId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
