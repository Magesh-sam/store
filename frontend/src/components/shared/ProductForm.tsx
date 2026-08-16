import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProduct } from "@/hooks/products/useCreateProduct";
import { useUpdateProduct } from "@/hooks/products/useUpdateProduct";
import type { Category, Product } from "@/lib/types";

const createProductSchema = z.object({
	name: z.string().min(2),
	description: z.string().optional(),
	price: z.number().min(0),
	stock: z.number().int().min(0),
	category_id: z.number().int().optional(),
	image_url: z.union([z.url(), z.literal("")]).optional(),
});

type ProductFormValues = z.infer<typeof createProductSchema>;

interface ProductFormProps {
	status: "create" | "edit";
	open: boolean;
	onOpenChange: (open: boolean) => void;
	product: Product | null;
	categories: Category[];
}

function ProductForm({
	status,
	open,
	onOpenChange,
	product,
	categories,
}: ProductFormProps) {
	const createMutation = useCreateProduct();
	const updateMutation = useUpdateProduct();

	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ProductFormValues>({
		resolver: zodResolver(createProductSchema),
		defaultValues: {
			name: "",
			description: "",
			price: 0,
			stock: 0,
			category_id: undefined,
			image_url: "",
		},
	});

	useEffect(() => {
		if (status === "edit" && product) {
			reset({
				name: product.name,
				description: product.description ?? "",
				price: product.price,
				stock: product.stock,
				category_id: product.category_id,
				image_url: product.image_url ?? "",
			});
		} else {
			reset({
				name: "",
				description: "",
				price: 0,
				stock: 0,
				category_id: undefined,
				image_url: "",
			});
		}
	}, [status, product, reset]);

	const onSubmit = (values: ProductFormValues) => {
		if (status === "create") {
			createMutation.mutate(values, {
				onSuccess: () => {
					reset();
					onOpenChange(false);
				},
			});
			return;
		}

		if (!product) return;

		updateMutation.mutate(
			{
				...product,
				...values,
			},
			{
				onSuccess: () => {
					reset();
					onOpenChange(false);
				},
			},
		);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{status === "create" ? "Create Product" : "Edit Product"}
					</DialogTitle>

					<DialogDescription>
						{status === "create"
							? "Add a new product."
							: "Update product details."}
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div>
						<label htmlFor="name">Name</label>
						<Input {...register("name")} />
						{errors.name && (
							<p className="text-sm text-red-500">{errors.name.message}</p>
						)}
					</div>

					<div>
						<label htmlFor="description">Description</label>
						<Textarea {...register("description")} />
						{errors.description && (
							<p className="text-sm text-red-500">
								{errors.description.message}
							</p>
						)}
					</div>

					<div>
						<label htmlFor="price">Price</label>
						<Input
							type="number"
							step="0.01"
							{...register("price", { valueAsNumber: true })}
						/>
						{errors.price && (
							<p className="text-sm text-red-500">{errors.price.message}</p>
						)}
					</div>

					<div>
						<label htmlFor="stock">Stock</label>
						<Input
							type="number"
							{...register("stock", { valueAsNumber: true })}
						/>
						{errors.stock && (
							<p className="text-sm text-red-500">{errors.stock.message}</p>
						)}
					</div>

					<div>
						<label htmlFor="category_id">Category</label>
						<Controller
							name="category_id"
							control={control}
							render={({ field }) => (
								<Select
									value={field.value?.toString() || ""}
									onValueChange={(value) => field.onChange(Number(value))}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a category" />
									</SelectTrigger>

									<SelectContent>
										{categories.map((category) => (
											<SelectItem
												key={category.id}
												value={category.id.toString()}
											>
												{category.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
						{errors.category_id && (
							<p className="text-sm text-red-500">
								{errors.category_id.message}
							</p>
						)}
					</div>

					<div>
						<label htmlFor="image_url">Image URL</label>
						<Input {...register("image_url")} />
						{errors.image_url && (
							<p className="text-sm text-red-500">{errors.image_url.message}</p>
						)}
					</div>

					<DialogFooter>
						<DialogClose>
							<Button type="button" variant="outline">
								Cancel
							</Button>
						</DialogClose>

						<Button
							type="submit"
							disabled={createMutation.isPending || updateMutation.isPending}
						>
							{status === "create" ? "Create" : "Update"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default ProductForm;
