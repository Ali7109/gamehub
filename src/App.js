import { Route, Routes } from "react-router-dom";
import "./frontend-view/App.css";
import Dashboard from "./frontend-view/pages/Dashboard";
import {
	Header,
	VerticalNavbar,
} from "./frontend-view/components/Nav Components/NavComponents";
import { ThemeProvider } from "@mui/material";
import theme from "./frontend-view/theme";
import GameDataAPIController from "./controller/GameDataAPIController";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	setData,
	setHighestRatedGames,
	setPublishers,
} from "./StateManagement/actions";
import BackToTop from "./frontend-view/components/BackToTop";
import ProfilePage from "./frontend-view/components/ProfilePage Components/ProfilePage";
import Footer from "./frontend-view/components/Footer Components/Footer";
import About from "./frontend-view/components/AboutPage Components/About";
import Search from "./frontend-view/pages/Search";
import GameDetailsPage from "./frontend-view/pages/GameDetailsPage";
import DevDetailsPage from "./frontend-view/pages/DevDetailsPage";
import Blog from "./frontend-view/components/Blog Components/Blog";
import ViewBlog from "./frontend-view/components/Blog Components/ViewBlog";
import ScrollToTop from "./scrollToTop";
import { motion } from "framer-motion";

function App() {
	const dispatch = useDispatch();
	const [triggerUpButton, setTriggerUpButton] = useState(false);

	useEffect(() => {
		const fetch = async () => {
			try {
				const data = await GameDataAPIController("games");
				const publishers = await GameDataAPIController("publishers");
				const highRatedGames = await GameDataAPIController(
					"games",
					"&page=1&page_size=10&metacritic=80,100"
				);
				dispatch(setData(data));
				dispatch(setPublishers(publishers));
				dispatch(setHighestRatedGames(highRatedGames));
			} catch (error) {
				console.error(error);
			}
		};
		const container = document.querySelector(".network-container");

		fetch();

		// Create a random number of nodes
		const numNodes = 15; // Number of nodes in the network
		const nodes = [];

		// Create nodes and add to the container
		for (let i = 0; i < numNodes; i++) {
			const node = document.createElement("div");
			node.classList.add("node");
			node.style.left = `${Math.random() * window.innerWidth}px`;
			node.style.top = `${Math.random() * window.innerHeight}px`;

			container.appendChild(node);
			nodes.push(node);
		}

		// Function to draw lines between two nodes
		const drawLine = (node1, node2) => {
			const line = document.createElement("div");
			line.classList.add("line");

			// Get the positions of the nodes
			const x1 = parseFloat(node1.style.left) + node1.offsetWidth / 2;
			const y1 = parseFloat(node1.style.top) + node1.offsetHeight / 2;
			const x2 = parseFloat(node2.style.left) + node2.offsetWidth / 2;
			const y2 = parseFloat(node2.style.top) + node2.offsetHeight / 2;

			// Calculate the distance and angle between the nodes
			const distance = Math.sqrt(
				Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
			);
			const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

			// Set the position, size, and rotation of the line
			line.style.width = `${distance}px`;
			line.style.transform = `rotate(${angle}deg)`;
			line.style.left = `${x1}px`;
			line.style.top = `${y1}px`;

			// Add animation to the line for fading effect
			line.style.animation = "fade 4s infinite";

			container.appendChild(line);
		};

		// Improved randomization: Create connections with random distance constraint
		const createNetwork = () => {
			// Clear any previous lines
			const existingLines = container.querySelectorAll(".line");
			existingLines.forEach((line) => line.remove());

			// Create random lines between nodes with better distribution
			const maxDistance = 200; // Maximum allowed distance for creating connections
			nodes.forEach((node1) => {
				nodes.forEach((node2) => {
					if (node1 !== node2) {
						// Get positions of nodes and calculate distance
						const x1 = parseFloat(node1.style.left);
						const y1 = parseFloat(node1.style.top);
						const x2 = parseFloat(node2.style.left);
						const y2 = parseFloat(node2.style.top);
						const distance = Math.sqrt(
							Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
						);

						// Only draw a line if distance is within the allowed range (randomize the likelihood)
						if (distance < maxDistance && Math.random() < 0.2) {
							drawLine(node1, node2); // Draw line between the two nodes
						}
					}
				});
			});
		};

		// Create the network every 3 seconds
		const interval = setInterval(createNetwork, 4000);

		// Cleanup on component unmount
		return () => clearInterval(interval);
	}, []);

	window.addEventListener("scroll", () => {
		if (window.scrollY > 150) {
			setTriggerUpButton(true);
		} else {
			setTriggerUpButton(false);
		}
	});

	return (
		<ThemeProvider theme={theme}>
			{/* <DarkModeProvider> */}
			<div className="App p-5 min-h-screen justify-center ">
				<motion.div
					layout
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5, type: "tween" }}
					className="network-container"
				></motion.div>

				<div className="flex flex-col  items-center md:p-5 gap-10 w-full min-h-screen">
					<Header />
					<VerticalNavbar />

					<ScrollToTop />
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/about" element={<About />} />
						<Route path="/search" element={<Search />} />
						<Route path="/blog" element={<Blog />} />
						<Route path="/blog/view/:id" element={<ViewBlog />} />
						<Route
							exact
							path="/search/:id"
							element={<GameDetailsPage />}
						/>
						<Route
							exact
							path="/developers/:id"
							element={<DevDetailsPage />}
						/>
					</Routes>
				</div>

				{/* <RightNavbar /> */}
			</div>
			<Footer />
			{triggerUpButton && <BackToTop />}
			{/* </DarkModeProvider> */}
		</ThemeProvider>
	);
}

export default App;
