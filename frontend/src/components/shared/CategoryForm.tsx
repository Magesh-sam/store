import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { useCreateCategory } from "@/hooks/categories/useCreateCategory";
import { useUpdateCategory } from "@/hooks/categories/useUpdateCategory";
import type { Category } from "@/lib/types";

const categorySchema = z.object({
	name: z.string().min(2, "Name is required"),
	description: z.string().min(2, "Description is required"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
	status: "edit" | "create";
	open: boolean;
	onOpenChange: (open: boolean) => void;
	category: Category | null;
}

function CategoryForm({
	status,
	open,
	onOpenChange,
	category,
}: CategoryFormProps) {
	const createMutation = useCreateCategory();
	const updateMutation = useUpdateCategory();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CategoryFormValues>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	useEffect(() => {
		if (status === "edit" && category) {
			reset({
				name: category.name,
				description: category.description,
			});
		} else {
			reset({
				name: "",
				description: "",
			});
		}
	}, [status, category, reset]);

	const onSubmit = (values: CategoryFormValues) => {
		if (status === "create") {
			createMutation.mutate(values as Category, {
				onSuccess: () => onOpenChange(false),
			});
			return;
		}

		if (!category) return;

		updateMutation.mutate(
			{
				...category,
				...values,
			},
			{
				onSuccess: () => onOpenChange(false),
			},
		);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{status === "create" ? "Create Category" : "Edit Category"}
					</DialogTitle>
					<DialogDescription>
						{status === "create"
							? "Add a new category."
							: "Update category details."}
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

					<DialogFooter>
						<DialogClose
							render={
								<Button
									type="button"
									variant="outline"
									onClick={() => onOpenChange(false)}
								>
									Cancel
								</Button>
							}
						></DialogClose>

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

export default CategoryForm;
