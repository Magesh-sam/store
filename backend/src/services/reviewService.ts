import * as reviewRepo from '../repositories/reviewRepository.js';

export const addReview = async (userId: number, productId: number, rating: number, comment?: string) => {
  try {
    return await reviewRepo.addReview(userId, productId, rating, comment);
  } catch (error: any) {
    if (error.code === '23505') { // Unique constraint violation (user_id, product_id)
      error.message = 'You have already reviewed this product';
      error.statusCode = 400;
    }
    throw error;
  }
};

export const getProductReviews = async (productId: number) => {
  return await reviewRepo.getReviewsByProduct(productId);
};

export const updateOwnReview = async (id: number, userId: number, rating?: number, comment?: string) => {
  const review = await reviewRepo.updateReview(id, userId, rating, comment);
  if (!review) {
    const error: any = new Error('Review not found or not authorized to update');
    error.statusCode = 404;
    throw error;
  }
  return review;
};

export const deleteOwnReview = async (id: number, userId: number) => {
  const review = await reviewRepo.deleteReview(id, userId);
  if (!review) {
    const error: any = new Error('Review not found or not authorized to delete');
    error.statusCode = 404;
    throw error;
  }
};
