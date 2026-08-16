import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { CartItem } from "@/store/useCartStore";
import { ProductImage } from "./ProductCard";

interface CartItemProps extends CartItem {
	onIncrementQuantity: (id: number, quantity: number) => void;
	onDecrementQuantity: (id: number, quantity: number) => void;
	onDeleteItem: (id: number) => void;
}

function CartItemCard({
	id,
	image_url,
	name,
	product_id,
	price,
	quantity,

	onIncrementQuantity,
	onDecrementQuantity,
	onDeleteItem,
}: CartItemProps) {
	return (
		<Card key={id}>
			<ProductImage image_url={image_url} name={name} />

			<CardHeader>
				<CardTitle>
					{name} - ${price}
				</CardTitle>
			</CardHeader>

			<CardFooter className="flex w-full justify-between items-center">
				<div className="flex gap-2 items-center">
					<Button
						disabled={quantity === 1}
						onClick={() => onDecrementQuantity(product_id, quantity)}
					>
						-
					</Button>
					<p>{quantity}</p>
					<Button onClick={() => onIncrementQuantity(product_id, quantity)}>
						+
					</Button>
				</div>
				<Button
					onClick={() => onDeleteItem(product_id)}
					variant={"destructive"}
				>
					<Trash2Icon />
				</Button>
			</CardFooter>
		</Card>
	);
}

export default CartItemCard;
