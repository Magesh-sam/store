import { Router } from 'express';
import * as reviewController from '../controllers/reviewController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router({ mergeParams: true }); // Merge params to get productId from parent router

router.post('/', authenticate, reviewController.addReview);
router.get('/', reviewController.getProductReviews);
router.put('/:id', authenticate, reviewController.updateReview);
router.delete('/:id', authenticate, reviewController.deleteReview);

export default router;
