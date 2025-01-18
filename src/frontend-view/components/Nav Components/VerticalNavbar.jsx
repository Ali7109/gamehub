import {
	faComments,
	faFaceGrin,
	faGamepad,
	faHouse,
	faInfoCircle,
	faMagnifyingGlass,
	faPerson,
	faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import NavIcon from "./NavIcon";
import { useLocation } from "react-router-dom";

const VerticalNavbar = () => {
	const [page, setPage] = useState(0);
	const navIcons = [
		{ icon: faHouse, path: "/" },
		{ icon: faMagnifyingGlass, path: "/search" },
		{ icon: faComments, path: "/blog" },
		{ icon: faInfoCircle, path: "/about" },
		{ icon: faGamepad, path: "/profile" },
	];
	return (
		<div className="hidden md:flex items-center justify-around bg-gray-dark p-3 rounded-xl flex-col z-40">
			<div className="flex justify-around gap-4">
				{navIcons.map(({ icon, path }, index) => (
					<NavIcon
						icon={icon}
						path={path}
						key={index}
						index={index}
						page={page}
						setPage={setPage}
					/>
				))}
			</div>
		</div>
	);
};

export default VerticalNavbar;
