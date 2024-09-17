import Image from "next/image";
import { Metadata } from "next/types";

export const metadata: Metadata = {
	title: "about page",
	description: "nextjs Website about page",
};

export default function About() {
	const imgUrl =
		"https://i.pinimg.com/736x/68/e3/da/68e3dabc6d340c0f71d563ae7aefa412.jpg";
	return (
		<div className="img-container">
			<Image src={imgUrl} alt="about image" fill />
		</div>
	);
}
