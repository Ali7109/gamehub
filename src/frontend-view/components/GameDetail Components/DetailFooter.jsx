import React, { useEffect, useState } from "react";

const DetailFooter = ({ game }) => {
	const metacriticImage = require("../../images/Metacritic.png");
	const redditImage = require("../../images/reddit.png");

	const [showReddit, setShowReddit] = useState(false);

	useEffect(() => {
		setShowReddit(window.location.pathname !== "/");
	}, []);

	const renderGenres = () => {
		if (!game.genres || game.genres.length === 0) return "Unknown Genre";
		return game.genres.map((genre) => genre.name).join(" - ");
	};

	return (
		<div className="flex flex-col items-center w-full space-y-4 z-1">
			{/* Metacritic and Reddit Section */}
			<div className="flex flex-col items-center gap-4 w-full">
				{/* Metacritic */}
				<div className="bg-white bg-opacity-20 text-white hover:text-black bg-metayellow font-bold rounded-xl p-2 min-w-[120px] text-center transition-all">
					<a
						className="flex items-center justify-center"
						href={`https://www.metacritic.com/game/pc/${game.slug}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src={metacriticImage}
							alt="Metacritic Icon"
							className="mr-2 h-6"
						/>
						<span>{game.metacritic || "N/A"}</span>
					</a>
				</div>

				{/* Reddit */}
				{showReddit && game.reddit_url && (
					<a
						className="bg-white bg-opacity-20 bg-red text-center font-bold w-12 h-12 rounded-xl p-2 flex items-center justify-center transition-all"
						href={game.reddit_url}
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src={redditImage}
							alt="Reddit Icon"
							className="h-6 w-6"
						/>
					</a>
				)}
			</div>

			{/* Genres Section */}
			<div className="bg-black bg-opacity-20 text-white font-bold rounded-xl p-2 w-full text-center">
				{renderGenres()}
			</div>
		</div>
	);
};

export default DetailFooter;
