import React, { useState } from 'react';

const GenreButton = ({ genre, isSelected, onToggleSelection }) => {
  const [hovered, setHovered] = useState(false);

  // Function to toggle hover state
  const handleHover = () => {
    setHovered(!hovered);
  };

  // Calculate background image with opacity
  const backgroundImage = `url(${genre.image_background})`;
  const opacity = (hovered || isSelected) ? 0.5 : 1;
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, ${opacity}), rgba(0, 0, 0, ${opacity})), ${backgroundImage}`,
  };

  return (
    <button
      className='genre-button'
      style={backgroundStyle}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onClick={onToggleSelection} // Call the onToggleSelection callback
    >
      {genre.name}
    </button>
  );
};

export default GenreButton;
