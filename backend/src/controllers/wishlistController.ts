import type { Request, Response, NextFunction } from 'express';
import * as wishlistService from '../services/wishlistService.js';

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const productId = parseInt(req.body.product_id, 10);
    await wishlistService.addProductToWishlist(userId, productId);
    res.status(200).json({ success: true, message: 'Added to wishlist' });
  } catch (error) {
    next(error);
  }
};

export const removeProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const productId = parseInt((req.params.productId as string), 10);
    await wishlistService.removeProductFromWishlist(userId, productId);
    res.status(200).json({ success: true, message: 'Removed from wishlist' });
  } catch (error) {
    next(error);
  }
};

export const getWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const items = await wishlistService.getUserWishlist(userId);
    res.status(200).json({ success: true, items });
  } catch (error) {
    next(error);
  }
};
