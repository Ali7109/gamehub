import React, { useState } from 'react'
import { useEffect } from 'react'
import GameDataAPIController from '../../controller/GameDataAPIController'
import GenreList from '../components/SearchPage Components/GenreList';

const Search = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
			try {
            const genres = await GameDataAPIController("genres")
			setGenres(genres);
			} catch (error) {
				console.error(error);
			}
		};
        fetchGenres().then(console.log(genres));
    }, [])
    
  return (
    <div className='rounded-xl w-full h-56 bg-gray-dark p-10 custom-scroll'>
        {genres.results && 
        <GenreList genres={genres.results}/>
        }
    </div>
  )
}

export default Search