import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProductProps } from "@/lib/types";

export interface CartItem extends ProductProps {
	product_id: number;
	quantity: number;
}

interface CartState {
	cartItems: CartItem[];

	addToCart: (item: ProductProps) => void;
	increaseQuantity: (product_id: number) => void;
	decreaseQuantity: (product_id: number) => void;
	removeFromCart: (product_id: number) => void;
	clearCart: () => void;
	getTotal: () => number;
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			cartItems: [],

			addToCart: (item) =>
				set((state) => {
					const existingItem = state.cartItems.find(
						(cartItem) => cartItem.product_id === item.id,
					);

					if (existingItem) {
						return {
							cartItems: state.cartItems.map((cartItem) =>
								cartItem.product_id === item.id
									? {
											...cartItem,
											quantity: cartItem.quantity + 1,
										}
									: cartItem,
							),
						};
					}

					return {
						cartItems: [
							...state.cartItems,
							{
								...item,
								product_id: item.id,
								quantity: 1,
							},
						],
					};
				}),

			increaseQuantity: (product_id) =>
				set((state) => ({
					cartItems: state.cartItems.map((item) =>
						item.product_id === product_id
							? {
									...item,
									quantity: item.quantity + 1,
								}
							: item,
					),
				})),

			decreaseQuantity: (product_id) =>
				set((state) => ({
					cartItems: state.cartItems
						.map((item) =>
							item.product_id === product_id
								? {
										...item,
										quantity: item.quantity - 1,
									}
								: item,
						)
						.filter((item) => item.quantity > 0),
				})),

			removeFromCart: (product_id) =>
				set((state) => ({
					cartItems: state.cartItems.filter(
						(item) => item.product_id !== product_id,
					),
				})),

			clearCart: () =>
				set({
					cartItems: [],
				}),

			getTotal: () =>
				get().cartItems.reduce(
					(total, item) => total + item.quantity * item.price,
					0,
				),
		}),
		{
			name: "cart-storage",
		},
	),
);
