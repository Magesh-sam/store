import type { Request, Response, NextFunction } from 'express';
import * as adminService from '../services/adminService.js';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await adminService.getUsers();
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await adminService.getOrders();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};
