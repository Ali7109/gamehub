import React from "react";

const AboutBox = ({ index, title, svg, content }) => {
	const alt = index % 2 === 0;

	return (
		<div
			className={
				`sh text-center flex flex-col p-5 w-full h-[400px] border-l-2 border-r-2 rounded-xl border-orange ` +
				(alt ? "border-orange bg-black" : "bg-gray-light")
			}
		>
			<h1 className="text-xl font-bold">{title}</h1>
			<div className="h-2 w-2 m-auto mt-5 bg-white rounded-full"></div>
			<p className="mt-5">{content}</p>
			<img className="h-3/6 m-auto" alt="News svg" src={svg} />
		</div>
	);
};

export default AboutBox;
