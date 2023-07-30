import React, { useState, useEffect } from 'react'
import GenreButton from './GenreButton'

const GenreList = ({genres, updateSelections, handleSearch}) => {
  
  const [selectedGenres, setSelectedGenres] = useState([]);
 // Function to toggle the selected state of a genre
 const toggleGenreSelection = (genre) => {
  setSelectedGenres((prevSelectedGenres) =>
    prevSelectedGenres.includes(genre)
      ? prevSelectedGenres.filter((g) => g !== genre)
      : [...prevSelectedGenres, genre]
  );
};

useEffect(() => {
  updateSelections(selectedGenres);
}, [selectedGenres])

// Function to clear all selections
const handleClearSelection = () => {
  setSelectedGenres([]);
};


  return (
    <div className='w-full flex-col mt-5 pb-5'>
      <div className='w-full xs:p-1 md:p-3 rounded-xl mb-5 flex gap-5 overflow-auto '>
          {genres.map((genre, index) => (
              <GenreButton
              key={index}
              genre={genre}
              isSelected={selectedGenres.includes(genre)}
              onToggleSelection={() => toggleGenreSelection(genre)}
            />
          ))}
      </div>
      <div className="w-full p-4 pt-1 pb-1 justify-around flex">
      <button onClick={handleSearch} className=' font-bold w-2/3 md:w-8/12 bg-orange text-black mt-2 p-3 pt-1 pb-1 rounded-xl transition hover:scale-x-105 hover:text-white'>Search</button>
        <button onClick={handleClearSelection} className=' w-1/3 md:max-w-fit bg-white mt-2 p-3 pt-1 pb-1 rounded-xl transition hover:scale-x-105 hover:bg-red-800 hover:text-white'>Clear Selection</button>
      </div>
  </div>
  )
}

export default GenreList