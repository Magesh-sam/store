import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "user" | "admin" | "";

interface User {
	id: number;
	username: string;
	email: string;
	role: Role;
	created_at: string;
}

interface AuthState extends User {
	setUser: (user: User) => void;
	logout: () => void;
}

const initialState: User = {
	id: 0,
	username: "",
	email: "",
	role: "",
	created_at: "",
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			...initialState,

			setUser: (user) => set(user),

			logout: () => set(initialState),
		}),
		{
			name: "auth-storage",
		},
	),
);
