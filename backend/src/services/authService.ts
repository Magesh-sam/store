import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "../repositories/userRepository.js";

export const registerUser = async (
  username: string,
  email: string,
  passwordPlain: string,
) => {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    const error: any = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(passwordPlain, saltRounds);

  const newUser = await createUser(username, email, passwordHash);

  return { user: newUser };
};

export const loginUser = async (email: string, passwordPlain: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    const error: any = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(passwordPlain, user.password);

  if (!isPasswordValid) {
    const error: any = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const { password, ...userWithoutPassword } = user;

  return { user: userWithoutPassword };
};
