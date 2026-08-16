import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/utils";

const getCategories = async () => {
	const { data } = await API.get("/categories");
	return data;
};

export function useGetCategories() {
	return useQuery({
		queryKey: ["categories"],
		queryFn: getCategories,
	});
}
