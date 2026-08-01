import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '@src/database/database.service';
import { CatalogQueryDto } from './dto/catalog-query.dto';

const PAGE_SIZE = 12;

@Injectable()
export class CatalogService {
  constructor(private databaseService: DatabaseService) {}

  async findGenres() {
    return this.databaseService.genre.findMany();
  }

  async findRecommendations(productId: number) {
    const currentProduct = await this.databaseService.product.findUnique({
      where: { id: productId },
      include: { genres: true },
    });

    if (!currentProduct) {
      throw new NotFoundException('Product not found');
    }

    if (!currentProduct.genres.length) {
      return [];
    }

    const genreIds = currentProduct.genres.map((genre) => genre.id);

    const spread = 0.4;
    const currentPrice = Number(currentProduct.price);
    const minPrice = currentPrice * (1 - spread);
    const maxPrice = currentPrice * (1 + spread);

    // best scenario: we have found at least 4 recommendations with good filtering of genre + price range
    const recommendations = await this.databaseService.product.findMany({
      where: {
        id: { not: productId },
        genres: {
          some: { id: { in: genreIds } },
        },
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
      take: 8,
    });

    // if 4 products were not found by previous filtering, filter them just by genre
    if (recommendations.length < 4) {
      const altRecommendations = await this.databaseService.product.findMany({
        where: {
          id: { not: productId },
          genres: {
            some: { id: { in: genreIds } },
          },
        },
        take: 8,
      });

      return altRecommendations;
    }

    return recommendations;
  }

  async findProducts(query: CatalogQueryDto) {
    const { search, genre, sort, page } = query;
    const currentPage = Math.max(1, Number(page) || 1);

    const where = {
      ...(search && {
        name: { contains: search, mode: 'insensitive' as const },
      }),
      ...(genre && {
        genres: { some: { id: Number(genre) } },
      }),
    };

    const orderBy =
      sort === 'price_asc'
        ? { price: 'asc' as const }
        : sort === 'price_desc'
          ? { price: 'desc' as const }
          : { id: 'asc' as const };

    const [products, total] = await Promise.all([
      this.databaseService.product.findMany({
        where,
        orderBy,
        skip: (currentPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        include: { genres: true },
      }),
      this.databaseService.product.count({ where }),
    ]);

    return {
      data: products,
      meta: {
        total,
        page: currentPage,
        pageSize: PAGE_SIZE,
        pageCount: Math.ceil(total / PAGE_SIZE),
      },
    };
  }

  async findPopularProducts() {
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

    const orders = await this.databaseService.order.findMany({
      where: {
        createdAt: {
          gte: lastMonthDate,
        },
      },
      include: {
        items: {
          select: {
            productId: true,
            quantity: true,
          },
        },
      },
    });

    const quantities: Record<number, number> = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        quantities[item.productId] =
          (quantities[item.productId] || 0) + item.quantity;
      });
    });

    const topProductIds = Object.entries(quantities)
      .sort(([, qtyA], [, qtyB]) => qtyB - qtyA)
      .slice(0, 4)
      .map(([id]) => Number(id));

    const popularProducts = await this.databaseService.product.findMany({
      where: { id: { in: topProductIds } },
    });

    return popularProducts;
  }
}
