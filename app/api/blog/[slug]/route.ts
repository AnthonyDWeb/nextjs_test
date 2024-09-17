"use server";

import { connectToDb } from "@/app/lib/connectDB";
import { Post } from "@/app/lib/models";
import { NextResponse } from "next/server";

export const GET = async (request: any, {params}: any) => {
    const {slug} = params;
	try {
		connectToDb();
		const post = await Post.findOne({slug});
		return NextResponse.json(post);
	} catch (error) {
		console.log("fetch is failed");
	}
};
export const POST = async (request: any) => {
	try {
		connectToDb();
		const post = await Post.find();
		return NextResponse.json(post);
	} catch (error) {
		console.log("fetch is failed");
	}
};
