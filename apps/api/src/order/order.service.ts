/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtUser } from '@src/common/decorators/jwt-user.decorator';
import { DatabaseService } from '@src/database/database.service';
import { CreateOrderDto } from './schemas/create-order.schema';
import Stripe from 'stripe';
import { ShippingMethod } from '@generated/prisma/enums';

type MinimalCartKeys = 'q' | 'i' | 'p';

export interface StripePaymentIntent {
  metadata?: {
    userId?: string;
    cart?: string;
    shippingMethod?: string;
  };
  shipping?: {
    name?: string;
    phone?: string;
    address?: {
      city?: string;
      country?: string;
      line1?: string;
      line2?: string;
      postal_code?: string;
      state?: string;
    };
  };
  receipt_email?: string | null;
}

export interface StripeWebhookEvent {
  type: string;
  data: {
    object: StripePaymentIntent;
  };
}

@Injectable()
export class OrderService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  constructor(private readonly databaseService: DatabaseService) {}

  async createOrder(user: JwtUser, createOrderDto: CreateOrderDto) {
    const { shipping, items, contact, address } = createOrderDto;

    const newOrder = await this.databaseService.order.create({
      data: {
        userId: user.userId,
        shipping,
        items: {
          create: items,
        },
        contact: {
          create: contact,
        },
        address: {
          create: address,
        },
      },
      include: {
        items: true,
        contact: true,
        address: true,
      },
    });

    return newOrder;
  }

  async getAll(user: JwtUser) {
    return this.databaseService.order.findMany({
      where: { userId: user.userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                genres: true,
              },
            },
          },
        },
      },
    });
  }

  async getOne(user: JwtUser, id: number) {
    return this.databaseService.order.findFirst({
      where: { id, userId: user.userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                genres: true,
              },
            },
          },
        },
        address: true,
        contact: true,
      },
    });
  }

  async createPaymentIntent(user: JwtUser, shippingMethod: ShippingMethod) {
    const profile = await this.databaseService.profile.findFirst({
      where: { userId: user.userId },
      include: {
        cartProducts: {
          include: { product: true },
        },
      },
    });

    if (!profile || !profile.cartProducts.length) {
      throw new BadRequestException('Cart is empty');
    }

    // subtotal means sum of all products prices
    const subtotal =
      profile.cartProducts.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
      }, 0) * 100; // Stripe works in cents

    let shippingPrice = 0; // in cents

    switch (shippingMethod) {
      case 'EXPRESS_SHIPPING':
        shippingPrice = 15 * 100;
        break;
      case 'PICK_UP':
        shippingPrice = -10 * 100;
        break;
      default:
        break;
    }

    const total = subtotal + shippingPrice;

    const minimalCart = profile.cartProducts.map((item) => ({
      i: item.productId,
      q: item.quantity,
      p: item.product.price,
    }));

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: user.userId.toString(),
        cart: JSON.stringify(minimalCart),
        shippingMethod: shippingMethod,
      },
    });

    return { clientSecret: paymentIntent.client_secret };
  }

  async handleWebhook(signature: string, payload: Buffer) {
    let event: StripeWebhookEvent;

    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string,
      ) as unknown as StripeWebhookEvent;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);

      throw new BadRequestException(`Webhook Error: ${errorMessage}`);
    }

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const { shipping, metadata, receipt_email } = paymentIntent;

      const userId = metadata?.userId ? parseInt(metadata.userId, 10) : null;

      const cartItems: Record<MinimalCartKeys, number>[] = metadata?.cart
        ? JSON.parse(metadata.cart)
        : [];

      if (userId && cartItems.length > 0) {
        await this.databaseService.$transaction(async (tx) => {
          // 1. Create order
          await tx.order.create({
            data: {
              userId,
              status: 'PAID',
              shipping:
                (metadata?.shippingMethod as ShippingMethod) || 'FREE_SHIPPING', // Parsed from metadata
              items: {
                create: cartItems.map((item) => ({
                  productId: item.i,
                  quantity: item.q,
                  priceAtPurchase: item.p,
                })),
              },
              contact: {
                create: {
                  firstName: shipping?.name?.split(' ')[0] || 'Unknown',
                  lastName:
                    shipping?.name?.split(' ').slice(1).join(' ') || 'Unknown',
                  email: receipt_email || 'unknown@example.com',
                  phone: shipping?.phone || '000000000',
                },
              },
              address: {
                create: {
                  country: shipping?.address?.country || 'US',
                  city: shipping?.address?.city || 'Unknown',
                  street: shipping?.address?.line1 || 'Unknown',
                  zip: shipping?.address?.postal_code || '00000',
                },
              },
            },
          });

          // 2. Clear cart
          const profile = await tx.profile.findFirst({ where: { userId } });

          if (profile) {
            await tx.cartProduct.deleteMany({
              where: { profileId: profile.id },
            });
          }
        });
      }
    }

    return { received: true };
  }
}
