import React, { useEffect } from "react";
import BlogShowcase from "./BlogShowcase";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

const BlogsDisplay = ({ blogs, loading, refetchBlogs }) => {
	useEffect(() => {
		refetchBlogs();
	}, []);

	return (
		<div className="w-full bg-gray-dark p-5 rounded-xl border-l-2 border-r-2 border-orange">
			{!loading ? (
				<div className=" mt-20">
					{blogs.map((blog, idx) => (
						<BlogShowcase blog={blog} key={idx} idx={idx} />
					))}
				</div>
			) : (
				<CircularProgress color="warning" className="h-16 w-16" />
			)}
		</div>
	);
};

export default BlogsDisplay;
