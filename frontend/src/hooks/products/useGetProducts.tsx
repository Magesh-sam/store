import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/utils";

const getProducts = async () => {
	const { data } = await API.get("/products");
	return data;
};

export function useGetProducts() {
	return useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
	});
}
