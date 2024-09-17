import { getUsers } from "@/app/lib/data";
import styles from "./adminUsers.module.css";
import NoAvatar from "@/app/assets/images/noavatar.png";
import Image from "next/image";
import { deleteUser } from "@/app/lib/action";

export const AdminUsers = async () => {
	const users = await getUsers();
	return (
		<div className={styles.container}>
			<h1>Users</h1>
			{users.map((user) => (
				<div className={styles.user} key={user.id}>
					<div className={styles.details}>
						<Image
							src={user.img || NoAvatar}
							alt="user image"
							width={50}
							height={50}
						/>
						<span className={styles.userTitle}>{user.username}</span>
					</div>
					<form action={deleteUser}>
						<input type="hidden" name="id" value={user.id} />
						<button className={styles.userButton}>Delette</button>
					</form>
				</div>
			))}
		</div>
	);
};
