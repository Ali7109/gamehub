import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { setUser, setUserProfile } from "../../../StateManagement/actions";
import { auth, db, provider } from "../../../Firebase/Firebase";
import { CircularProgress } from "@mui/material";
import {
	addUser,
	getImageByName,
	getUserById,
	userExists,
} from "../../../controller/HelperFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import UploadModal from "../UploadLogic/UploadModal";
import {motion} from "framer-motion";

const ProfilePage = () => {
	const authUser = useSelector((state) => state.user);
	const user = useSelector((state) => state.userProfile);

	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [profilePic, setProfilePic] = useState(null);
	const [coverPic, setCoverPic] = useState(null);

	const [addingProfilePic, setAddingProfilePic] = useState(false);

	const [editProfile, setEditProfile] = useState(false);

	const handleLogin = async () => {
		setLoading(true);
		try {
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			dispatch(setUser(user));

			const exists = await userExists(db, user.uid);
			if (!exists) {
				await addUser(db, user); // Add user if not exists
			}

			const userProfile = await getUserById(db, user.uid);
			dispatch(setUserProfile(userProfile));
		} catch (error) {
			console.error("Error during login:", error);
		} finally {
			setLoading(false);
		}
	};

	const getUsersProfile = async () => {
		const exists = await userExists(db, authUser.uid);
		if (!exists) {
			await addUser(db, authUser); // Add user if not exists
		}

		const userProfile = await getUserById(db, authUser.uid);
		dispatch(setUserProfile(userProfile));
	};
	const getMetaData = async () => {
		console.log(user);
		if (!user.profPhotoUrl) {
			const profImg = await getImageByName(
				"/profiles/profile-pics",
				"stockProfPic.jpg"
			);
			setProfilePic(profImg);
		} else {
			const profImg = await getImageByName(
				"/profiles/profile-pics",
				user.profPhotoUrl
			);
			setProfilePic(profImg);
		}

		if (!user.coverPhoto) {
			const coverImg = await getImageByName(
				"/profiles/cover-photos",
				"stockCoverPic.jpg"
			);
			setCoverPic(coverImg);
		} else {
			const coverImg = await getImageByName(
				"/profiles/cover-photos",
				user.coverPhoto
			);
			setCoverPic(coverImg);
		}
	};

	useEffect(() => {
		const setup = async () => {
			if (authUser) {
				if (!user) {
					await getUsersProfile();
				} else {
					await getMetaData();
				}
			}
		};
		setup();
	}, [authUser, user]); // Add 'user' and 'authUser' to the dependencies to re-run when either changes

	return (
		<motion.div
		layout
		initial={{opacity: 0, y:20}}
		animate={{opacity: 1, y:0}}
		exit={{opacity: 0, y:20}}
		transition={{duration: 1, type: "spring", stiffness: 100}}

		
		className="rounded-xl h-full flex-col w-full">
			{addingProfilePic && (
				<UploadModal
					user={user}
					getMetaData={getMetaData}
					setAddingProfilePic={setAddingProfilePic}
				/>
			)}
			{user ? (
				<>
					<div
						className={
							"w-full rounded-t-xl flex items-center h-52 bg-orange"
						}
					>
						<div className="w-full h-44 bg-stock-coverphoto bg-center bg-cover p-5">
							<motion.div
							layout
							initial={{opacity: 0}}
							animate={{opacity: 1}}
							transition={{duration: 1, delay: 0.5}}

							className="flex-1 m-5 h-24 w-24 rounded-full">
								{profilePic &&
									(!editProfile ? (
										<img
											className="rounded-full object-cover h-full w-full"
											src={profilePic}
											alt="Profile account DP"
										/>
									) : (
										<>
											<div className="relative rounded-full h-full w-full overflow-hidden">
												{/* The overlay */}
												<motion.div
												layout
												initial={{opacity: 0}}
												animate={{opacity: 1}}
												transition={{duration: 1}}
												className="absolute top-0 left-0 w-full h-full flex bg-black bg-opacity-50 z-10">
													<FontAwesomeIcon
														onClick={() =>
															setAddingProfilePic(
																true
															)
														}
														className="cursor-pointer rounded-full p-2 text-3xl m-auto text-white transition peer-hover:text-black hover:text-black hover:bg-orange"
														icon={faPen}
													/>
												</motion.div>

												{/* The image */}
												<img
													className="w-full h-full object-cover rounded-full"
													src={profilePic}
													alt="Profile account DP"
												/>
											</div>
										</>
									))}
							</motion.div>
						</div>
					</div>
					<div className="flex p-10 space-y-3 text-white bg-gray-dark rounded-b-xl">
						<div className="w-full flex flex-col md:flex-row justify-between md:items-center">
							<div className="w-2/3">
								<h1 className="text-3xl font-bold">
									{user.displayName}
								</h1>
								<button
									className={
										"transition mt-2 w-36 bg-orange bg-opacity px-3 rounded-lg text-black shadow-white " +
										(editProfile
											? "bg-green shadow-lg -translate-y-1"
											: "shadow-md")
									}
									onClick={() => setEditProfile(!editProfile)}
								>
									{editProfile
										? "exit edit mode"
										: "edit profile"}
								</button>
							</div>
							<h2
								className="mt-4 md:mt-0"
								onClick={() => console.log(addingProfilePic)}
							>
								{user.email}
							</h2>
						</div>
					</div>
				</>
			) : (
				<div className="flex justify-center items-center w-full h-[400px]">
					<div className="flex-col bg-sign-in-splash rounded-xl h-[170px] md:h-[200px] w-[550px] md:w-[650px] bg-cover bg-no-repeat bg-center bg-white p-10 space-y-3 text-white">
						<div className="m-auto md:flex justify-around w-full h-full relative">
							<h1 className="absolute bottom-0 left-0 text-2xl font-bold text-orange">
								Uh Oh! <br />
								<h3 className="text-sm text-white font-medium">
									It appears you aren't signed in...
								</h3>
							</h1>
							{loading ? (
								<CircularProgress
									color="warning"
									className="mr-3"
									size={25}
								/>
							) : (
								<button
									onClick={handleLogin}
									className="absolute bottom-0 right-0 w-[90px] h-[40px] md:w-[100px] md:h-[50px] rounded-xl text-sm md:text-base text-black cursor-pointer bg-orange transition hover:-translate-y-1 hover:text-white"
								>
									Sign in now!
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</motion.div>
	);
};

export default ProfilePage;
