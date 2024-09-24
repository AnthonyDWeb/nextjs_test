// "use client";

import Link from "next/link";
import React from "react";
import style from "../Navbar.module.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import MenuImage from "../../../assets/images/menu.png";
import { handleLogout } from "@/lib/action";
import { sessionType } from "./links";

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

export default async function NavLinks({ session }: { session: sessionType | null }) {
	// const [open, setOpen] = useState(false);
	const pathName = usePathname();

	return (
		<div className={`${style.navlinks_container} ${"open && style.open"}`}>
			<div className={style.links_container}>
				<div className={style.links}>
					{links.map((l) => {
						const activeLink = pathName === l.path && style.active;
						const currSTyle = `${style.link} ${activeLink}`;
						return (
							<Link key={l.title} href={l.path} className={currSTyle}>
								{l.title}
							</Link>
						);
					})}
				</div>
				<div className={style.session}>
					{session?.user ? (
						<>
							{session.user?.isAdmin && (
								<Link
									key={"Admin"}
									href={"/admin"}
									className={`${style.link} ${
										pathName === "/admin" && style.active
									}`}
								>
									Admin
								</Link>
							)}
							<form action={handleLogout}>
								<button className={style.logout}>Logout</button>
							</form>
						</>
					) : (
						<Link
							key={"Login"}
							href={"/login"}
							className={`${style.link} ${
								pathName === "/login" && style.active
							}`}
						>
							Login
						</Link>
					)}
				</div>
			</div>
			<button className={style.menu}>
				<Image
					src={MenuImage}
					alt="icone menu"
					className={style.menuImage}
				/>
			</button>
		</div>
	);
}
