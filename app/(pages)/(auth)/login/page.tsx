import { LoginForm } from "@/components/loginForm/loginForm";
import { handleGithubLogin } from "@/lib/action";
import React from "react";

export default async function LoginPage() {
	return (
		<div>
			<form action={handleGithubLogin}>
				<button>Login with Github</button>
			</form>
			<LoginForm />
		</div>
	);
}
