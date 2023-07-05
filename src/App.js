import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import VerticalNavbar from "./components/VerticalNavbar";

import firebase from "firebase/compat/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Header from "./components/Header";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import RightNavbar from "./components/RightNavbar";

firebase.initializeApp({
	apiKey: process.env.FB_KEY,
	authDomain: "gamehub-dbb2b.firebaseapp.com",
	projectId: "gamehub-dbb2b",
	storageBucket: "gamehub-dbb2b.appspot.com",
	messagingSenderId: "26190038291",
	appId: "1:26190038291:web:9316c6a914159ba5d206e6",
	measurementId: "G-6B7C5KJ51P",
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App flex p-5 md:space-x-10">
				<VerticalNavbar />
				<div className=" flex flex-col gap-10 w-full">
					<Header />
					<Routes>
						<Route path="/" element={<Dashboard />} />
						{/* <Route path="services" element={ <Services/> } /> */}
						{/* <Route path="contact" element={ <Contact/> } /> */}
					</Routes>
				</div>
				<RightNavbar />
			</div>
		</ThemeProvider>
	);
}

export default App;
