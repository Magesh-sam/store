import ProductCardSkeleton from "./ProductCardSkeleton";

function ProductGridSkeleton() {
	return (
		<div className="grid grid-cols-1 gap-6 px-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{Array.from({ length: 4 }).map((_, i) => (
				<ProductCardSkeleton key={i} />
			))}
		</div>
	);
}

export default ProductGridSkeleton;
