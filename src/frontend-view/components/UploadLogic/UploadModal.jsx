import React, { useState } from "react";
import Compressor from "compressorjs"; // Import CompressorJS
import {
	updateUserProfilePic,
	uploadImage,
} from "../../../controller/HelperFetch";
import { motion } from "framer-motion";	

const UploadModal = ({ user, getMetaData, setAddingProfilePic }) => {
	const [loading, setLoading] = useState(false);

	// Handle profile picture change
	const handleProfilePicChange = async (event) => {
		const file = event.target.files[0]; // Get the file from input
		const userId = user.id; // Get the logged-in user's ID

		if (!file) return;

		setLoading(true); // Show loading while uploading

		try {
			// Check if the file size is greater than 50KB (50 * 1024 bytes)
			if (file.size > 20 * 1024) {
				// Compress the image before uploading if it's greater than 50KB
				const compressedFile = await new Promise((resolve, reject) => {
					new Compressor(file, {
						quality: 0.8, // Adjust quality to your preference (0 to 1)
						success(result) {
							resolve(result);
						},
						error(err) {
							reject(err);
						},
					});
				});

				// Use the compressed file for uploading
				const uploadedPicUrl = await uploadImage(
					compressedFile,
					userId
				);
				await updateUserProfilePic(user.id, uploadedPicUrl); // Update profile picture URL in DB
			} else {
				// Upload without compression if the file is already smaller than 50KB
				const uploadedPicUrl = await uploadImage(file, userId);
				await updateUserProfilePic(user.id, uploadedPicUrl);
			}
		} catch (error) {
			console.error("Error uploading profile picture:", error);
			alert("Error uploading profile picture, please try again.");
		} finally {
			setLoading(false); // Hide loading
			setAddingProfilePic(false); // Close the modal after upload
			getMetaData(); // Fetch metadata after upload
		}
	};

	return (
		<>
			<div


			className="">
				{/* The overlay */}
				<div className="absolute top-0 left-0 w-full h-full flex bg-black opacity-80 z-50"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
					<motion.div			
			initial={{ opacity: 0, y: 20}}
			animate={{ opacity: 1, y: 0}}
			exit={{ opacity: 0, y:20 }}
			transition={{ duration: 0.5, type: "tween", ease: "easeInOut"}}
			 className="w-96 bg-gray-dark rounded-xl p-5">
						<button className="transition absolute top-5 right-5 text-white bg-red-600 px-2 rounded-lg hover:-translate-y-[2px] hover:bg-opacity-70"
						onClick={() => setAddingProfilePic(false)}
						>cancel</button>
						<h1 className="text-2xl text-white font-bold">
							Upload a avatar!
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
								className="bg-orange text-white px-5 py-2 rounded-lg cursor-pointer transition shadow-lg hover:-translate-y-[2px] hover:bg-opacity-70"
							>
								Select Image
							</label>
						</div>
						{loading && (
							<p className="text-white mt-3">Uploading...</p>
						)}
					</motion.div>
				</div>
			</div>
		</>
	);
};

export default UploadModal;
