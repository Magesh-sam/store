import { LogOut, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import ThemeBtn from "./ThemeBtn";

function Navbar() {
	const { id, role, logout } = useAuthStore();

	const isAuthenticated = id !== 0; // or Boolean(username)

	return (
		<header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
				<Link to="/" className="flex items-center gap-2">
					<span className="text-xl font-bold tracking-tight">Store</span>
				</Link>

				<nav className="flex items-center gap-4">
					<Link
						to="/cart"
						className={buttonVariants({ variant: "ghost", size: "icon" })}
					>
						<ShoppingCart className="h-5 w-5" />
						<span className="sr-only">Cart</span>
					</Link>

					{isAuthenticated && (
						<div className="flex items-center gap-4">
							{role === "admin" && (
								<Link
									to="/admin"
									className={buttonVariants({ variant: "ghost", size: "sm" })}
								>
									Admin Dashboard
								</Link>
							)}

							<Button variant="ghost" size="icon" onClick={logout}>
								<LogOut className="h-5 w-5" />
								<span className="sr-only">Logout</span>
							</Button>
						</div>
					)}
					<Link
						to={isAuthenticated ? "/profile" : "/login"}
						className={buttonVariants({ variant: "ghost", size: "icon" })}
					>
						<User className="h-5 w-5" />
						<span className="sr-only">
							{isAuthenticated ? "Profile" : "Login"}
						</span>
					</Link>

					<ThemeBtn />
				</nav>
			</div>
		</header>
	);
}

export default Navbar;
