import type { Request, Response, NextFunction } from 'express';
import { createCategorySchema, updateCategorySchema } from '../validators/categoryValidator.js';
import * as categoryService from '../services/categoryService.js';

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createCategorySchema.parse(req.body);
    const category = await categoryService.createCategory(validatedData.name, validatedData.description);
    res.status(201).json({ success: true, category });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt((req.params.id as string), 10);
    const category = await categoryService.getCategoryById(id);
    res.status(200).json({ success: true, category });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt((req.params.id as string), 10);
    const validatedData = updateCategorySchema.parse(req.body);
    const category = await categoryService.updateCategory(id, validatedData.name, validatedData.description);
    res.status(200).json({ success: true, category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt((req.params.id as string), 10);
    await categoryService.deleteCategory(id);
    res.status(200).json({ success: true, message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
};
