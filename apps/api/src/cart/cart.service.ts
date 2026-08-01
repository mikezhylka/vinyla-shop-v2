import { CartItemResponse } from '@monorepo/shared-types';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtUser } from '@src/common/decorators/jwt-user.decorator';
import { DatabaseService } from '@src/database/database.service';

@Injectable()
export class CartService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getCart(user: JwtUser): Promise<CartItemResponse[]> {
    const profile = await this.databaseService.profile.findFirst({
      where: { userId: user.userId },
      include: {
        cartProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!profile) {
      throw new UnauthorizedException();
    }

    return profile.cartProducts.map((item) => ({
      cartItemId: item.id,
      quantity: item.quantity,
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      photo: item.product.photo,
    }));
  }

  async addToCart(productId: number, user: JwtUser) {
    const findProduct = await this.databaseService.product.findFirst({
      where: { id: productId },
    });

    if (!findProduct) throw new BadRequestException('Product was not found.');

    return this.databaseService.cartProduct.upsert({
      where: {
        profileId_productId: {
          profileId: user.profileId,
          productId: productId,
        },
      },
      create: {
        profileId: user.profileId,
        productId: productId,
        quantity: 1,
      },
      update: {
        quantity: { increment: 1 },
      },
    });
  }

  async clearCart(user: JwtUser) {
    return this.databaseService.cartProduct.deleteMany({
      where: { profileId: user.profileId },
    });
  }

  async removeFromCart(productId: number, user: JwtUser) {
    const findProduct = await this.databaseService.product.findFirst({
      where: { id: productId },
    });

    if (!findProduct) throw new BadRequestException('Product was not found.');

    return this.databaseService.cartProduct.delete({
      where: {
        profileId_productId: {
          profileId: user.profileId,
          productId: productId,
        },
      },
    });
  }

  async updateQuantity(productId: number, quantity: number, user: JwtUser) {
    const findProduct = await this.databaseService.product.findFirst({
      where: { id: productId },
    });

    if (!findProduct) throw new BadRequestException('Product was not found.');

    return this.databaseService.cartProduct.update({
      where: {
        profileId_productId: {
          profileId: user.profileId,
          productId: productId,
        },
      },
      data: {
        quantity,
      },
    });
  }
}
