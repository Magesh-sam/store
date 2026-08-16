import { z } from 'zod';

export const cartItemSchema = z.object({
  product_id: z.number().int().positive(),
  quantity: z.number().int().positive().default(1),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().positive(),
});
