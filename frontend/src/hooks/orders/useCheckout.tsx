import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/shared/Providers";
import { toast } from "@/components/ui/toast";
import { API } from "@/lib/utils";

const checkout = async () => {
	const data = await API.post(`/orders/checkout`);
	return data;
};
export const useCheckout = () => {
	return useMutation({
		mutationFn: checkout,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
			toast.add({
				type: "success",
				title: "Success",
				description: "Order Placed successfully",
			});
		},
		onError: () =>
			toast.add({
				type: "error",
				title: "Error",
				description: "Failed to place order",
			}),
	});
};
