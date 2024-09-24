import NextAuth, { DefaultSession } from "next-auth";

interface User {
	id?: string;
	username?: string;
	email?: string;
	image?: string;
	isAdmin?: boolean;
}

declare module "next-auth" {
	interface Session {
		user: User & DefaultSession["user"];
		expires: string;
	}
}

declare module "next-auth" {
	interface JWT {
		id: string;
		isAdmin: boolean;
	}
}
