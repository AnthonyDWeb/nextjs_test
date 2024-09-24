"use server";

import { connectToMongoDB } from "@/lib/mongodb";
import { Post } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (_request: Request, params: { slug: string }) => {
	const { slug } = params;
	try {
		connectToMongoDB();
		const post = await Post.findOne({ slug });
		return NextResponse.json(post);
	} catch (error) {
		throw new Error("fetch is failed");
	}
};
export const POST = async () => {
	try {
		connectToMongoDB();
		const post = await Post.find();
		return NextResponse.json(post);
	} catch (error) {
		throw new Error("fetch is failed");
	}
};
