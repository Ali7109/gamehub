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
		<div className="rounded-xl w-full flex-col max-h-fit bg-gray-dark">
			{addingProfilePic && (
				<UploadModal
					user={user}
					getMetaData={getMetaData}
					setAddingProfilePic={setAddingProfilePic}
				/>
			)}
			{user ? (
				<>
					<div className="w-full rounded-t-xl flex items-center h-52 bg-orange">
						<div className="w-full h-44 bg-stock-coverphoto bg-center bg-cover p-5">
							<div className="flex-1 m-5 h-24 w-24 rounded-full">
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
												<div className="absolute top-0 left-0 w-full h-full flex bg-black bg-opacity-50 z-10">
													<FontAwesomeIcon
														onClick={() =>
															setAddingProfilePic(
																true
															)
														}
														className="cursor-pointer rounded-full p-2 text-3xl m-auto text-white transition peer-hover:text-black hover:text-black hover:bg-orange"
														icon={faPen}
													/>
												</div>

												{/* The image */}
												<img
													className="w-full h-full object-cover rounded-full"
													src={profilePic}
													alt="Profile account DP"
												/>
											</div>
										</>
									))}
							</div>
						</div>
					</div>
					<div className="flex p-10 space-y-3 text-white">
						<div className="w-full flex justify-between">
							<div className="w-2/3">
								<h1 className="text-3xl">{user.displayName}</h1>
								<button
									className="mt-2 bg-white bg-opacity-50 px-3 rounded-lg text-black hover:bg-opacity-70"
									onClick={() => setEditProfile(!editProfile)}
								>
									{editProfile
										? "exit edit mode"
										: "edit profile"}
								</button>
							</div>
							<h2 onClick={() => console.log(addingProfilePic)}>
								{user.email}
							</h2>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="w-full rounded-t-xl flex items-center h-52 bg-orange bg-opacity-50">
						<div className="w-full h-44 bg-black bg-center bg-cover p-5">
							<div className="flex-1 m-5 h-24 w-24 rounded-full">
								{coverPic && (
									<img
										className="rounded-full"
										src={coverPic}
										alt="error loading DP"
									/>
								)}
							</div>
						</div>
					</div>
					<div className="flex-col p-10 space-y-3 text-white">
						<div className="w-full md:flex justify-around">
							<h1 className="hidden md:visible text-xl bg-black p-2 rounded-xl">
								It appears you aren't signed in, let's change
								that &#10145;
							</h1>
							<h1 className="text-center md:hidden text-xl bg-black p-2 rounded-xl">
								It appears you aren't signed in, let's change
								that &#11015;
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
									className="p-2 mt-5 md:mt-0 w-full md:w-fit rounded-xl text-base text-black mb-1 cursor-pointer bg-orange transition hover:-translate-y-1 hover:text-white"
								>
									Sign In Now
								</button>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ProfilePage;
