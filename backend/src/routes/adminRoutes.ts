import { Router } from 'express';
import * as adminController from '../controllers/adminController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticate);
router.use(authorize(['admin']));

router.get('/users', adminController.getUsers);
router.get('/orders', adminController.getOrders);

export default router;
