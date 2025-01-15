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
import { Link } from "react-router-dom";
import CreateBlog from "./CreateBlog";
import { useSelector } from "react-redux";

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
			<div className="w-full bg-press-banner bg-center rounded-xl">
				<div className=" w-full flex items-center justify-around bg-black bg-opacity-80 rounded-xl p-3 md:pl-20 md:pr-20 text-center">
					<div className="text-white text-5xl flex items-center justify-around">
						<FontAwesomeIcon icon={faHeadset} />
					</div>
					<div className="">
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
					</div>
					<div className="text-white text-5xl flex items-center justify-around">
						<FontAwesomeIcon icon={faGhost} />
					</div>
				</div>
			</div>

			<div className="relative w-full">
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
			</div>
		</>
	);
};

export default Blog;
