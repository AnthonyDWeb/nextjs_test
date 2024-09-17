import React from "react";
import navstyle from "./Navbar.module.css";
import NavLinks from "./links/NavLinks";
import Link from "next/link";
import { auth } from "@/app/lib/auth";

export default async function Navbar() {
	const session = await auth();

	return (
		<div className={navstyle.container}>
			<Link href={'/'} className={navstyle.logo}>LOGO</Link>
			<div>
				<NavLinks session={session}/>
			</div>
		</div>
	);
}
