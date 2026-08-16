import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";

function Protected({ children }: { children: ReactNode }) {
	const username = useAuthStore((state) => state.username);
	if (!username) return <Navigate to="/login" replace />;

	return <>{children}</>;
}

export default Protected;
