"use server";

import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "./mongodb";
import { Post, User } from "./models";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

type AddTypes = { success: string } | undefined;
export const addPost = async (_previousState: AddTypes, formData: FormData) => {
	const { title, description, userId, slug } = Object.fromEntries(formData);

	try {
		connectToMongoDB();
		const newPost = new Post({ title, description, userId, slug });
		await newPost.save();
		revalidatePath("/blog");
		revalidatePath("/admin");
		return { success: "is Create" };
	} catch (err) {
		throw new Error("something is wrong");
	}
};
export const deletePost = async (formData: FormData) => {
	const { id } = Object.fromEntries(formData);

	try {
		connectToMongoDB();
		await Post.findByIdAndDelete(id);
		revalidatePath("/blog");
		revalidatePath("/admin");
	} catch (err) {
		throw new Error("something is wrong");
	}
};
export const addUser = async (_previousState: AddTypes, formData: FormData) => {
	const { username, email, password, img, isAdmin } =
		Object.fromEntries(formData);
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(`${password}`, salt);
	try {
		connectToMongoDB();
		const newUser = new User({
			username,
			email,
			password: hashPassword,
			img,
			isAdmin,
		});
		await newUser.save();
		revalidatePath("/admin");
		return { success: "is Create" };
	} catch (err) {
		throw new Error("something is wrong");
	}
};
export const deleteUser = async (formData: FormData) => {
	const { id } = Object.fromEntries(formData);

	try {
		connectToMongoDB();
		await Post.deleteMany({ userId: id });
		await User.findByIdAndDelete(id);
		revalidatePath("/admin");
	} catch (err) {
		throw new Error("something is wrong");
	}
};
export const handleLogout = async () => {
	await signOut();
};

type Register =
	| { error: string; success?: undefined }
	| { success: boolean; error?: undefined }
	| undefined;

export const register = async (
	_previousState: Register,
	formData: FormData
) => {
	const { username, email, password, passwordRepeat, img } =
		Object.fromEntries(formData);
	if (password !== passwordRepeat) {
		return { error: "password do not match" };
	}

	try {
		const user = await User.findOne({ username });

		if (user) {
			return { error: "Username already exist" };
		}

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(`${password}`, salt);

		connectToMongoDB();
		const newUser = new User({ username, email, password: hashPassword, img });

		await newUser.save();
		return { success: true };
	} catch (error) {
		throw new Error("error");
	}
};

type Login = { error: string } | undefined;
export const login = async (_previousState: Login, formData: FormData) => {
	const { username, password } = Object.fromEntries(formData);

	try {
		await signIn("credentials", { username, password });
	} catch (err) {
		return { error: "Invalide username or password" };
	}
};
export const handleGithubLogin = async () => {
	await signIn("github");
};
