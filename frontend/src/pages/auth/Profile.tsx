import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/store/useAuthStore";

function Profile() {
	const auth = useAuthStore((state) => state);
	console.log(auth);

	return (
		<div className="flex flex-col min-h-svh w-full p-8 gap-4 ">
			<h1 className="text-3xl font-bold">Profile Page</h1>
			<p className="text-lg mb-3">Username: {auth.username}</p>
			<p className="text-lg mb-3">Email: {auth.email}</p>
			<p className="text-lg mb-3">
				{" "}
				created At: {new Date(auth.created_at).toLocaleDateString()}
			</p>
			<Button className={"max-w-fit"} onClick={() => auth.logout()}>
				Logout
			</Button>
		</div>
	);
}

export default Profile;
