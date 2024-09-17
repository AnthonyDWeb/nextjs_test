import PostCard from "@/app/components/postCard/postCard";
import { getPosts } from "@/app/lib/data";
import styles from "./blog.module.css";
import { Metadata } from "next";
import { Key } from "react";

// FETCH DATA WITH AN API
const getData = async () => {
	const res = await fetch("http://localhost:3000/api/blog", {
		next: { revalidate: 3600 },
	});

	if (!res.ok) {
		throw new Error("Something went wrong");
	}

	return res.json();
};
export const metadata: Metadata = {
	title: "blog page",
	description: "nextjs Website blog page",
};

const BlogPage = async () => {
	// FETCH DATA WITH AN API
	const posts = await getData();

	// FETCH DATA WITHOUT AN API
	// const posts = await getPosts();

	return (
		<div className={styles.container}>
			{posts.map((post: { id: Key | null | undefined }) => (
				<div className={styles.post} key={post.id}>
					<PostCard post={post} />
				</div>
			))}
		</div>
	);
};

export default BlogPage;
