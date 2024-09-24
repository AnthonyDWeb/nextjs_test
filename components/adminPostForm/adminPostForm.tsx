"use client";

import { useFormState } from "react-dom";
import styles from "./adminPostForm.module.css";
import { addPost } from "@/lib/action";
import { UserType } from "@/types";

type paramsTypes = { user: UserType | undefined };

export const AdminPostForm = ({ user }: paramsTypes) => {
	const [state, formAction] = useFormState(addPost, undefined);

	// FETCH DATA WITH AN API
	// const postData = async (e: FormData) => {
	// 	console.log("e postData",e);
	// 	e.preventDefault();
	// 	const formData = new FormData(e.target);
	// 	const data = Object.fromEntries(formData.entries());
	// 	const data = Object.fromEntries(e);
	// 	console.log("data",data);

	// 	await fetch("http://localhost:3000/api/blog", {
	// 		method: "POST",
	// 		next: { revalidate: 3600 },
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(data),
	// 	});
	// 	// if (!res.ok) {
	// 	// 	throw new Error("Something went wrong");
	// 	// }
	// 	// const resJson = await res.json();
	// 	// console.log("res", resJson);
	// 	// return resJson;
	// };

	return (
		<form action={formAction} className={styles.container}>
			<h1>Add New Post</h1>
			<input type="hidden" name="userId" value={`${user?.id}`} />
			<input type="text" name="title" placeholder="Title" />
			<input type="text" name="slug" placeholder="Slug" />
			<input type="text" name="img" placeholder="Image" />
			<textarea name="description" placeholder="Description" rows={10} />
			<button>Add</button>
			{state?.success && <p>{state.success}</p>}
		</form>
	);
};
