import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/utils";

const getCart = async () => {
	const { data } = await API.get("/cart");
	return data;
};

export function useGetCart() {
	return useQuery({
		queryKey: ["cart"],
		queryFn: getCart,
	});
}
