import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/shared/Providers";
import { toast } from "@/components/ui/toast";
import { API } from "@/lib/utils";

const deleteProduct = async (id: number) => {
	const data = await API.delete(`/products/${id}`);
	return data;
};
export const useDeleteProduct = () => {
	return useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			toast.add({
				type: "success",
				title: "Success",
				description: "Product deleted successfully",
			});
		},
		onError: () =>
			toast.add({
				type: "error",
				title: "Error",
				description: "Failed to delete product",
			}),
	});
};
