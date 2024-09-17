import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: { type: String, require: true, unique: true, min: 3, max: 20 },
		email: { type: String, require: true, unique: true, max: 50 },
		password: { type: String },
		img: { type: String },
		isAdmin: { type: Boolean, default: false },
	},
	{ timestamps: true }
);
const postSchema = new mongoose.Schema(
	{
		title: { type: String, require: true },
		description: { type: String, require: true },
		img: { type: String },
		userId: { type: String, require: true },
		slug: { type: String, require: true, unique: true },
	},
	{ timestamps: true }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
