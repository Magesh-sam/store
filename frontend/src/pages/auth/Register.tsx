import { Navigate } from "react-router";
import SignupForm from "@/components/shared/SignupForm";
import { useAuthStore } from "@/store/useAuthStore";

function Register() {
	const auth = useAuthStore((state) => state);
	if (auth.username) return <Navigate to="/" replace />;

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<SignupForm />
			</div>
		</div>
	);
}

export default Register;
