"use server";

import { revalidatePath } from "next/cache";
import { connectToDb } from "./connectDB";
import { Post, User } from "./models";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export const sayHello = async () => {
	console.log("hello my world it's wonderfull");
};

export const addPost = async (previousState: any,formData: any) => {
	const { title, description, userId, slug } = Object.fromEntries(formData);
	console.log("Post is created", title, description, userId, slug);

	try {
		connectToDb();
		const newPost = new Post({ title, description, userId, slug });
		await newPost.save();
		console.log("saved to db");
		revalidatePath("/blog");
		revalidatePath("/admin");
	} catch (err) {
		console.log("something is wrong");
	}
};
export const deletePost = async (formData: any) => {
	const { id } = Object.fromEntries(formData);

	try {
		connectToDb();
		await Post.findByIdAndDelete(id);
		console.log("delete to db");
		revalidatePath("/blog");
		revalidatePath("/admin");
	} catch (err) {
		console.log("something is wrong");
	}
};
export const addUser = async (previousState: any,formData: any) => {
	const { username, email, password, img, isAdmin } = Object.fromEntries(formData);
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password, salt);
	try {
		connectToDb();
		const newUser = new User({ username, email, password: hashPassword, img, isAdmin });
		await newUser.save();
		console.log("saved to db");
		revalidatePath("/admin");
	} catch (err) {
		console.log("something is wrong");
	}
};
export const deleteUser = async (formData: any) => {
	const { id } = Object.fromEntries(formData);

	try {
		connectToDb();
		await Post.deleteMany({userId: id});
		await User.findByIdAndDelete(id);
		console.log("delete to db");
		revalidatePath("/admin");
	} catch (err) {
		console.log("something is wrong");
	}
};

export const handleLogout = async () => {
	await signOut();
};

export const register = async (previousState: any, formData: any) => {
	const { username, email, password, passwordRepeat, img } =
		Object.fromEntries(formData);
	if (password !== passwordRepeat) {
		console.log("password do not match");
		return { error: "password do not match" };
	}

	try {
		const user = await User.findOne({ username });

		if (user) {
			return { error: "Username already exist" };
		}

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		connectToDb();
		const newUser = new User({ username, email, password: hashPassword, img });

		await newUser.save();
		console.log("user save to db");
		return { success: true };
	} catch (error) {
		console.log(error);
	}
};
export const login = async (previousState: any, formData: any) => {
	const { username, password } = Object.fromEntries(formData);

	try {
		await signIn("credentials", { username, password });
	} catch (err: any) {
		console.log(err);
		if (err.message.includes("CredentialsSignin")) {
			return { error: "Invalide username or password" };
		}
		throw err;
	}
};

export const handleGithubLogin = async () => {
	await signIn("github");
};
