import React from "react";
import style from "./Navbar.module.css";
import Link from "next/link";
import { Links } from "./links/links";
import { auth } from "@/lib/auth";

const Navbar = async () => {
	const session = await auth();

	return (
		<div className={style.container}>
			<Link href={"/"} className={style.logo}>
				LOGO
			</Link>
			<div>
				<Links session={session} />
			</div>
		</div>
	);
};
export default Navbar;
