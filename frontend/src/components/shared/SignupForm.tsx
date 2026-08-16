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
import { useRegister } from "@/hooks/useAuth";

const registerSchema = z
	.object({
		username: z.string().min(3, "Username must be at least 3 characters"),
		email: z.email("Please enter a valid email address"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string().min(8, "Please confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords do not match",
	});

type RegisterFormData = z.infer<typeof registerSchema>;

function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
	const { mutate: registerUser, isPending } = useRegister();

	const nav = useNavigate();

	const [isError, setIsError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = (data: RegisterFormData) => {
		setIsError(false);

		registerUser(
			{
				username: data.username,
				email: data.email,
				password: data.password,
			},
			{
				onSuccess: () => {
					reset();
					nav("/");
				},
				onError: (error) => {
					setIsError(true);

					if (axios.isAxiosError(error)) {
						setErrorMsg(error.response?.data?.message ?? "Registration failed");
					} else {
						setErrorMsg(error.message);
					}

					console.error(error);
				},
			},
		);
	};

	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>Create an account</CardTitle>
				<CardDescription>
					Enter your information below to create your account
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="username">Full Name</FieldLabel>

							<Input
								id="username"
								type="text"
								placeholder="John Doe"
								{...register("username")}
								onFocus={() => setIsError(false)}
							/>

							{errors.username && (
								<p className="mt-1 text-sm text-red-500">
									{errors.username.message}
								</p>
							)}
						</Field>

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

							<FieldDescription>
								We'll use this to contact you. We will not share your email with
								anyone else.
							</FieldDescription>
						</Field>

						<Field>
							<FieldLabel htmlFor="password">Password</FieldLabel>

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

							<FieldDescription>
								Must be at least 8 characters long.
							</FieldDescription>
						</Field>

						<Field>
							<FieldLabel htmlFor="confirmPassword">
								Confirm Password
							</FieldLabel>

							<Input
								id="confirmPassword"
								type="password"
								{...register("confirmPassword")}
								onFocus={() => setIsError(false)}
							/>

							{errors.confirmPassword && (
								<p className="mt-1 text-sm text-red-500">
									{errors.confirmPassword.message}
								</p>
							)}

							<FieldDescription>Please confirm your password.</FieldDescription>
						</Field>

						{isError && (
							<p className="rounded-md bg-red-100 p-3 text-sm text-red-600">
								{errorMsg}. Please login!
							</p>
						)}

						<Field>
							<Button type="submit" className={"w-full"} disabled={isPending}>
								<span className={` ${isPending ? "shimmer " : ""}`}>
									{isPending ? "Creating Account..." : "Create Account"}
								</span>
							</Button>

							<FieldDescription className="mt-4 text-center">
								Already have an account? <Link to="/login">Login now!</Link>
							</FieldDescription>
						</Field>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}

export default SignupForm;
