import * as orderRepo from '../repositories/orderRepository.js';

export const checkoutCart = async (userId: number) => {
  try {
    return await orderRepo.checkout(userId);
  } catch (error: any) {
    error.statusCode = 400; // Bad Request due to stock issue or empty cart
    throw error;
  }
};

export const getUserOrders = async (userId: number) => {
  const orders = await orderRepo.getOrdersByUser(userId);
  
  // optionally attach items to each order
  for (const order of orders) {
    order.items = await orderRepo.getOrderItems(order.id);
  }
  
  return orders;
};
