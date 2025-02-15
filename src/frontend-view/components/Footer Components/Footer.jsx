import React from "react";
import PageList from "./PageList";

const Footer = () => {
	return (
		<div className="w-full text-white text-xl font-yb bg-gray-dark rounded-t-xl p-10 flex items-center justify-around">
			<div className="flex-col md:flex-row space-y-4 md:space-y-0">
				<div className="rounded-full ">
					<img
						src={require("../../images/ghlogo.png")}
						alt="Game hub logo"
						className="rounded-full border border-black h-16 w-16"
					/>
				</div>
				<div className="">
					&copy;GameHub {new Date().getFullYear()}.<br></br>All rights
					reserved.
				</div>
			</div>
			<div className="text-base">
				<PageList />
			</div>
		</div>
	);
};

export default Footer;
