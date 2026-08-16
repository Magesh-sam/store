import { Pencil, Plus, Trash2, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router";
import ProductForm from "@/components/shared/ProductForm";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import { useDeleteProduct } from "@/hooks/products/useDeleteProduct";
import { useGetProducts } from "@/hooks/products/useGetProducts";
import type { Product, ProductProps } from "@/lib/types";
import { useAuthStore } from "@/store/useAuthStore";

function Products() {
	const auth = useAuthStore((state) => state);

	const {
		isLoading: isProductsLoading,
		data: productData,
		isError: isProductsError,
		error: productError,
	} = useGetProducts();
	const { mutate: deleteProduct } = useDeleteProduct();

	const {
		isLoading: isCategoriesLoading,

		data: categoriesData,
		isError: isCategoriesError,

		error: categoryError,
	} = useGetCategories();

	const [open, setOpen] = useState(false);
	const [status, setStatus] = useState<"create" | "edit">("create");
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	if (auth.role !== "admin") return <Navigate to="/" />;

	const handleCreate = () => {
		setStatus("create");
		setSelectedProduct(null);
		setOpen(true);
	};

	const handleEdit = (product: Product) => {
		setStatus("edit");
		setSelectedProduct(product);
		setOpen(true);
	};
	const handleDelete = (id: number) => {
		deleteProduct(id);
	};

	const DeleteDialog = ({ id }: { id: number }) => {
		return (
			<AlertDialog>
				<AlertDialogTrigger
					render={
						<Button variant={"destructive"} size="icon">
							<Trash2 />
							<span className="sr-only"> Delete</span>
						</Button>
					}
				/>
				<AlertDialogContent size="sm">
					<AlertDialogHeader>
						<AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
							<Trash2Icon />
						</AlertDialogMedia>
						<AlertDialogTitle>Delete Product?</AlertDialogTitle>
						<AlertDialogDescription>
							This will permanently delete the Product
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => handleDelete(id)}
							variant="destructive"
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	};
	return (
		<main>
			{isProductsLoading && <p>Loading...</p>}
			{isProductsError && <p>Error: {productError.message}</p>}
			{isCategoriesLoading && <p>Loading...</p>}
			{isCategoriesError && <p>Error: {categoryError.message}</p>}

			<div className="mb-3 flex w-full items-center justify-between px-3">
				<h3 className="text-2xl font-bold">Products</h3>
				<Button onClick={handleCreate}>
					<Plus />
					Add New Product
				</Button>
			</div>

			<Table>
				<TableCaption>A list of all Products</TableCaption>

				<TableHeader>
					<TableRow>
						<TableHead className="w-20">ID</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Stock</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{productData?.data?.map(
						(product: ProductProps & { stock: number }) => (
							<TableRow className="hover:bg-primary/10" key={product.id}>
								<TableCell className="font-medium">{product.id}</TableCell>
								<TableCell>{product.name}</TableCell>
								<TableCell className="max-w-[75ch] truncate ">
									{product.description}
								</TableCell>
								<TableCell>₹{product.price}</TableCell>
								<TableCell>{product.stock}</TableCell>
								<TableCell>{product.category}</TableCell>

								<TableCell>
									<ButtonGroup className="gap-2">
										<Button size="icon" onClick={() => handleEdit(product)}>
											<Pencil />
											<span className="sr-only">Edit</span>
										</Button>

										<DeleteDialog id={product.id} />
									</ButtonGroup>
								</TableCell>
							</TableRow>
						),
					)}
				</TableBody>
			</Table>

			{/* Replace with your ProductForm */}
			<ProductForm
				open={open}
				onOpenChange={setOpen}
				status={status}
				product={selectedProduct}
				categories={categoriesData?.categories ?? []}
			/>
		</main>
	);
}
export default Products;
