import type { Request, Response, NextFunction } from 'express';
import { createProductSchema, updateProductSchema, getProductsQuerySchema } from '../validators/productValidator.js';
import * as productService from '../services/productService.js';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createProductSchema.parse(req.body);
    const product = await productService.createProduct(validatedData);
    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryData = getProductsQuerySchema.parse(req.query);
    const result = await productService.getProducts(queryData);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt((req.params.id as string), 10);
    const product = await productService.getProductById(id);
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt((req.params.id as string), 10);
    const validatedData = updateProductSchema.parse(req.body);
    const product = await productService.updateProduct(id, validatedData);
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt((req.params.id as string), 10);
    await productService.deleteProduct(id);
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};
