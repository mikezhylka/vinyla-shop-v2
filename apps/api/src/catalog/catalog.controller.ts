import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogQueryDto } from './dto/catalog-query.dto';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('genres')
  findGenres() {
    return this.catalogService.findGenres();
  }

  @Get('search')
  findProducts(@Query() query: CatalogQueryDto) {
    return this.catalogService.findProducts(query);
  }

  @Get('recommendations/:productId')
  findRecommendations(@Param('productId', ParseIntPipe) productId: number) {
    return this.catalogService.findRecommendations(productId);
  }

  @Get('popular-products')
  findPopularProducts() {
    return this.catalogService.findPopularProducts();
  }
}
