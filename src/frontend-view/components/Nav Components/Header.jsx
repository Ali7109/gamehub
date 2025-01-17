import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/animation_ljyucfqa.json";
import HeaderMenu from "./HeaderMenu";

import { signInWithPopup, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser, setUserProfile } from "../../../StateManagement/actions";
import { auth, db, provider } from "../../../Firebase/Firebase";
import {
	addUser,
	getUserById,
	userExists,
} from "../../../controller/HelperFetch";
import BurgerMenu from "./BurgerMenu";
import VerticalNavbar from "./VerticalNavbar";

const Header = () => {
	const [signedIn, setSignedIn] = useState(false);
	const [loading, setLoading] = useState(false);
	const [userName, setUserName] = useState("");

	const [page, setPage] = useState(0);

	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(function (user) {
			if (user) {
				setSignedIn(true);
				let name = user.displayName.split(" ");
				let len = name.length;
				let fullName =
					len === 1 ? name[0] : name[0] + " " + name[len - 1];

				setUserName(fullName);
				dispatch(setUser(user));
			}
		});
		return () => unsubscribe();
	}, []);

	// const {darkMode, toggleDarkMode} = useContext(DarkModeContext);

	const handleLogin = async () => {
		try {
			setLoading(true);
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			const exists = await userExists(db, user.uid);
			if (!exists) {
				await addUser(db, user); // Add user if not exists
			}

			const userProfile = await getUserById(db, user.uid);
			dispatch(setUserProfile(userProfile));

			dispatch(setUser(user));
			setSignedIn(true);
		} catch (error) {
			console.error("Error during login:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = () => {
		setLoading(true);
		signOut(auth)
			.then(() => {
				dispatch(setUser(null));
				dispatch(setUserProfile(null));
				setSignedIn(false);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	};

	const [collapsed, setCollapsed] = useState(true);
	const handleCollapse = () => {
		setCollapsed(!collapsed);
	};

	return (
		<div
			className={`mt-5 md:mt-0 flex justify-around md:justify-between items-center w-full p-3 rounded-xl bg-gray-dark`}
		>
			<div className="md:hidden">
				{signedIn ? (
					<HeaderMenu onLogout={handleLogout} />
				) : loading ? (
					<CircularProgress
						color="warning"
						className="mr-3"
						size={25}
					/>
				) : (
					<button
						onClick={handleLogin}
						className="p-2 rounded-xl text-base text-black mb-1 cursor-pointer bg-orange  transition hover:-translate-y-1 hover:text-white"
					>
						Sign In
					</button>
				)}
			</div>
			<div className=" md:w-1/6 flex justify-around max-h-fit">
				<div className="w-16 md:w-20 mt-3">
					<Lottie animationData={animationData} />
				</div>
			</div>
			<div className="hidden md:block text-5xl">
				<h1 className="font-prism text-white">
					pixel<span className="or">verse</span>
				</h1>
			</div>
			<div className="absolute left-1/2 -translate-x-1/2 top-4 bg-black pl-9 pr-9 md:hidden text-4xl rounded-xl">
				<h1 className="font-prism text-white">
					pixel<span className="or">verse</span>
				</h1>
			</div>
			<div className="md:hidden">
				<button onClick={handleCollapse}>
					<FontAwesomeIcon
						className=" p-2 ml-3 mt-2 rounded-xl text-lg text-gray-light transition hover:text-black hover:bg-orange"
						icon={faBurger}
					/>
				</button>
			</div>

			<div className="hidden md:flex items-center w-1/6">
				<div className=" md:flex flex-col md:flex-row justify-around md:justify-end items-center p-2 w-full ">
					{signedIn ? (
						<HeaderMenu
							userName={userName}
							onLogout={handleLogout}
						/>
					) : loading ? (
						<CircularProgress
							color="warning"
							className="mr-3"
							size={25}
						/>
					) : (
						<button
							onClick={handleLogin}
							className="p-2 rounded-xl text-base text-black mb-1 cursor-pointer bg-orange transition hover:-translate-y-1 hover:text-white"
						>
							Sign In
						</button>
					)}
					{/* <button onClick={handleToggleDarkMode} className='p-1 pl-3 pr-3 rounded-xl bg-black text-lg text-gray-light transition hover:text-yellow-400'>
              <FontAwesomeIcon icon={darkMode ? faLightbulb : faMoon } />
            </button> */}
				</div>
			</div>
			{!collapsed && (
				<BurgerMenu
					setCollapsed={setCollapsed}
					collapsed={collapsed}
					page={page}
					setPage={setPage}
				/>
			)}
		</div>
	);
};

export default Header;
