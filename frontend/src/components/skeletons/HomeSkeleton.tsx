// components/skeletons/HomeSkeleton.tsx

import { Skeleton } from "@/components/ui/skeleton";

function HomeSkeleton() {
	return (
		<main>
			{/* Hero */}
			<section className="container mx-auto py-12">
				<Skeleton className="h-[400px] w-full rounded-xl" />
			</section>

			{/* Featured Products */}
			<section className="container mx-auto py-12">
				<div className="mb-8 flex items-end justify-between px-3">
					<Skeleton className="h-9 w-56" />
					<Skeleton className="h-9 w-28" />
				</div>

				<div className="grid grid-cols-1 gap-6 px-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{Array.from({ length: 4 }).map((_, index) => (
						<div key={index} className="space-y-4">
							<Skeleton className="aspect-square w-full rounded-xl" />
							<Skeleton className="h-5 w-3/4" />
							<Skeleton className="h-4 w-1/2" />
							<Skeleton className="h-10 w-full" />
						</div>
					))}
				</div>
			</section>
		</main>
	);
}

export default HomeSkeleton;
