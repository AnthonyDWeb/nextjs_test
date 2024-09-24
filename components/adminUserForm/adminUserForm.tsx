"use client";

import { useFormState } from "react-dom";
import styles from "./adminUserForm.module.css";
import { addUser } from "@/lib/action";

export const AdminUserForm = () => {
	const [state, formAction] = useFormState(addUser, undefined);
	
	return (
		<form action={formAction} className={styles.container}>
			<h1>Add New User</h1>
			<input type="text" name="username" placeholder="username" />
			<input type="text" name="email" placeholder="email" />
			<input type="text" name="password" placeholder="password" />
      <select name="isAdmin">
        <option value="false">Is Admin ?</option>
        <option value="false">User</option>
        <option value="true">Admin</option>
      </select>
			<button>Add</button>
			{state?.success && <p>{state.success}</p>}
		</form>
	);
};
