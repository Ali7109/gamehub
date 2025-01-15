import React, { useState } from "react";
import {
	updateUserProfilePic,
	uploadImage,
} from "../../../controller/HelperFetch";

const UploadModal = ({ user, getMetaData, setAddingProfilePic }) => {
	const [loading, setLoading] = useState(false);

	// Handle profile picture change
	const handleProfilePicChange = async (event) => {
		const file = event.target.files[0]; // Get the file from input
		const userId = user.id; // Get the logged-in user's ID
		const fileName = file.name; // Using the original file name

		if (!file) return;

		setLoading(true); // Show loading while uploading

		try {
			const uploadedPicUrl = await uploadImage(file, userId, fileName);
			// Now update the user's profilePicUrl in your database (e.g., Firebase Firestore)
			await updateUserProfilePic(user.id, uploadedPicUrl);
		} catch (error) {
			console.error("Error uploading profile picture:", error);
			alert("Error uploading profile picture, please try again.");
		} finally {
			setLoading(false); // Hide loading
			setAddingProfilePic(false); // Close the modal after upload
			await getMetaData(); // Refresh the profile pictures
		}
	};

	return (
		<>
			<div className="">
				{/* The overlay */}
				<div className="absolute top-0 left-0 w-full h-full flex bg-black opacity-80 z-50"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
					<div className="w-96 bg-gray-dark rounded-xl p-5">
						<h1 className="text-2xl text-white font-bold">
							Upload Image
						</h1>
						<div className="flex justify-between items-center mt-5">
							<input
								type="file"
								name="file"
								id="file"
								className="hidden"
								onChange={handleProfilePicChange}
							/>
							<label
								htmlFor="file"
								className="bg-orange text-white px-5 py-2 rounded-lg cursor-pointer"
							>
								Select Image
							</label>
						</div>
						{loading && (
							<p className="text-white mt-3">Uploading...</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default UploadModal;
