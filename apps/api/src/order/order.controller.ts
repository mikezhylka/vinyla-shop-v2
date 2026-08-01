import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  ParseIntPipe,
  Req,
  Headers,
  BadRequestException,
  RawBodyRequest,
} from '@nestjs/common';
import { Request } from 'express';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { JwtUser } from '@src/common/decorators/jwt-user.decorator';
import { CreateOrderDto } from './schemas/create-order.schema';
import { ShippingMethod } from '@generated/prisma/enums';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createOrder(
    @JwtUser() user: JwtUser,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.createOrder(user, createOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-payment-intent')
  async createPaymentIntent(
    @JwtUser() user: JwtUser,
    @Body('shippingMethod') shippingMethod: ShippingMethod,
  ) {
    return this.orderService.createPaymentIntent(user, shippingMethod);
  }

  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    if (!signature || !req.rawBody) {
      throw new BadRequestException('Missing stripe signature or raw body');
    }
    return this.orderService.handleWebhook(signature, req.rawBody);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-all')
  async getAll(@JwtUser() user: JwtUser) {
    return this.orderService.getAll(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(
    @JwtUser() user: JwtUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.orderService.getOne(user, id);
  }
}
