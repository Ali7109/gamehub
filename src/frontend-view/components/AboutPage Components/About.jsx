import React from "react";
import discSvg from "../../assets/SVG/discussions.svg";
import newsSvg from "../../assets/SVG/news.svg";
import searchSvg from "../../assets/SVG/search.svg";

import AboutBox from "./AboutBox";

const About = () => {
	const aboutBoxes = [
		{
			title: "News",
			svg: newsSvg,
			content: (
				<p>
					A single stop solution for all things gaming, from <br></br>
					<strong className="text-orange">
						Announcement
					</strong> <br /> to <br />
					<strong className="text-orange">Release</strong>
				</p>
			),
		},
		{
			title: "Discussions",
			svg: discSvg,
			content: (
				<p>
					Everything is better with <br />{" "}
					<strong className="text-orange">Sharing</strong>! <br />{" "}
					Discuss on your favourite titles now!
				</p>
			),
		},
		{
			title: "Queries",
			svg: searchSvg,
			content: (
				<p>
					Query the largest game database on the planet with our
					unique <strong className="text-orange">Filter</strong>{" "}
					system!
				</p>
			),
		},
	];
	return (
		<div className="p-2 border-l-2 border-r-2 border-orange w-full h-full bg-black rounded-xl">
			<div className="w-full h-full text-white p-10 bg-gray-dark rounded-xl">
				<div className="bg-black border-l-2 border-r-2 border-orange max-w-fit m-auto p-1 pl-3 pr-3 rounded-xl">
					<h1 className="text-center text-3xl font-yb text-bgtrans bg-gradient-to-r font-extrabold">
						About Us
					</h1>
				</div>
				<div className="p-5 m-auto md:p-10 mt-20 mb-20 text-center max-w-3xl sh bg-gray-light rounded-xl">
					<p className="text-lg ">
						<span className="font-bold text-xl">
							Welcome to{" "}
							<span className="text-orange">GameHub</span>,
						</span>
						<br></br>your ultimate destination for exploring and
						engaging with the gaming world!
					</p>
				</div>
				<h1 className="text-center text-3xl mt-20 mb-10 font-yb text-bgtrans bg-gradient-to-r font-extrabold">
					What we offer
				</h1>
				<div className="m-auto xs:flex-col md:flex w-full max-w-4xl p-10 gap-10 space-y-5 md:space-y-0 justify-evenly items-center">
					{aboutBoxes.map(({ title, svg, content }, index) => (
						<AboutBox
							title={title}
							svg={svg}
							content={content}
							key={index}
							index={index}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default About;
