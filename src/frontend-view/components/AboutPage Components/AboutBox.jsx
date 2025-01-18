import React from "react";
import { motion } from "framer-motion";

const AboutBox = ({ index, title, svg, content }) => {
	const alt = index % 2 === 0;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.2 }}
			exit={{ opacity: 0, y: 20 }}
			className={
				`sh text-center flex flex-col p-5 w-full h-[400px] border-l-2 border-r-2 rounded-xl border-orange ` +
				(alt ? "border-orange bg-black" : "bg-gray-light")
			}
		>
			<h1 className="text-xl font-bold">{title}</h1>
			<div className="h-2 w-2 m-auto mt-5 bg-white rounded-full"></div>
			<p className="mt-5">{content}</p>
			<img className="h-3/6 m-auto" alt="News svg" src={svg} />
		</motion.div>
	);
};

export default AboutBox;
