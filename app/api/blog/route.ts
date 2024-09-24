"use server";

import { Post } from "@/lib/models";
import { connectToMongoDB } from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server";

export const GET = async () => {
	console.log("---------------------------------");
	console.log("inside GET api blog route");
	console.log("---------------------------------");
	try {
		connectToMongoDB();
		const posts = await Post.find();
		return NextResponse.json(posts);
	} catch (error) {
		throw new Error("fetch is failed");
	}
};

export const POST = async (request: NextRequest) => {
	const body = await request.json();
	const { title, description, userId, slug } = body;
	console.log("---------------------------------");
	console.log("POST body", body);
	try {
		connectToMongoDB();
		const newPost = new Post({ title, description, userId, slug });
		console.log("POST newPost", newPost);
		await newPost.save();
		revalidatePath("/blog");
		revalidatePath("/admin");
		console.log("---------------------------------");
	} catch (error) {
		throw new Error("fetch is failed");
	}
};
