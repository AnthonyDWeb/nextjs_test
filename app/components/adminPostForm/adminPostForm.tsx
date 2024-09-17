"use client";

import { useFormState } from "react-dom";
import styles from "./adminPostForm.module.css";
import { addPost } from "@/app/lib/action";

export const AdminPostForm = ({ user }: any) => {
	const [state, formAction] = useFormState(addPost, undefined);
	return (
		<form action={formAction} className={styles.container}>
			<h1>Add New Post</h1>
			<input type="hidden" name="userId" value={user.id} />
			<input type="text" name="title" placeholder="Title" />
			<input type="text" name="slug" placeholder="Slug" />
			<input type="text" name="img" placeholder="Image" />
			<textarea name="description" placeholder="Description" rows={10} />
			<button>Add</button>
			{/* {state && state.error} */}
		</form>
	);
};
