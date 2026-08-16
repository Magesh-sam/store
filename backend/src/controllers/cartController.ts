import type { Request, Response, NextFunction } from 'express';
import { cartItemSchema, updateCartItemSchema } from '../validators/cartValidator.js';
import * as cartService from '../services/cartService.js';

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const cart = await cartService.getCart(userId);
    res.status(200).json({ success: true, ...cart });
  } catch (error) {
    next(error);
  }
};

export const addItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const validatedData = cartItemSchema.parse(req.body);
    const item = await cartService.addItem(userId, validatedData.product_id, validatedData.quantity);
    res.status(200).json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const productId = parseInt((req.params.productId as string), 10);
    const validatedData = updateCartItemSchema.parse(req.body);
    const item = await cartService.updateItemQuantity(userId, productId, validatedData.quantity);
    res.status(200).json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

export const removeItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const productId = parseInt((req.params.productId as string), 10);
    await cartService.removeItem(userId, productId);
    res.status(200).json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    await cartService.clearCart(userId);
    res.status(200).json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    next(error);
  }
};
