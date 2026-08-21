import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import CartItemCard from "@/components/shared/CartItemCard";
import EmptyCart from "@/components/shared/EmptyCart";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDeleteFromCart } from "@/hooks/cart/useDeleteFromCart";
import { useGetCart } from "@/hooks/cart/useGetCart";
import { useUpdateCart } from "@/hooks/cart/useUpdateCart";
import { useAuthStore } from "@/store/useAuthStore";
import { type CartItem, useCartStore } from "@/store/useCartStore";

function Cart() {
	const isAuthenticated = useAuthStore((state) => !!state.email);
	const localCart = useCartStore((state) => state);

	const { data, isLoading } = useGetCart();
	const { mutate: updateCart } = useUpdateCart();
	const { mutate: deleteFromCart } = useDeleteFromCart();

	if (isAuthenticated && isLoading) {
		return <div>Loading...</div>;
	}

	const cartItems: CartItem[] = isAuthenticated
		? (data?.items ?? [])
		: localCart.cartItems;

	const total = isAuthenticated ? (data?.total ?? 0) : localCart.getTotal();

	const handleIncreaseQuantity = (id: number, quantity: number) => {
		if (isAuthenticated) {
			updateCart({ id, quantity: quantity + 1 });
			return;
		}

		localCart.increaseQuantity(id);
	};

	const handleDecreaseQuantity = (id: number, quantity: number) => {
		if (isAuthenticated) {
			// API decrease quantity
			updateCart({ id, quantity: quantity - 1 });

			return;
		}

		localCart.decreaseQuantity(id);
	};

	const handleDeleteItem = (id: number) => {
		if (isAuthenticated) {
			deleteFromCart(id);
			return;
		}

		localCart.removeFromCart(id);
	};

	if (cartItems.length === 0) {
		return <EmptyCart />;
	}

	return (
		<main className="container mx-auto px-4 py-6">
			<div className="grid gap-6 lg:grid-cols-[1fr_350px]">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
					{cartItems.map((cartItem) => (
						<CartItemCard
							key={cartItem.id}
							{...cartItem}
							onIncrementQuantity={handleIncreaseQuantity}
							onDecrementQuantity={handleDecreaseQuantity}
							onDeleteItem={handleDeleteItem}
						/>
					))}
				</div>

				<aside>
					<Card className="sticky top-24">
						<CardContent className="p-6">
							<h2 className="mb-4 text-xl font-bold">Order Summary</h2>

							<div className="space-y-3 text-sm">
								<div className="flex justify-between">
									<span className="text-muted-foreground">Subtotal</span>
									<span>${total.toFixed(2)}</span>
								</div>

								<div className="flex justify-between">
									<span className="text-muted-foreground">Shipping</span>
									<span>Freet</span>
								</div>

								<div className="flex justify-between">
									<span className="text-muted-foreground">Tax</span>
									<span>0%</span>
								</div>
							</div>

							<Separator className="my-4" />

							<div className="mb-6 flex justify-between text-lg font-bold">
								<span>Total</span>
								<span>${total.toFixed(2)}</span>
							</div>

							<Link
								to="/checkout"
								className={`w-full ${buttonVariants({ size: "lg" })}`}
							>
								Proceed to Checkout
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</CardContent>
					</Card>
				</aside>
			</div>
		</main>
	);
}

export default Cart;
