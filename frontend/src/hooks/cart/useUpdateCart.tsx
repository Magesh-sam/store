import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/shared/Providers";
import { toast } from "@/components/ui/toast";
import { API } from "@/lib/utils";

const updateCart = async ({
	id,
	quantity,
}: {
	id: number;
	quantity: number;
}) => {
	const data = await API.put(`/cart/items/${id}`, {
		quantity,
	});
	return data;
};

export function useUpdateCart() {
	return useMutation({
		mutationFn: updateCart,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			//   toast.add({
			//     type: "success",
			//     title: "Success",
			//     description: "Added To Cart successfully",
			//   });
		},
		onError: () =>
			toast.add({
				type: "error",
				title: "Error",
				description: "Failed to add to Cart",
			}),
	});
}
