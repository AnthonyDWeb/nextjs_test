// import mongoose from "mongoose";
import { Schema, models, model} from "mongoose"

const userSchema = new Schema(
	{
		username: { type: String, require: true, unique: true, min: 3, max: 20 },
		email: { type: String, require: true, unique: true, max: 50 },
		password: { type: String },
		img: { type: String },
		isAdmin: { type: Boolean, default: false },
	},
	{ timestamps: true }
);
const postSchema = new Schema(
	{
		title: { type: String, require: true },
		description: { type: String, require: true },
		img: { type: String },
		userId: { type: String, require: true },
		slug: { type: String, require: true, unique: true },
	},
	{ timestamps: true }
);

export const User = models?.User || model("User", userSchema);
export const Post = models?.Post || model("Post", postSchema);
