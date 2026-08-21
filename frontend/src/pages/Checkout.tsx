import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, CreditCard, MapPin } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { Separator } from "@/components/ui/separator";
import { useGetCart } from "@/hooks/cart/useGetCart";
import { useCheckout } from "@/hooks/orders/useCheckout";
import { cn } from "@/lib/utils";

const checkoutSchema = z.object({
	fullName: z.string().min(2, "Please enter your full name"),
	email: z.email("Please enter a valid email address"),
	phone: z.string().min(10, "Please enter a valid phone number"),
	address: z.string().min(5, "Please enter your address"),
	city: z.string().min(2, "Please enter your city"),
	state: z.string().min(2, "Please enter your state"),
	postalCode: z.string().min(5, "Please enter a valid postal code"),
	cardNumber: z.string().min(16, "Please enter a valid card number"),
	expiry: z.string().min(5, "Enter expiry as MM/YY"),
	cvv: z.string().min(3, "Enter a valid CVV").max(4),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

function Checkout({ className, ...props }: React.ComponentProps<"div">) {
	const navigate = useNavigate();

	const [isError, setIsError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const { data, isLoading } = useGetCart();
	const { mutate: checkout } = useCheckout();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CheckoutFormData>({
		resolver: zodResolver(checkoutSchema),
		defaultValues: {
			fullName: "",
			email: "",
			phone: "",
			address: "",
			city: "",
			state: "",
			postalCode: "",
			cardNumber: "",
			expiry: "",
			cvv: "",
		},
	});
	if (!data) {
		return navigate("/");
	}

	const onSubmit = (data: CheckoutFormData) => {
		setIsError(false);

		try {
			console.log("Checkout data:", data);
			checkout();

			// Process order / payment here
			navigate("/");
		} catch {
			setIsError(true);
			setErrorMsg("Something went wrong. Please try again.");
		}
	};

	if (isLoading) {
		return <p>loading...</p>;
	}
	console.log(data);
	return (
		<div
			className={cn("mx-auto w-full max-w-6xl px-4 py-8", className)}
			{...props}
		>
			<div className="mb-8">
				<Alert variant="destructive" className="mb-5">
					<AlertCircleIcon />
					<AlertTitle>This is a demo of checkout flow.</AlertTitle>
					<AlertDescription>
						This is not a real payment gateway. This mimics a checkout flow.
						Please do not enter your oroginal address and card details.
					</AlertDescription>
				</Alert>
				<h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>
				<p className="text-muted-foreground mt-2">
					Enter your delivery and payment details to complete your order.
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid gap-6 lg:grid-cols-[1fr_380px]">
					<div className="space-y-6">
						<Card>
							<CardHeader>
								<div className="flex items-center gap-2">
									<MapPin className="size-5" />
									<CardTitle>Shipping Address</CardTitle>
								</div>
								<CardDescription>
									Where should we deliver your order?
								</CardDescription>
							</CardHeader>

							<CardContent>
								<FieldGroup>
									<div className="grid gap-4 sm:grid-cols-2">
										<Field>
											<FieldLabel htmlFor="fullName">Full Name</FieldLabel>
											<Input
												id="fullName"
												placeholder="John Doe"
												{...register("fullName")}
											/>
											{errors.fullName && (
												<p className="text-sm text-red-500">
													{errors.fullName.message}
												</p>
											)}
										</Field>

										<Field>
											<FieldLabel htmlFor="phone">Phone Number</FieldLabel>
											<Input
												id="phone"
												type="tel"
												placeholder="+91 9876543210"
												{...register("phone")}
											/>
											{errors.phone && (
												<p className="text-sm text-red-500">
													{errors.phone.message}
												</p>
											)}
										</Field>
									</div>

									<Field>
										<FieldLabel htmlFor="email">Email</FieldLabel>
										<Input
											id="email"
											type="email"
											placeholder="m@example.com"
											{...register("email")}
										/>
										{errors.email && (
											<p className="text-sm text-red-500">
												{errors.email.message}
											</p>
										)}
									</Field>

									<Field>
										<FieldLabel htmlFor="address">Address</FieldLabel>
										<Input
											id="address"
											placeholder="123 Main Street"
											{...register("address")}
										/>
										{errors.address && (
											<p className="text-sm text-red-500">
												{errors.address.message}
											</p>
										)}
									</Field>

									<div className="grid gap-4 sm:grid-cols-3">
										<Field>
											<FieldLabel htmlFor="city">City</FieldLabel>
											<Input
												id="city"
												placeholder="Chennai"
												{...register("city")}
											/>
											{errors.city && (
												<p className="text-sm text-red-500">
													{errors.city.message}
												</p>
											)}
										</Field>

										<Field>
											<FieldLabel htmlFor="state">State</FieldLabel>
											<Input
												id="state"
												placeholder="Tamil Nadu"
												{...register("state")}
											/>
											{errors.state && (
												<p className="text-sm text-red-500">
													{errors.state.message}
												</p>
											)}
										</Field>

										<Field>
											<FieldLabel htmlFor="postalCode">Postal Code</FieldLabel>
											<Input
												id="postalCode"
												placeholder="600001"
												{...register("postalCode")}
											/>
											{errors.postalCode && (
												<p className="text-sm text-red-500">
													{errors.postalCode.message}
												</p>
											)}
										</Field>
									</div>
								</FieldGroup>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<div className="flex items-center gap-2">
									<CreditCard className="size-5" />
									<CardTitle>Payment Details</CardTitle>
								</div>
								<CardDescription>
									Enter your card details securely.
								</CardDescription>
							</CardHeader>

							<CardContent>
								<FieldGroup>
									<Field>
										<FieldLabel htmlFor="cardNumber">Card Number</FieldLabel>
										<Input
											id="cardNumber"
											inputMode="numeric"
											maxLength={19}
											placeholder="1234 5678 9012 3456"
											{...register("cardNumber", {
												onChange: (e) => {
													const value = e.target.value
														.replace(/\D/g, "")
														.slice(0, 16)
														.replace(/(.{4})/g, "$1 ")
														.trim();

													e.target.value = value;
												},
											})}
										/>
										{errors.cardNumber && (
											<p className="text-sm text-red-500">
												{errors.cardNumber.message}
											</p>
										)}
									</Field>

									<div className="grid gap-4 sm:grid-cols-2">
										<Field>
											<FieldLabel htmlFor="expiry">Expiry Date</FieldLabel>
											<Input
												id="expiry"
												inputMode="numeric"
												maxLength={5}
												placeholder="MM/YY"
												{...register("expiry", {
													onChange: (e) => {
														const value = e.target.value
															.replace(/\D/g, "")
															.slice(0, 4)
															.replace(/^(\d{2})(\d)/, "$1/$2");

														e.target.value = value;
													},
												})}
											/>
											{errors.expiry && (
												<p className="text-sm text-red-500">
													{errors.expiry.message}
												</p>
											)}
										</Field>

										<Field>
											<FieldLabel htmlFor="cvv">CVV</FieldLabel>
											<Input
												id="cvv"
												type="password"
												inputMode="numeric"
												placeholder="•••"
												{...register("cvv")}
											/>
											{errors.cvv && (
												<p className="text-sm text-red-500">
													{errors.cvv.message}
												</p>
											)}
										</Field>
									</div>
								</FieldGroup>
							</CardContent>
						</Card>
					</div>

					<Card className="h-fit lg:sticky lg:top-6">
						<CardHeader>
							<CardTitle>Order Summary</CardTitle>
							<CardDescription>
								Review your order before payment.
							</CardDescription>
						</CardHeader>

						<CardContent className="space-y-4">
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Subtotal</span>
								<span>{data.total.toFixed(2)}</span>
							</div>

							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Shipping</span>
								<span>Free</span>
							</div>

							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Tax</span>
								<span>0%</span>
							</div>

							<Separator />

							<div className="flex justify-between text-lg font-semibold">
								<span>Total</span>
								<span>{Number(data.total).toFixed(2)}</span>
							</div>

							{isError && (
								<p className="rounded-md bg-red-100 p-3 text-sm text-red-600">
									{errorMsg}
								</p>
							)}

							<Button type="submit" className="w-full">
								Place Order
							</Button>

							<FieldDescription className="text-center">
								By placing your order, you agree to our terms and conditions.
							</FieldDescription>

							<Link
								to="/cart"
								className="block text-center text-sm underline-offset-4 hover:underline"
							>
								← Back to cart
							</Link>
						</CardContent>
					</Card>
				</div>
			</form>
		</div>
	);
}

export default Checkout;
