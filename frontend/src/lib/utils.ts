import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAuthStore } from "@/store/useAuthStore";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const API = axios.create({ baseURL: apiURL, withCredentials: true });

API.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			originalRequest.url !== "/auth/refresh"
		) {
			originalRequest._retry = true;

			try {
				await API.post("/auth/refresh");

				return API(originalRequest);
			} catch {
				useAuthStore.getState().logout();
			}
		}

		return Promise.reject(error);
	},
);
