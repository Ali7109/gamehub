import React from 'react'


const SearchCard = ({title}) => {
    const searchCardStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.3)),
        url(${title.background_image})`
    }
  return (
    <div className='h-48 bg-white rounded-xl p-8 bg-cover bg-center transition hover:scale-95 card cursor-pointer overflow-auto' style={searchCardStyle}>
        <h1 className='font-bold font-yb text-white text-2xl'>{title.name}</h1>
    </div>
  )
}

export default SearchCard