"use client";
import { register } from "@/lib/action";
import "./registerForm.module.css";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const RegisterForm = () => {
	const [state, formAction] = useFormState(register, undefined);
	const router = useRouter();
	useEffect(() => {
		state?.success && router.push("/login");
	}, [state?.success, router]);
	return (
		<form action={formAction}>
			<input type="text" placeholder="username" name="username" />
			<input type="email" placeholder="email" name="email" />
			<input type="password" placeholder="password" name="password" />
			<input type="password" placeholder="password" name="passwordRepeat" />
			<button>Register</button>
			{state?.error && <p>{state.error}</p>}
			<Link href={"/login"}>
				Have a user account ? <b>Login</b>
			</Link>
		</form>
	);
};
