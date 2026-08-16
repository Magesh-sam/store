import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";

function RootLayout() {
	return (
		<div className="relative flex min-h-screen flex-col bg-background">
			<Navbar />
			<main className="flex-1 mt-16">
				<Outlet />
			</main>
		</div>
	);
}

export default RootLayout;
