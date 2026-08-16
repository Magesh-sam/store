import * as cartRepo from "../repositories/cartRepository.js";

export const getCart = async (userId: number) => {
  const cart = await cartRepo.getOrCreateCart(userId);
  const items = await cartRepo.getCartItems(cart.id);

  const total = items.reduce(
    (sum: number, item: any) => sum + Number(item.price) * item.quantity,
    0,
  );

  return { cart, items, total };
};

export const addItem = async (
  userId: number,
  productId: number,
  quantity: number,
) => {
  const cart = await cartRepo.getOrCreateCart(userId);
  return await cartRepo.addItemToCart(cart.id, productId, quantity);
};

export const updateItemQuantity = async (
  userId: number,
  productId: number,
  quantity: number,
) => {
  const cart = await cartRepo.getOrCreateCart(userId);
  const updatedItem = await cartRepo.updateCartItemQuantity(
    cart.id,
    productId,
    quantity,
  );
  if (!updatedItem) {
    const error: any = new Error("Item not found in cart");
    error.statusCode = 404;
    throw error;
  }
  return updatedItem;
};

export const removeItem = async (userId: number, productId: number) => {
  const cart = await cartRepo.getOrCreateCart(userId);
  await cartRepo.removeCartItem(cart.id, productId);
};

export const clearCart = async (userId: number) => {
  const cart = await cartRepo.getOrCreateCart(userId);
  await cartRepo.clearCart(cart.id);
};
