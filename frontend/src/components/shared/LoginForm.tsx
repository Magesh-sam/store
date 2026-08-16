import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

const loginSchema = z.object({
	email: z.email("Please enter a valid email address"),
	password: z.string().min(8, "password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
	const { mutate: loginUser, isPending } = useLogin();
	const auth = useAuthStore((state) => state);

	const nav = useNavigate();

	const [isError, setIsError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: LoginFormData) => {
		setIsError(false);

		loginUser(data, {
			onSuccess: (response) => {
				auth.setUser(response.user);

				reset();
				nav("/");
			},
			onError: (error) => {
				setIsError(true);

				if (axios.isAxiosError(error)) {
					setErrorMsg(error.response?.data?.message ?? "Login failed");
				} else {
					setErrorMsg(error.message);
				}

				console.error(error);
			},
		});
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>

								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									{...register("email")}
									onFocus={() => setIsError(false)}
								/>

								{errors.email && (
									<p className="mt-1 text-sm text-red-500">
										{errors.email.message}
									</p>
								)}
							</Field>

							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Password</FieldLabel>

									<a
										href="/"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										Forgot your password?
									</a>
								</div>

								<Input
									id="password"
									type="password"
									{...register("password")}
									onFocus={() => setIsError(false)}
								/>

								{errors.password && (
									<p className="mt-1 text-sm text-red-500">
										{errors.password.message}
									</p>
								)}
							</Field>

							{isError && (
								<p className="rounded-md bg-red-100 p-3 text-sm text-red-600">
									{errorMsg}
								</p>
							)}

							<Field>
								<Button type="submit" className={"w-full"} disabled={isPending}>
									<span className={` ${isPending ? "shimmer " : ""}`}>
										{isPending ? "Logging in..." : "Login"}
									</span>
								</Button>

								<FieldDescription className="mt-4 text-center">
									Don&apos;t have an account?{" "}
									<Link to="/register">Register now!</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

export default LoginForm;
