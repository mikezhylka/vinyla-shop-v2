import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtUser } from '@src/common/decorators/jwt-user.decorator';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add/:productId')
  async addToCart(
    @Param('productId', ParseIntPipe) productId: number,
    @JwtUser() user: JwtUser,
  ) {
    return this.cartService.addToCart(productId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCart(@JwtUser() user: JwtUser) {
    return this.cartService.getCart(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-quantity/:productId')
  async updateQuantity(
    @Param('productId', ParseIntPipe) productId: number,
    @Body('quantity', ParseIntPipe) quantity: number,
    @JwtUser() user: JwtUser,
  ) {
    return this.cartService.updateQuantity(productId, quantity, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:productId')
  async removeFromCart(
    @Param('productId', ParseIntPipe) productId: number,
    @JwtUser() user: JwtUser,
  ) {
    return this.cartService.removeFromCart(productId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('clear')
  async clearCart(@JwtUser() user: JwtUser) {
    return this.cartService.clearCart(user);
  }
}
