import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "../shared/AdminSidebar";
import Navbar from "../shared/Navbar";

function AdminLayout() {
	return (
		<div className="h-screen overflow-hidden">
			<Navbar />

			<SidebarProvider
				className="flex pt-16 h-full"
				style={{ height: "calc(100vh - 4rem)" }}
			>
				<AdminSidebar />

				<main className="flex-1 overflow-y-auto p-3">
					<SidebarTrigger />
					<Outlet />
				</main>
			</SidebarProvider>
		</div>
	);
}

export default AdminLayout;
