import { Module } from '@nestjs/common';
import { DatabaseService } from '@src/database/database.service';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

@Module({
  controllers: [CatalogController],
  providers: [CatalogService, DatabaseService],
})
export class CatalogModule {}
