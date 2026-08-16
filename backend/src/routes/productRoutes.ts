import { Router } from 'express';
import * as productController from '../controllers/productController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import reviewRoutes from './reviewRoutes.js';

const router = Router();

router.post('/', authenticate, authorize(['admin']), productController.createProduct);
router.put('/:id', authenticate, authorize(['admin']), productController.updateProduct);
router.delete('/:id', authenticate, authorize(['admin']), productController.deleteProduct);

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Nested routes for reviews
router.use('/:productId/reviews', reviewRoutes);

export default router;
