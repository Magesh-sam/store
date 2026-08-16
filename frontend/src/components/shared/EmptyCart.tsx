import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";

function EmptyCart() {
	return (
		<div className="container mx-auto p-8 text-center min-h-[50vh] flex flex-col items-center justify-center">
			<h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
			<p className="text-muted-foreground mb-8">
				Looks like you haven't added anything to your cart yet.
			</p>
			<Link to="/products" className={buttonVariants({ size: "lg" })}>
				Start Shopping
			</Link>
		</div>
	);
}

export default EmptyCart;
