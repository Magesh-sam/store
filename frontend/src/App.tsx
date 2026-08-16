import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AdminLayout from "@/components/layout/AdminLayout";
import RootLayout from "@/components/layout/RootLayout";
import { Toaster } from "@/components/ui/toast";
import HomeSkeleton from "./components/skeletons/HomeSkeleton";
import Protected from "./pages/auth/Protected";

const Admin = lazy(() => import("./pages/admin/Admin"));
const Categories = lazy(() => import("./pages/admin/Categories"));
const AdminProducts = lazy(() => import("./pages/admin/Products"));
const Login = lazy(() => import("./pages/auth/Login"));
const Profile = lazy(() => import("./pages/auth/Profile"));
const Register = lazy(() => import("./pages/auth/Register"));
const Cart = lazy(() => import("./pages/Cart"));
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));

function Lazy({ children }: { children: React.ReactNode }) {
	return <Suspense fallback={<HomeSkeleton />}>{children}</Suspense>;
}

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: (
					<Lazy>
						<Home />
					</Lazy>
				),
			},
			{
				path: "login",
				element: (
					<Lazy>
						<Login />
					</Lazy>
				),
			},
			{
				path: "register",
				element: (
					<Lazy>
						<Register />
					</Lazy>
				),
			},
			{
				path: "products",
				element: (
					<Lazy>
						<Products />
					</Lazy>
				),
			},
			{
				path: "products/:id",
				element: (
					<Lazy>
						<Products />
					</Lazy>
				),
			},
			{
				path: "cart",
				element: (
					<Lazy>
						<Cart />
					</Lazy>
				),
			},
			{
				path: "checkout",
				element: (
					<Lazy>
						<Cart />
					</Lazy>
				),
			},
			{
				path: "profile",
				element: (
					<Protected>
						<Lazy>
							<Profile />
						</Lazy>
					</Protected>
				),
			},
		],
	},
	{
		path: "/admin",
		element: (
			<Protected>
				<AdminLayout />
			</Protected>
		),
		children: [
			{
				index: true,
				element: (
					<Lazy>
						<Admin />
					</Lazy>
				),
			},
			{
				path: "categories",
				element: (
					<Lazy>
						<Categories />
					</Lazy>
				),
			},
			{
				path: "products",
				element: (
					<Lazy>
						<AdminProducts />
					</Lazy>
				),
			},
			{
				path: "orders",
				element: <div className="p-8">Admin Orders Placeholder</div>,
			},
		],
	},
]);

function App() {
	return (
		<>
			<RouterProvider router={router} />
			<Toaster />
		</>
	);
}

export default App;
