import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom"; // Required for synchronous state updates
import { useTheme } from "@/components/shared/ThemeProvider";
import { Button } from "@/components/ui/button";

export default function ThemeBtn() {
	const { setTheme, theme } = useTheme();

	const handleToggle = () => {
		// 1. Fallback for browsers that do not support View Transitions
		if (!document.startViewTransition) {
			setTheme(theme === "light" ? "dark" : "light");
			return;
		}

		// 2. Trigger native view transition animation
		document.startViewTransition(() => {
			// 3. Force React DOM mutation to run synchronously inside the callback
			flushSync(() => {
				setTheme(theme === "light" ? "dark" : "light");
			});
		});
	};

	return (
		<Button variant="outline" size="icon" onClick={handleToggle}>
			{theme === "light" ? (
				<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
			) : (
				<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
			)}
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
