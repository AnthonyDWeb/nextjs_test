import { addPost, deletePost, sayHello } from "@/app/lib/action";
import React from "react";

export default function ServerActiontest() {
	const actionInComponent = async () => {
		"use server";
		console.log("it works ! it's soooo great !!");
	};
	return (
		<div>
			<form action={addPost}>
				<input type="text" placeholder="title" name="title" />
				<input type="text" placeholder="description" name="description" />
				<input type="text" placeholder="slug" name="slug" />
				<input type="text" placeholder="userId" name="userId" />
				<button>Create Post</button>
			</form>
			<form action={deletePost}>
				<input type="text" placeholder="id" name="id" />
				<button>Delete Post</button>
			</form>
			<form action={actionInComponent}>
				<button>Test Me inside</button>
			</form>
		</div>
	);
}
