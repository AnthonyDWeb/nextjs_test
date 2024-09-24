import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./models";
import bcrypt from "bcryptjs";
import { connectToMongoDB } from "./mongodb";
import { authConfig } from "./auth.config";

const login = async (
	credentials: Partial<Record<"username" | "password", unknown>>
) => {
	try {
		connectToMongoDB();
		const user = await User.findOne({ username: credentials.username });
		if (!user) {
			throw new Error("Wrong credentials");
		}

		const isPasswordCorrect = await bcrypt.compare(
			`${credentials.password}`,
			user.password
		);

		if (!isPasswordCorrect) {
			throw new Error("Wrong credentials");
		}
		return user;
	} catch (error) {
		throw new Error("Failed  to login");
	}
};

const providerConfig = [
	GitHub({
		clientId: process.env.GITHUB_ID,
		clientSecret: process.env.GITHUB_SECRET,
	}),
	CredentialsProvider({
		credentials: {
			username: { label: "username", type: "text" },
			password: { label: "password", type: "password" },
		},
		async authorize(credentials) {
			try {
				const user = await login(credentials);
				return user;
			} catch (err) {
				return null;
			}
		},
	}),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: providerConfig,
	callbacks: {
		async signIn({ account, profile }) {
			if (account?.provider === "github") {
				connectToMongoDB();
				const user = await User.findOne({ email: profile?.email });
				if (!user) {
					const newUser = new User({
						username: profile?.login,
						email: profile?.email,
						img: profile?.avatar_url,
					});

					await newUser.save();
				}

				try {
				} catch (error) {
					return false;
				}
			}
			return true;
		},
		...authConfig.callbacks,
	},
});
