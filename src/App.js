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
	setUser,
} from "./StateManagement/actions";
import BackToTop from "./frontend-view/components/BackToTop";
import ProfilePage from "./frontend-view/components/ProfilePage Components/ProfilePage";

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
				// const user = {
				// 	name: "Jeff Bezos",
				// 	id: crypto.randomUUID(),
				// 	rating: 2.3,
				// };
				// dispatch(setUser(user));
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
			<div className="App flex p-5 justify-center">
				<VerticalNavbar />
				<div className="flex flex-col  items-center p-5 gap-10 w-10/12">
					<Header />
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/profile" element={<ProfilePage />} />
						{/* <Route path="contact" element={ <Contact/> } /> */}
					</Routes>
				</div>
				<RightNavbar />
			</div>
			{triggerUpButton && <BackToTop />}
		</ThemeProvider>
	);
}

export default App;
