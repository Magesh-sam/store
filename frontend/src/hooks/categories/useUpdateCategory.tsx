import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/shared/Providers";
import { toast } from "@/components/ui/toast";
import type { Category } from "@/lib/types";
import { API } from "@/lib/utils";

const updateCategory = async (category: Category) => {
	const data = await API.put(`/categories/${category.id}`, {
		name: category.name,
		description: category.description,
	});
	return data;
};
export const useUpdateCategory = () => {
	return useMutation({
		mutationFn: updateCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			toast.add({
				type: "success",
				title: "Success",
				description: "Category updated successfully",
			});
		},
		onError: () =>
			toast.add({
				type: "error",
				title: "Error",
				description: "Failed to update category",
			}),
	});
};
