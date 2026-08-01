import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CatalogQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumberString()
  genre?: string;

  @IsOptional()
  @IsIn(['price_asc', 'price_desc'])
  sort?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;
}
