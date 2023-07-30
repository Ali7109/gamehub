import React, { useState } from 'react'

const GenreButton = ({genre}) => {
    const [hovered, setHovered] = useState(false);

    // Function to toggle hover state
    const handleHover = () => {
      setHovered(!hovered);
    };
  
    // Calculate background image with opacity
    const backgroundImage = `url(${genre.image_background})`;
    const opacity = hovered ? 0.5 : 1;
    const backgroundStyle = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, ${opacity}), rgba(0, 0, 0, ${opacity})), ${backgroundImage}`,
    };

  return (
    <button className=' bg-white bg-cover bg-center rounded-xl text-white font-bold p-5 transition'
    style={backgroundStyle}
    onMouseEnter={handleHover}
      onMouseLeave={handleHover}>{genre.name}</button>
  )
}

export default GenreButton