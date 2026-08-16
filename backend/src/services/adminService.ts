import * as adminRepo from '../repositories/adminRepository.js';

export const getUsers = async () => {
  return await adminRepo.getAllUsers();
};

export const getOrders = async () => {
  return await adminRepo.getAllOrders();
};
