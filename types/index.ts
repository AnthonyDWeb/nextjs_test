export type UserType = {
	id?: string | null | undefined;
	name?: string | null | undefined;
	email?: string | null | undefined;
	image?: string | null | undefined;
	isAdmin?: boolean;
};
export type PostType = {
	post: string;
	title: string;
	slug: string;
	img?: string;
	description: string;
};
