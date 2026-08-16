import { useMutation } from "@tanstack/react-query";
import type { LoginUser, RegisterUser } from "@/lib/types";
import { API } from "@/lib/utils";

const register = async (user: RegisterUser) => {
	const { data } = await API.post("/auth/register", user);
	return data;
};

const login = async (user: LoginUser) => {
	const { data } = await API.post("/auth/login", user);
	return data;
};

export function useRegister() {
	return useMutation({
		mutationFn: register,
	});
}
export function useLogin() {
	return useMutation({
		mutationFn: login,
	});
}
