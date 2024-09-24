import { Suspense } from "react";
import styles from "./admin.module.css";
import { AdminPost } from "@/components/adminPost/adminPost";
import { AdminPostForm } from "@/components/adminPostForm/adminPostForm";
import { AdminUsers } from "@/components/adminUsers/adminUsers";
import { AdminUserForm } from "@/components/adminUserForm/adminUserForm";
import { auth } from "@/lib/auth";

export default async function AdminPage() {
	const session = await auth();

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<div className={styles.col}>
					<Suspense fallback={<div>Loading...</div>}>
						<AdminPost />
					</Suspense>
				</div>
				<div className={styles.col}>
					<AdminPostForm user={session?.user} />
				</div>
			</div>

			<div className={styles.row}>
				<div className={styles.col}>
					<Suspense fallback={<div>Loading...</div>}>
						<AdminUsers />
					</Suspense>
				</div>
				<div className={styles.col}>
					<AdminUserForm />
				</div>
			</div>
		</div>
	);
}
