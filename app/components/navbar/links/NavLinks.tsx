"use client";

import Link from "next/link";
import React, { useState } from "react";
import navstyle from "../Navbar.module.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import MenuImage from "../../../assets/images/menu.png";
import { handleLogout } from "@/app/lib/action";
import { auth } from "@/app/lib/auth";

type linkType = {
	title: string;
	path: string;
};
const links: linkType[] = [
	{ title: "Homepage", path: "/" },
	{ title: "About", path: "/about" },
	{ title: "Blog", path: "/blog" },
	{ title: "Contact", path: "/contact" },
];

export default async function NavLinks({ session }: any) {
	const [open, setOpen] = useState(false);

	const pathName = usePathname();
	// console.log("session",session);
	const Links = () => {
		return (
			<div className={navstyle.links}>
				{links.map((l) => (
					<NavLink key={l.title} item={l} />
				))}
			</div>
		);
	};

	const NavLink = ({ item }: { item: linkType }) => {
		const activeLink = pathName === item.path && navstyle.active;
		return (
			<Link
				key={item.title}
				href={item.path}
				className={`${navstyle.link} ${activeLink}`}
			>
				{item.title}
			</Link>
		);
	};

	const Session = () => {
		return (
			<div className={navstyle.session}>
				{session?.user ? (
					<>
						{session.user?.isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
						<form action={handleLogout}>
							<button className={navstyle.logout}>Logout</button>
						</form>
					</>
				) : (
					<NavLink item={{ title: "Login", path: "/login" }} />
				)}
			</div>
		);
	};

	const Menu = () => {
		return (
			<button className={navstyle.menu} onClick={() => setOpen(!open)}>
				<Image
					src={MenuImage}
					alt="icone menu"
					className={navstyle.menuImage}
				/>
			</button>
		);
	};

	return (
		<div className={`${navstyle.navlinks_container} ${open && navstyle.open}`}>
			<div className={navstyle.links_container}>
				<Links />
				<Session />
			</div>
			<Menu />
		</div>
	);
}
