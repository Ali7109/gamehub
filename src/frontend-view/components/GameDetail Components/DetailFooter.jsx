import React from 'react'

const DetailFooter = ({game}) => {
  const image = require('../../images/Metacritic.png');
  
  return (
    <div className="xs:flex-col md:flex w-full justify-between">
    <h4 className="mr-2 bg-white bg-opacity-20 text-white font-bold rounded-xl p-2">
        <a className='flex items-center max-w-fit hover:text-orange transition' href={`https://www.metacritic.com/game/pc/${game.slug}`} target='_blank' rel="noopener noreferrer">
          <img src={image} alt="metacritic-icon" className="mr-2 h-6 w-6" />
          {game.metacritic}
        </a>
    </h4>
    <h4 className="mr-2 bg-black bg-opacity-20 text-white font-bold rounded-xl p-2">
          {game.genres.map((genre, index) => {
            let hyphen = " - ";
            if(index+1 === game.genres.length) hyphen = "";
            return (
            <React.Fragment key={index}>{genre.name}{hyphen}</React.Fragment>
            )
})}
    </h4>
  </div>
  )
}

export default DetailFooter