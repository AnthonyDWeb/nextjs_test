import { LoginForm } from "@/app/components/loginForm/loginForm";
import { handleGithubLogin } from "@/app/lib/action";
import { auth } from "@/app/lib/auth";
import React from "react";

export default async function LoginPage() {
	const session = await auth();
	console.log("session", session);


	return (
		<div>
			<form action={handleGithubLogin}>
				<button>Login with Github</button>
			</form>
			<LoginForm/>
		</div>
	);
}
