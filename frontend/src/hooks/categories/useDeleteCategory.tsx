import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/shared/Providers";
import { toast } from "@/components/ui/toast";
import { API } from "@/lib/utils";

const deleteCategory = async (id: number) => {
	const data = await API.delete(`/categories/${id}`);
	return data;
};
export const useDeleteCategory = () => {
	return useMutation({
		mutationFn: deleteCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			toast.add({
				type: "success",
				title: "Success",
				description: "Category deleted successfully",
			});
		},
		onError: () =>
			toast.add({
				type: "error",
				title: "Error",
				description: "Failed to delete category",
			}),
	});
};
