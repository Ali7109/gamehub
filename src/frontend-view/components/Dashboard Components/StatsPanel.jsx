import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const StatsPanel = () => {
	const data = useSelector((state) => state.data);
	const publishers = useSelector((state) => state.publishers);

	const countOfTitles = data.count - 10000;
	const countOfPublishers = publishers.count - 1000;
	const platforms = 50;

	const [count, setCount] = useState(0);
	const [platformsCount, setPlatformsCount] = useState(0);
	const [publishersCount, setPublishersCount] = useState(0);

	useEffect(() => {
		const incrementCounter = (setter, increment, maxNum, delay) => {
			let currentValue = 0;
			const interval = setInterval(() => {
				currentValue += increment;
				setter((prev) =>
					currentValue < maxNum ? currentValue : maxNum
				);
				if (currentValue >= maxNum) {
					clearInterval(interval);
				}
			}, delay);
		};

		const timer = setTimeout(() => {
			incrementCounter(setCount, 10000, countOfTitles, 10);
			setTimeout(
				() =>
					incrementCounter(
						setPublishersCount,
						1000,
						countOfPublishers,
						10
					),
				500
			);
			setTimeout(
				() => incrementCounter(setPlatformsCount, 5, platforms, 10),
				1000
			);
		}, 500); // Trigger after 0.5 seconds

		return () => clearTimeout(timer); // Cleanup timeout on unmount
	}, [countOfTitles, countOfPublishers, platforms]);

	return (
		<div className="metr-cont space-y-16 md:space-y-0 md:flex gap-2 p-5 w-full justify-center items-center">
			{[
				{ label: "Titles", value: count, max: countOfTitles },
				{
					label: "Publishers",
					value: publishersCount,
					max: countOfPublishers,
				},
				{ label: "Platforms", value: platformsCount, max: platforms },
			].map(({ label, value, max }, index) => (
				<div
					key={index}
					className="drop-shadow-xl flex w-60 h-60 font-mono text-3xl bg-gray-dark rounded-xl p-5 text-center text-white"
				>
					<div className="m-auto">
						{max <= 0 ? (
							<CircularProgress color="warning" />
						) : (
							<>
								<h1 className="transition font-bold text-orange tracking-wide hover:scale-110">
									{value.toLocaleString("en-US")}+
								</h1>
								<h2>{label}</h2>
							</>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default StatsPanel;
