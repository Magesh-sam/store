import ProductCard from "@/components/shared/ProductCard";
import ProductGridSkeleton from "@/components/skeletons/ProductGridSkeleton";
import { toast } from "@/components/ui/toast";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { useGetProducts } from "@/hooks/products/useGetProducts";
import type { ProductProps } from "@/lib/types";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";

function Products() {
	const { data, isLoading, isError, error } = useGetProducts();
	const cart = useCartStore((state) => state);
	const isAuthenticated = useAuthStore((state) => !!state.email);

	const { mutate: addToCart } = useAddToCart();

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
		<main className=" container mx-auto grid grid-cols-1 p-3 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
			{isLoading && <ProductGridSkeleton />}
			{isError && <p>Error {error.message}</p>}
			{!isLoading &&
				!isError &&
				data.data.length > 0 &&
				data.data.map((product: ProductProps) => (
					<ProductCard
						key={product.id}
						{...product}
						onAddToCart={handleAddToCart}
						onBuyNow={handleBuyNow}
					/>
				))}
		</main>
	);
}

export default Products;
