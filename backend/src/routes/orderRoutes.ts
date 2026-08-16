import { Router } from 'express';
import * as orderController from '../controllers/orderController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticate);

router.post('/checkout', orderController.checkout);
router.get('/me', orderController.getMyOrders);

export default router;
