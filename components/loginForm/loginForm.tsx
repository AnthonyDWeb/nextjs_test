"use client";
import { login } from "@/lib/action";
import "./loginForm.module.css";
import { useFormState } from "react-dom";
import Link from "next/link";

export const LoginForm = () => {
	const [state, formAction] = useFormState(login, undefined);

	return (
		<form action={formAction}>
			<input type="text" placeholder="username" name="username" />
			<input type="password" placeholder="password" name="password" />
			<button>Login</button>
			{state?.error && <p>{state.error}</p>}
			<Link href={"/register"}>
				Do not have an user account ? <b>Register</b>
			</Link>
		</form>
	);
};
