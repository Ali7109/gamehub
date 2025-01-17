import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NavIcon = ({ icon, path, index, page, setPage }) => {
	return (
		<IconButton
			onClick={() => setPage(index)}
			className={`transition w-16 h-16 flex ${
				index === page ? "scale-110" : ""
			}`}
			as={Link}
			to={path}
		>
			<FontAwesomeIcon
				className={
					`m-auto p-2 rounded-xl text-gray-light transition hover:text-black hover:bg-orange ` +
					(index === page ? " bg-orange text-black " : "") +
					(path === "/about" ? " text-2xl" : " text-xl")
				}
				icon={icon}
			/>
		</IconButton>
	);
};

export default NavIcon;
