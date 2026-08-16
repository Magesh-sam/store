import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/shared/Providers";
import { toast } from "@/components/ui/toast";
import type { Category } from "@/lib/types";
import { API } from "@/lib/utils";

const createCategory = async (category: Category) => {
	const data = await API.post(`/categories`, {
		name: category.name,
		description: category.description,
	});
	return data;
};

export function useCreateCategory() {
	return useMutation({
		mutationFn: createCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			toast.add({
				type: "success",
				title: "Success",
				description: "Category Added successfully",
			});
		},
		onError: () =>
			toast.add({
				type: "error",
				title: "Error",
				description: "Failed to add category",
			}),
	});
}
