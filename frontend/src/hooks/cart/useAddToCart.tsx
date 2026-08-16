import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/shared/Providers";
import { toast } from "@/components/ui/toast";
import { API } from "@/lib/utils";

const addToCart = async (id: number) => {
	const data = await API.post(`/cart/items`, {
		product_id: id,
		quantity: 1,
	});
	return data;
};

export function useAddToCart() {
	return useMutation({
		mutationFn: addToCart,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			toast.add({
				type: "success",
				title: "Success",
				description: "Added To Cart successfully",
			});
		},
		onError: () =>
			toast.add({
				type: "error",
				title: "Error",
				description: "Failed to add to Cart",
			}),
	});
}
