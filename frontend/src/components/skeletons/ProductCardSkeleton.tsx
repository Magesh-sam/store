import { Skeleton } from "@/components/ui/skeleton";

function ProductCardSkeleton() {
	return (
		<div className="space-y-4">
			<Skeleton className="aspect-square w-full rounded-xl" />
			<div className="space-y-2">
				<Skeleton className="h-5 w-3/4" />
				<Skeleton className="h-4 w-1/2" />
				<Skeleton className="h-9 w-full" />
			</div>
		</div>
	);
}

export default ProductCardSkeleton;
