"use client";
import { handleLogout } from "@/lib/action";
import Link from "next/link";
import { usePathname } from "next/navigation";
import style from "../Navbar.module.css";
import Image from "next/image";
import { UserType } from "@/types";

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
export type sessionType = { user: UserType };
export const Links = ({ session }: { session: sessionType | null }) => {
	const pathName = usePathname();

	console.log("session Links:", session);

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
				<Image src={"/images/menu.png"} alt="icone menu" className={style.menuImage} width={45} height={45} />
			</button>
		</div>
	);
};
