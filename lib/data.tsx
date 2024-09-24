import { connectToMongoDB } from "./mongodb";
import { Post, User } from "./models";
import { unstable_noStore as noStore } from "next/cache";

export const getPosts = async () => {
	try {
		connectToMongoDB();
		const posts = await Post.find();
		return posts;
	} catch (err) {
		throw new Error("Failed to fetch posts!");
	}
};

export const getPost = async (slug: string) => {
	try {
		connectToMongoDB();
		const post = await Post.findOne({ slug });
		return post;
	} catch (err) {
		throw new Error("Failed to fetch post!");
	}
};

export const getUser = async (id: string) => {
	noStore();
	try {
		connectToMongoDB();
		const user = await User.findById(id);
		return user;
	} catch (err) {
		throw new Error("Failed to fetch user!");
	}
};

export const getUsers = async () => {
	try {
		connectToMongoDB();
		const users = await User.find();
		return users;
	} catch (err) {
		throw new Error("Failed to fetch users!");
	}
};
