import { Router } from 'express';
import * as wishlistController from '../controllers/wishlistController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticate);

router.get('/', wishlistController.getWishlist);
router.post('/', wishlistController.addProduct);
router.delete('/:productId', wishlistController.removeProduct);

export default router;
