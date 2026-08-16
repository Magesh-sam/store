import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
export const queryClient = new QueryClient();

function Providers({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider storageKey="vite-ui-theme">
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</ThemeProvider>
	);
}

export default Providers;
