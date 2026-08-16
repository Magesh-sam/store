import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/shared/Providers";
import { toast } from "@/components/ui/toast";
import type { Product } from "@/lib/types";
import { API } from "@/lib/utils";

const updateProduct = (product: Product) => {
	const data = API.put(`/products/${product.id}`, product);
	return data;
};

export function useUpdateProduct() {
	return useMutation({
		mutationFn: updateProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			toast.add({
				type: "success",
				title: "Success",
				description: "Product Updated successfully",
			});
		},
		onError: () =>
			toast.add({
				type: "error",
				title: "Error",
				description: "Failed to update product",
			}),
	});
}
