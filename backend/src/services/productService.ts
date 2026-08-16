import * as productRepo from '../repositories/productRepository.js';

export const createProduct = async (productData: any) => {
  return await productRepo.createProduct(productData);
};

export const getProducts = async (queryData: any) => {
  return await productRepo.getProducts(queryData);
};

export const getProductById = async (id: number) => {
  const product = await productRepo.getProductById(id);
  if (!product) {
    const error: any = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  return product;
};

export const updateProduct = async (id: number, productData: any) => {
  const product = await productRepo.updateProduct(id, productData);
  if (!product) {
    const error: any = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  return product;
};

export const deleteProduct = async (id: number) => {
  const product = await productRepo.deleteProduct(id);
  if (!product) {
    const error: any = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  return product;
};
