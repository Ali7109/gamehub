import React from 'react'
import GenreButton from './GenreButton'

const GenreList = ({genres}) => {
  return (
    <div className='w-full p-3 rounded-xl flex gap-5 overflow-auto '>
        {genres.map((genre, index) => (
            <GenreButton key={index} genre={genre} />
        ))}
    </div>
  )
}

export default GenreList