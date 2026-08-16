import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/shared/Providers";
import { toast } from "@/components/ui/toast";
import { API } from "@/lib/utils";

const deleteCartIterm = async (id: number) => {
	const data = await API.delete(`/cart/items/${id}`);
	return data;
};
export const useDeleteFromCart = () => {
	return useMutation({
		mutationFn: deleteCartIterm,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			toast.add({
				type: "success",
				title: "Success",
				description: "Cart Item deleted successfully",
			});
		},
		onError: () =>
			toast.add({
				type: "error",
				title: "Error",
				description: "Failed to delete Cart Item",
			}),
	});
};
