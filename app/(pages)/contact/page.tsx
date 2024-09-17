import Image from "next/image";
import contact from "../../assets/images/contact.png";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "contact page",
	description: "nextjs Website contact page",
};

export default function Contact() {
	return (
		<div className="contact-container">
			<div className="img-container">
				<Image src={contact} alt="contact image" fill className="img-contact" />
			</div>
			<div className="form-container">
				<form action="" className="form">
					<input type="text" placeholder="Name and Surname" />
					<input type="text" placeholder="Email address" />
					<input type="text" placeholder="Phone Number (Optional)" />
					<textarea
						name=""
						id=""
						cols={30}
						rows={10}
						placeholder="Message"
					></textarea>
					<button>Send</button>
				</form>
			</div>
		</div>
	);
}
