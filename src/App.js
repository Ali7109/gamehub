import { Route, Routes } from "react-router-dom";
import "./frontend-view/App.css";
import Dashboard from "./frontend-view/pages/Dashboard";
import {
	Header,
	VerticalNavbar,
	RightNavbar,
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
		fetch();
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
			<div className="App flex p-5 min-h-screen justify-center">
				<VerticalNavbar />
				<div className="flex flex-col  items-center md:p-5 gap-10 w-11/12 md:w-10/12">
					<Header />
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
				<RightNavbar />
			</div>
			<Footer />
			{triggerUpButton && <BackToTop />}
			{/* </DarkModeProvider> */}
		</ThemeProvider>
	);
}

export default App;
