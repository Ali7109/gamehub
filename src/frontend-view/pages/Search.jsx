import React, { useState } from "react";
import { useEffect } from "react";
import GameDataAPIController from "../../controller/GameDataAPIController";
import GenreList from "../components/SearchPage Components/GenreList";
import { CircularProgress, TextField } from "@mui/material";
import SearchCard from "../components/SearchPage Components/SearchCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {motion} from "framer-motion";

const Search = () => {
	const [loading, setloading] = useState(false);

	const [genres, setGenres] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState([]);
	const [shownTitles, setShownTitles] = useState({ results: [] });
	const [search, setSearch] = useState("");

	//Updates the selections as they are selected
	const updatedSelections = (selected) => {
		setSelectedGenres(selected);
	};

	//Helper method to create the paramter part of the URL request
	const createParameters = (selected) => {
		let paramArr = "";
		// console.log(selected)
		let len = selected.length;
		selected.map((selection, index) => {
			paramArr += "" + selection.slug;
			if (index + 1 !== len) paramArr += ",";
			return true;
		});
		return paramArr;
	};

	const handleSearchFilter = () => {
		setloading(true);
		let parameters = createParameters(selectedGenres);
		console.log(search);
		if (search.length !== 0) parameters += "&search=" + search;
		fetchFilteredSelection(parameters);
		setloading(false);
		setSearch("");
		window.scrollTo({
			top: 200,
			behavior: "smooth",
		});
	};

	const fetchFilteredSelection = async (genres) => {
		try {
			let selections = "";
			if (genres.substring(0, 1) === "&") {
				selections = await GameDataAPIController(
					"games",
					`&page=1&page_size=20${genres}`
				);
			} else {
				selections = await GameDataAPIController(
					"games",
					`&page=1&page_size=20&genres=${genres}`
				);
			}
			setShownTitles(selections);
			console.log(shownTitles);
		} catch (error) {
			console.error(error);
		}
	};

	//UseEffect to fetch data on first render
	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const genres = await GameDataAPIController("genres");
				setGenres(genres);
			} catch (error) {
				console.error(error);
			}
		};
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		fetchGenres();
	}, []);

	return (
		<motion.div 
		initial={{opacity: 0, y:20}}
		animate={{opacity: 1, y:0}}
		exit={{opacity: 0, y:20}}
		transition={{duration: 0.5}}
		className="rounded-xl w-full bg-gray-dark p-10 custom-scroll">
			<div className="w-full">
				<TextField
					InputProps={{
						startAdornment: (
							<FontAwesomeIcon
								className="text-lg mr-3 text-gray-light"
								icon={faMagnifyingGlass}
							/>
						),
					}}
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
					}}
					label="Search here!"
					variant="standard"
					color="warning"
					className="w-full mb-3"
				/>
			</div>
			{genres.results ? (
				<GenreList
					handleSearch={handleSearchFilter}
					genres={genres.results}
					updateSelections={updatedSelections}
				/>
			) : (
				<div className="w-full flex">
					<CircularProgress
						color="warning"
						className="m-auto mt-4 h-20"
					/>
				</div>
			)}

			{!loading ? (
				shownTitles.results.length !== 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-3 h-96 overflow-scroll custom-scroll rounded-xl m-2 mt-10">
						{shownTitles.results.map((title) => (
							<Link to={`/search/${title.id}`} key={title.id}>
								<SearchCard title={title} />
							</Link>
						))}
					</div>
				) : (
					<div className="h-56 flex">
						<h1 className="m-auto bg-gray text-white font-bold p-3 rounded-xl">
							Search will show here
						</h1>
					</div>
				)
			) : (
				<div className="h-56 flex transition">
					<CircularProgress color="warning" className="m-auto h-20" />
				</div>
			)}
		</motion.div>
	);
};

export default Search;
