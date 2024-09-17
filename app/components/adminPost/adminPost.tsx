import { getPosts } from "@/app/lib/data";
import styles from "./adminPost.module.css";
import Image from "next/image";
import NoAvatar from "@/app/assets/images/noavatar.png";
import { deletePost } from "@/app/lib/action";

export const AdminPost = async () => {
	const posts = await getPosts();

	return (
		<div className={styles.container}>
			<h1>Post</h1>
			{posts.map((post) => (
				<div className={styles.post} key={post.id}>
					<div className={styles.details}>
						<Image
							src={post.img || NoAvatar}
							alt="post image"
							width={50}
							height={50}
						/>
						<span className={styles.postTitle}>{post.title}</span>
					</div>
					<form action={deletePost}>
						<input type="hidden" name="id" value={post.id} />
						<button className={styles.postButton }>Delette</button>
					</form>
				</div>
			))}
		</div>
	);
};
