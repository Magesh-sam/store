import type { SyntheticEvent } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { ProductProps } from "@/lib/types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface ProductCardProps extends ProductProps {
	onAddToCart: (item: ProductProps) => void;
	onBuyNow: (id: number) => void;
}

interface ProductImageProps {
	image_url?: string;
	name?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
	image_url,
	name,
}) => {
	const fallbackSrc = "/default-fallback-image.png";

	const primarySrc = image_url ? image_url : fallbackSrc;

	// Type the event as a SyntheticEvent targeting an HTMLImageElement
	const handleImgError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
		const target = e.currentTarget; // currentTarget has stronger typing than target
		target.src = fallbackSrc;
		target.onerror = null;
	};

	return (
		<img
			src={primarySrc}
			alt={name || "Product Name"}
			onError={handleImgError}
			className="w-full h-48 object-cover"
		/>
	);
};

function ProductCard({
	id,
	name,
	description,
	category,
	price,
	image_url,
	onAddToCart,
	onBuyNow,
}: ProductCardProps) {
	return (
		<Card key={id} className="max-w-md  ">
			<ProductImage image_url={image_url} name={name} />

			<CardHeader>
				<CardTitle>{name}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<Badge variant={"secondary"}>{category}</Badge>
			</CardContent>
			<CardFooter className="flex w-full justify-between">
				<p className="text-lg font-bold ">$ {price}</p>
				<div className="flex gap-2">
					<Button
						onClick={() =>
							onAddToCart({
								id,
								name,
								description,
								category,
								price,
								image_url,
							})
						}
						variant={"secondary"}
					>
						Add to Cart
					</Button>
					<Button onClick={() => onBuyNow(id)}>Buy Now</Button>
				</div>
			</CardFooter>
		</Card>
	);
}

export default ProductCard;
