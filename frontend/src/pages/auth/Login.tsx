import { Navigate } from "react-router";
import LoginForm from "@/components/shared/LoginForm";
import { useAuthStore } from "@/store/useAuthStore";

export default function Page() {
	const auth = useAuthStore((state) => state);
	if (auth.username) return <Navigate to="/" replace />;

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<LoginForm />
			</div>
		</div>
	);
}
