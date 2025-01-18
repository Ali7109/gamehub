import React, { useEffect, useState } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { useSelector } from "react-redux";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { CircularProgress } from "@mui/material";
import DetailFooter from "../GameDetail Components/DetailFooter";
import {motion} from "framer-motion";

const HighRatedGameShowcase = () => {
	const highestRated = useSelector((state) => state.highestRated);
	const [games, setGames] = useState([]);

	useEffect(() => {
		// Update the games array whenever highestRated changes
		if (highestRated?.results) {
			setGames(highestRated.results);
		}
	}, [highestRated]);

	return (
		<motion.div
		initial={{opacity: 0, y:10}}
		animate={{opacity: 1, y:0}}
		exit={{opacity: 0, y:10}}
		transition={{duration: 1, delay: 1.5}}
		 className="w-full flex-col">
			<h1 className="text-white text-3xl font-yb rounded-t-3xl font-bold p-6 text-center bg-gray-dark">
				Highest Rated Titles
			</h1>
			<Splide
				hasTrack={false}
				className="bg-gray-dark rounded-xl"
				options={{
					type: "loop",
					autoplay: true,
					drag: "free",
					focus: "center",
					perPage: 1,
					preloadPages: 3,
					gap: "10px",
					autoScroll: {
						pauseOnHover: false,
						pauseOnFocus: false,
						rewind: false,
						speed: 1,
					},
				}}
				extensions={AutoScroll}
				aria-label="Sliding showcase for high-rated games"
			>
				<div className="splide__progress">
					<div className="splide__progress__bar" />
				</div>
				<SplideTrack>
					{games.length > 0 ? (
						games.map((game, index) => (
							<SplideSlide
								className="h-64 rounded-xl w-full"
								key={index}
							>
								<div className="flex items-center w-full h-full">
									<div
										className="w-full max-w-full flex justify-around items-center h-full bg-cover bg-center md:bg-top"
										style={{
											backgroundImage: `url(${game.background_image})`,
										}}
									>
										<div className="flex justify-center items-center w-full h-full bg-black bg-opacity-70">
											<div className="w-1/2 max-w-full">
												<h1 className="text-orange text-center font-bold sm:text-2xl md:text-4xl mb-2">
													{game.name}
												</h1>
												<DetailFooter game={game} />
											</div>
										</div>
									</div>
								</div>
							</SplideSlide>
						))
					) : (
						<div className="flex justify-center items-center h-64">
							<CircularProgress color="warning" />
						</div>
					)}
				</SplideTrack>
			</Splide>
		</motion.div>
	);
};

export default HighRatedGameShowcase;
