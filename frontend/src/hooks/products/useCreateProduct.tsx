import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/shared/Providers";
import { toast } from "@/components/ui/toast";
import type { CreateProduct } from "@/lib/types";
import { API } from "@/lib/utils";

const createProduct = (product: CreateProduct) => {
	const data = API.post(`/products`, product);
	return data;
};

export function useCreateProduct() {
	return useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			toast.add({
				type: "success",
				title: "Success",
				description: "Product Added successfully",
			});
		},
		onError: () =>
			toast.add({
				type: "error",
				title: "Error",
				description: "Failed to add product",
			}),
	});
}
