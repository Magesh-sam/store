import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import HeroSection from "@/components/shared/HeroSection";
import ProductCard from "@/components/shared/ProductCard";
import ProductGridSkeleton from "@/components/skeletons/ProductGridSkeleton";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { useGetProducts } from "@/hooks/products/useGetProducts";
import type { ProductProps } from "@/lib/types";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";

function Home() {
	const { data, isLoading, isError, error } = useGetProducts();
	const isAuthenticated = useAuthStore((state) => !!state.email);

	const { mutate: addToCart } = useAddToCart();
	const cart = useCartStore((state) => state);

	const handleAddToCart = (item: ProductProps) => {
		console.log("authenticated:", isAuthenticated);
		if (isAuthenticated) {
			addToCart(item.id);
			return;
		}
		cart.addToCart(item);
		toast.add({
			type: "success",
			title: `${item.name} Added to Cart`,
		});
	};

	const handleBuyNow = (id: number) => {
		toast.add({
			type: "success",
			title: `Order Placed ${id}`,
		});
	};

	return (
		<main>
			<HeroSection />

			<section className="container mx-auto py-12">
				<div className="mb-8 flex items-end justify-between px-3">
					<h2 className="text-3xl font-bold tracking-tight">
						Featured Products
					</h2>

					<Link to="/products">
						<Button variant="ghost">
							View All
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</Link>
				</div>

				{isLoading && <ProductGridSkeleton />}
				{isError && <p className="px-3">Error: {error.message}</p>}

				{!isLoading && !isError && (
					<div className="grid grid-cols-1 gap-6 px-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{data.data.slice(0, 4).map((product: ProductProps) => (
							<ProductCard
								key={product.id}
								{...product}
								onAddToCart={handleAddToCart}
								onBuyNow={handleBuyNow}
							/>
						))}
					</div>
				)}
			</section>
		</main>
	);
}

export default Home;
