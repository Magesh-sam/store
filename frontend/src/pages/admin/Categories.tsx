import { Pencil, Plus, Trash2, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router";
import CategoryForm from "@/components/shared/CategoryForm";
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
import { useDeleteCategory } from "@/hooks/categories/useDeleteCategory";
import { useGetCategories } from "@/hooks/categories/useGetCategories";
import type { Category } from "@/lib/types";
import { useAuthStore } from "@/store/useAuthStore";

function Categories() {
	const auth = useAuthStore((state) => state);

	const { data, isLoading, isError, error } = useGetCategories();
	const { mutate: deleteCategory } = useDeleteCategory();
	const [open, setOpen] = useState(false);
	const [status, setStatus] = useState<"create" | "edit">("create");
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null,
	);
	if (auth.role !== "admin") return <Navigate to="/" />;

	const handleCreate = () => {
		setStatus("create");
		setSelectedCategory(null);
		setOpen(true);
	};

	const handleEdit = (category: Category) => {
		setStatus("edit");
		setSelectedCategory(category);
		setOpen(true);
	};
	const handleDelete = (id: number) => {
		deleteCategory(id);
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
						<AlertDialogTitle>Delete Category?</AlertDialogTitle>
						<AlertDialogDescription>
							This will permanently delete the Category
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
			{isLoading && <p>Loading...</p>}
			{isError && <p>Error {error.message}</p>}
			<div className="flex w-full items-center justify-between px-3 mb-3">
				<h3 className="text-2xl font-bold">Categories</h3>
				<Button onClick={handleCreate}>
					<Plus />
					Add New Category
				</Button>
			</div>
			<Table>
				<TableCaption>A list of all categories</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-25">Id</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.categories?.map((c: Category) => (
						<TableRow className="hover:bg-primary/10" key={c.id}>
							<TableCell className="font-medium">{c.id}</TableCell>
							<TableCell>{c.name}</TableCell>
							<TableCell>{c.description}</TableCell>
							<TableCell>
								<ButtonGroup className="gap-2">
									<Button size={"icon"} onClick={() => handleEdit(c)}>
										<Pencil /> <span className="sr-only"> Edit</span>
									</Button>
									<DeleteDialog id={c.id} />
								</ButtonGroup>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<CategoryForm
				status={status}
				open={open}
				onOpenChange={setOpen}
				category={selectedCategory}
			/>
		</main>
	);
}

export default Categories;
