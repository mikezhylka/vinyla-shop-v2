import { z } from 'zod';

export const CreateProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  label: z.string().min(1, 'Label is required'),
  barcode: z.string().min(1, 'Barcode is required'),
  price: z.coerce.number().int().positive('Price must be a positive integer'),
});

export type CreateProductDto = z.infer<typeof CreateProductSchema>;
