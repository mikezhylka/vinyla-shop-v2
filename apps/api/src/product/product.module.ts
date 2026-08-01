import { Module } from '@nestjs/common';
import { CloudinaryService } from '@src/cloudinary/cloudinary.service';
import { DatabaseService } from '@src/database/database.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  providers: [ProductService, DatabaseService, CloudinaryService],
  controllers: [ProductController],
})
export class ProductModule {}
