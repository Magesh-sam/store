import { Router } from 'express';
import * as categoryController from '../controllers/categoryController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();

// Only admin can create, update, delete categories
router.post('/', authenticate, authorize(['admin']), categoryController.createCategory);
router.put('/:id', authenticate, authorize(['admin']), categoryController.updateCategory);
router.delete('/:id', authenticate, authorize(['admin']), categoryController.deleteCategory);

// Anyone can view categories
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);

export default router;
