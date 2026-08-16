import * as categoryRepo from '../repositories/categoryRepository.js';

export const createCategory = async (name: string, description?: string) => {
  return await categoryRepo.createCategory(name, description);
};

export const getCategories = async () => {
  return await categoryRepo.getCategories();
};

export const getCategoryById = async (id: number) => {
  const category = await categoryRepo.getCategoryById(id);
  if (!category) {
    const error: any = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }
  return category;
};

export const updateCategory = async (id: number, name?: string, description?: string) => {
  const category = await categoryRepo.updateCategory(id, name, description);
  if (!category) {
    const error: any = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }
  return category;
};

export const deleteCategory = async (id: number) => {
  const category = await categoryRepo.deleteCategory(id);
  if (!category) {
    const error: any = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }
  return category;
};
