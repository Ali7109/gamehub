import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavIcon = ({ icon, path, index, setPage }) => {
	const currentPage = useLocation().pathname === path;
	return (
		<IconButton
			onClick={() => setPage(index)}
			className={`transition w-16 h-16 flex ${
				currentPage ? "scale-110" : ""
			}`}
			as={Link}
			to={path}
		>
			<FontAwesomeIcon
				className={
					`m-auto p-2 rounded-xl text-gray-light transition hover:bg-orange ` +
					(currentPage ? " bg-orange text-white " : "") +
					(path === "/about" ? " text-2xl" : " text-xl")
				}
				icon={icon}
			/>
		</IconButton>
	);
};

export default NavIcon;
