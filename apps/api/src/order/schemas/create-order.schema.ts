import { z } from 'zod';

export const CreateOrderSchema = z.object({
  shipping: z.enum(['FREE_SHIPPING', 'EXPRESS_SHIPPING', 'PICK_UP']),

  items: z
    .array(
      z.object({
        productId: z.number().int().positive(),
        quantity: z.number().int().positive().default(1),
        priceAtPurchase: z.number().int().nonnegative(),
      }),
    )
    .min(1, 'Order must contain at least one product'),

  contact: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    phone: z.string().min(1, 'Phone is required'),
    email: z.string().email('Invalid email'),
  }),

  address: z
    .object({
      country: z.string().min(1, 'Country is required'),
      city: z.string().min(1, 'City is required'),
      street: z.string().min(1, 'Street is required'),
      zip: z.string().min(1, 'ZIP code is required'),
    })
    .optional(),
});

export type CreateOrderDto = z.infer<typeof CreateOrderSchema>;
