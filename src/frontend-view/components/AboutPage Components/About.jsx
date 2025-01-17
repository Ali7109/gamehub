import React from "react";
import discSvg from "../../assets/SVG/discussions.svg";
import newsSvg from "../../assets/SVG/news.svg";
import storeSvg from "../../assets/SVG/store.svg";

const About = () => {
	return (
		<div className="p-2 border-l-2 border-r-2 border-orange w-full bg-black rounded-xl">
			<div className="w-full text-white p-10 bg-gray-dark rounded-xl">
				<div className="bg-black border-l-2 border-r-2 border-orange max-w-fit m-auto p-1 pl-3 pr-3 rounded-xl">
					<h1 className="text-center text-3xl font-yb text-bgtrans bg-gradient-to-r font-extrabold">
						About Us
					</h1>
				</div>
				<div className="p-5 md:p-10 mt-20 mb-20 text-center sh bg-gray-light rounded-xl">
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
				<div className="xs:flex-col md:flex w-full p-10 gap-10 space-y-5 md:space-y-0 justify-evenly items-center">
					<div className="sh text-center p-5 w-full border-l-2 border-r-2 border-orange rounded-xl bg-black">
						<h1 className="text-xl font-bold">News</h1>
						<div className="h-2 w-2 m-auto mt-5 bg-white rounded-full"></div>
						<p className="mt-5">
							A single stop solution for all things gaming, from{" "}
							<br></br>
							<strong className="text-orange">
								Announcement
							</strong>{" "}
							<br /> to <br />
							<strong className="text-orange">Release</strong>
						</p>
						<img className="mt-5" alt="News svg" src={newsSvg} />
					</div>
					<div className="sh-white text-center p-5 w-full border-l-2 border-r-2 border-orange rounded-xl bg-gray-light">
						<h1 className="text-xl font-bold">Discussions</h1>
						<div className="h-2 w-2 m-auto mt-5 bg-white rounded-full"></div>
						<p className="mt-5">
							Everything is better with <br />{" "}
							<strong className="text-orange">FRIENDS</strong>!{" "}
							<br /> Discuss on your favourite titles now!
						</p>
						<img
							className="mt-5"
							alt="Discussions svg"
							src={discSvg}
						/>
					</div>
					{/* <div className="sh text-center p-5 w-full border-l-2 border-r-2 border-orange rounded-xl bg-black">
						<h1 className="text-xl font-bold">Store</h1>
						<div className="h-2 w-2 m-auto mt-5 bg-white rounded-full"></div>
						<p className="mt-5">
							Want to find the <br />{" "}
							<strong className="text-orange">
								Best Gaming Deals?
							</strong>
							<br /> We've got you on our Store page
						</p>
						<img className="mt-5" alt="Store svg" src={storeSvg} />
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default About;
