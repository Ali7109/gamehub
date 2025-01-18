import React, { useState, useEffect } from "react";
import { fetchBlogs } from "../../../controller/HelperFetch";
import { CircularProgress } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGhost,
	faHeadset,
	faScroll,
} from "@fortawesome/free-solid-svg-icons";
import BlogsDisplay from "./BlogsDisplay";
import CreateBlog from "./CreateBlog";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Blog = () => {
	const user = useSelector((state) => state.user);

	const [blogs, setBlogs] = useState([]);
	const [createPage, setCreatePage] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		refetchBlogs();
	}, []);

	const refetchBlogs = () => {
		setLoading(true);
		fetchBlogs().then(setBlogs).then(setLoading(false));
	};
	return (
		<>
			<motion.div
				layout
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				className="w-full bg-press-banner bg-center rounded-xl"
			>
				<div className=" w-full flex items-center justify-around bg-black bg-opacity-80 rounded-xl p-3 md:pl-20 md:pr-20 text-center">
					<motion.div
					initial={{ x:30, y: -50, opacity: 0 }}
					animate={{ x:0, y: 0, opacity: 1 }}
					transition={{ delay: 0.5, duration: 2, type: 'spring' }}
					className="text-white text-5xl flex items-center justify-around">
						<FontAwesomeIcon icon={faHeadset} />
					</motion.div>
					<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5, duration: 1 }}
					>
						<FontAwesomeIcon
							icon={faScroll}
							className="text-white text-5xl"
						/>
						<h1 className="text-orange font-mono text-4xl md:text-6xl">
							PixelPress
						</h1>
						<p className="text-white">
							Your daily dose of the gaming industry
						</p>
					</motion.div>
					<motion.div
					initial={{ x:-30, y: 50, opacity: 0 }}
					animate={{ x: 0, y: 0, opacity: 1 }}
					transition={{ delay: 0.5, duration: 2, type: 'spring' }}
					 className="text-white text-5xl flex items-center justify-around">
						<FontAwesomeIcon icon={faGhost} />
					</motion.div>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, duration: 1 }}
				className="relative w-full"
			>
				<div className="absolute left-1/2 transform -translate-x-1/2 top-5 flex items-center">
					<button
						disabled={!user}
						onClick={() => setCreatePage(!createPage)}
						className={`${
							!user
								? "cursor-not-allowed"
								: "hover:text-orange hover:bg-black "
						} transition bg-orange rounded-xl p-2 pl-4 pr-4`}
					>
						{!user
							? "Sign in to create a post"
							: createPage
							? "Cancel creating"
							: "Create a post"}
					</button>
				</div>
				{!createPage ? (
					<>
						{blogs && !loading ? (
							<BlogsDisplay
								refetchBlogs={refetchBlogs}
								blogs={blogs}
								loading={loading}
							/>
						) : (
							<CircularProgress
								color="warning"
								className="h-16 w-16"
							/>
						)}
					</>
				) : (
					<CreateBlog setCreatePage={setCreatePage} user={user} />
				)}
			</motion.div>
		</>
	);
};

export default Blog;
