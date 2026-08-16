import * as wishlistRepo from '../repositories/wishlistRepository.js';

export const addProductToWishlist = async (userId: number, productId: number) => {
  return await wishlistRepo.addToWishlist(userId, productId);
};

export const removeProductFromWishlist = async (userId: number, productId: number) => {
  await wishlistRepo.removeFromWishlist(userId, productId);
};

export const getUserWishlist = async (userId: number) => {
  return await wishlistRepo.getWishlist(userId);
};
