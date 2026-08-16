import { NavLink, useLocation } from "react-router";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

function AdminSidebar() {
	const location = useLocation();

	const links = [
		{ name: "Home", url: "/admin" },
		{ name: "Products", url: "/admin/products" },
		{ name: "Categories", url: "/admin/categories" },
		{ name: "Orders", url: "/admin/orders" },
	];

	return (
		<Sidebar className="top-16 h-[calc(100vh-4rem)] border-r">
			<SidebarHeader className="px-4 py-4 text-lg font-semibold">
				Admin Panel
			</SidebarHeader>

			<SidebarContent>
				<SidebarMenu className="space-y-1 px-2">
					{links.map((link) => (
						<SidebarMenuItem key={link.name}>
							<SidebarMenuButton
								isActive={location.pathname === link.url}
								className={
									location.pathname === link.url
										? "bg-primary! text-primary-foreground!"
										: ""
								}
								render={
									<NavLink to={link.url} end={link.url === "/admin"}>
										{link.name}
									</NavLink>
								}
							/>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>

			<SidebarFooter className="border-t p-4 text-sm text-muted-foreground">
				Admin
			</SidebarFooter>
		</Sidebar>
	);
}

export default AdminSidebar;
