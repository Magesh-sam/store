import type { Request, Response, NextFunction } from 'express';
import * as orderService from '../services/orderService.js';

export const checkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const order = await orderService.checkoutCart(userId);
    res.status(201).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const orders = await orderService.getUserOrders(userId);
    res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};
