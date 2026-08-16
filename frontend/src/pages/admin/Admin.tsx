import { Navigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";

function Admin() {
	const auth = useAuthStore((state) => state);
	if (auth.role !== "admin") return <Navigate to="/" />;

	return (
		<main className=" space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
				<p className="text-muted-foreground">Overview of your store.</p>
			</div>

			<section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Categories</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">5</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Products</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">20</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Orders</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">100</p>
					</CardContent>
				</Card>
			</section>

			<Card className="min-h-100">
				<CardHeader>
					<CardTitle>Recent Orders</CardTitle>
				</CardHeader>
				<CardContent>{/* Table or chart */}</CardContent>
			</Card>
		</main>
	);
}

export default Admin;
