"use client";
import { login } from "@/app/lib/action";
import "./loginForm.module.css";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
	const [state, formAction] = useFormState(login, undefined);
	const router = useRouter();
	// useEffect(() => {
	// 	state?.success && router.push("/login");
	// }, [state?.success, router]);

	return (
		<form action={formAction}>
			<input type="text" placeholder="username" name="username" />
			<input type="password" placeholder="password" name="password" />
			<button>Login</button>
			{state?.error && <p>{state.error}</p>}
            <Link href={"/login"}>Do not have an user account ? <b>Register</b></Link>
		</form>
	);
};
