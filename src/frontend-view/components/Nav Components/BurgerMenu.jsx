import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BurgerMenu = ({ setCollapsed, collapsed, page, setPage }) => {
	const [menuOpen, setMenuOpen] = useState(false);

	const handleClose = () => {
		setMenuOpen(false);
		setTimeout(() => {
			setCollapsed(true);
		}, 200);
	};

	const handleClick = (index) => {
		setPage(index);
		handleClose();
	};

	useEffect(() => {
		setTimeout(() => {
			setMenuOpen(true);
		}, 100);
	}, [collapsed]);
	const menu = [
		{ path: "/", label: "Home" },
		{ path: "/search", label: "Search" },
		{ path: "/blog", label: "Blog" },
		{ path: "/profile", label: "Profile" },
	];
	return (
		<div
			className={
				`z-30 md:hidden transition duration-500 -translate-y-full absolute top-0 pb-8 min-h-fit w-full bg-gray-dark border-b-2 border-orange rounded-b-xl ` +
				(menuOpen ? "translate-y-0" : "")
			}
		>
			<button
				onClick={() => handleClose()}
				className="flex absolute h-8 w-8 rounded-full bottom-5 right-5 text-white transition hover:text-orange hover:bg-slate-600 "
			>
				<FontAwesomeIcon
					className="m-auto h-6 w-6"
					icon={faChevronUp}
				/>
			</button>
			<ul className="m-5 mt-10 h-full flex-col justify-around text-white">
				{menu.map((item, index) => (
					<Link
						to={item.path}
						key={index}
						onClick={() => handleClick(index)}
					>
						<li
							className={
								(index === page
									? "border-orange text-orange "
									: "border-white ") +
								` border-b-2 transition hover:border-orange hover:text-orange mb-5 pb-2`
							}
						>
							{item.label}
						</li>
					</Link>
				))}
			</ul>
		</div>
	);
};

export default BurgerMenu;
