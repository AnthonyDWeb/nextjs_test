import Image from "next/image";

export default function Home() {
	return (
		<div className="home-container">
			<div className="home-text-container">
				<h1 className="home-title">Creative thoughts Agency.</h1>
				<p className="home-description">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
					accusamus voluptate consequatur vero voluptates et iusto officiis
				</p>
				<div className="home-buttons">
					<button className="home-button">Learn More</button>
					<button className="home-button">Contact</button>
				</div>
				<div className="brands">
					<Image src={"/images/brands.png"} alt="brands image" className="brandsImage" fill />
				</div>
			</div>
			<div className="home-img-container">
				<Image src={"/images/hero.gif"} fill alt="hero image" />
			</div>
		</div>
	);
}
