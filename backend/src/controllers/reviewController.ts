import type { Request, Response, NextFunction } from 'express';
import { reviewSchema } from '../validators/reviewValidator.js';
import * as reviewService from '../services/reviewService.js';

export const addReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const productId = parseInt((req.params.productId as string), 10);
    const validatedData = reviewSchema.parse(req.body);
    const review = await reviewService.addReview(userId, productId, validatedData.rating, validatedData.comment);
    res.status(201).json({ success: true, review });
  } catch (error) {
    next(error);
  }
};

export const getProductReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = parseInt((req.params.productId as string), 10);
    const reviews = await reviewService.getProductReviews(productId);
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const id = parseInt((req.params.id as string), 10);
    const validatedData = reviewSchema.parse(req.body);
    const review = await reviewService.updateOwnReview(id, userId, validatedData.rating, validatedData.comment);
    res.status(200).json({ success: true, review });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const id = parseInt((req.params.id as string), 10);
    await reviewService.deleteOwnReview(id, userId);
    res.status(200).json({ success: true, message: 'Review deleted' });
  } catch (error) {
    next(error);
  }
};
