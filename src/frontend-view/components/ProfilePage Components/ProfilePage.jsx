import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { setUser, setUserProfile } from "../../../StateManagement/actions";
import { auth, db, provider } from "../../../Firebase/Firebase";
import { CircularProgress } from "@mui/material";
import { addUser, getImageByName, getUserById, userExists } from "../../../controller/HelperFetch";

const ProfilePage = () => {
	const authUser = useSelector((state) => state.user);
	const user = useSelector((state) => state.userProfile);

	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [profilePic, setProfilePic] = useState(null);
	const [coverPic, setCoverPic] = useState(null);

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
	
	useEffect(() => {
		const getUsersProfile = async () => {
			const exists = await userExists(db, authUser.uid);
			if (!exists) {
				await addUser(db, authUser); // Add user if not exists
			}
	
			const userProfile = await getUserById(db, authUser.uid);
			dispatch(setUserProfile(userProfile));
		}
		const getMetaData = async () => {
			if (!user.profPhotoUrl){
				const profImg = await getImageByName('/profiles/profile-pics', 'stockProfPic.jpg');
				setProfilePic(profImg);
			} else {
				const profImg = await getImageByName('/profiles/profile-pics', user.profPhotoUrl);
				setProfilePic(profImg);
			}

			if(!user.coverPhoto){
				const coverImg = await getImageByName('/profiles/cover-photos', 'stockCoverPic.jpg');
				setCoverPic(coverImg);
			} else {
				const coverImg = await getImageByName('/profiles/cover-photos', user.coverPhoto);
				setCoverPic(coverImg);
			}
		}
		if (authUser) {
			if(!user){
				getUsersProfile();
			}
			getMetaData();
		}
	}, [user])
	
	return (
		<div className="rounded-xl w-full flex-col max-h-fit bg-gray-dark">
			{user ? (
				<>
					<div className="w-full rounded-t-xl flex items-center h-52 bg-orange">
						<div className="w-full h-44 bg-stock-coverphoto bg-center bg-cover p-5">
							<div className="flex-1 m-5 h-24 w-24 rounded-full">
								<img
									className="rounded-full object-cover"
									src={profilePic}
									alt="Profile account DP"
								/>
							</div>
						</div>
					</div>
					<div className="flex-col p-10 space-y-3 text-white">
						<div className="w-full flex justify-between">
							<h1 className="text-3xl">{user.displayName}</h1>
							<h2>{user.email}</h2>
						</div>
						<p className="text-center italic font-bold">
							Feature under development
						</p>
					</div>
				</>
			) : (
				<>
					<div className="w-full rounded-t-xl flex items-center h-52 bg-orange bg-opacity-50">
						<div className="w-full h-44 bg-black bg-center bg-cover p-5">
							<div className="flex-1 m-5 h-24 w-24 rounded-full">
								<img
									className="rounded-full"
									src={coverPic}
									alt="error loading DP"
								/>
							</div>
						</div>
					</div>
					<div className="flex-col p-10 space-y-3 text-white">
						<div className="w-full flex justify-around">
							<h1 className="text-xl bg-black p-2 rounded-xl">
								It appears you aren't signed in, let's change
								that &#10145;
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
									className="p-2 rounded-xl text-base text-black mb-1 cursor-pointer bg-orange  transition hover:scale-110 hover:text-white"
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
