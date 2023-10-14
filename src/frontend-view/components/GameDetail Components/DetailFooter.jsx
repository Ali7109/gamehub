import React, 
{useEffect, useState} from 'react'

const DetailFooter = ({game}) => {
  const metacriticImage = require('../../images/Metacritic.png');
  const redditImage = require('../../images/reddit.png');
  
  const [showReddit, setShowReddit] = useState(false);

  useEffect(() => {
    setShowReddit(window.location.pathname !== "/");
  }, [])
  
  return (
    <div className="md:flex w-full items-center justify-between">
      <div className="flex md:mr-10 gap-2 ">
        <h4 className="transition m-auto min-w-fit bg-white bg-opacity-20 text-white hover:text-black bg-metayellow font-bold rounded-xl p-2 cursor-pointer">
            <a className='flex items-center ' href={`https://www.metacritic.com/game/pc/${game.slug}`} target='_blank' rel="noopener noreferrer">
              <img src={metacriticImage} alt="metacritic-icon" className="mr-2 h-6" />
              {game.metacritic}
            </a>
        </h4>
        {showReddit &&
            <a className="cursor-pointer reddit m-auto bg-white bg-opacity-20 bg-red font-bold  rounded-xl p-2 transition" href={game.reddit_url} target='_blank' rel="noopener noreferrer">
              <img src={redditImage} alt="reddit-icon" className="m-auto h-6 w-6" />
            </a>
        }
      </div>
      <h4 className=" text-center md:max-w-fit bg-black bg-opacity-20 text-white font-bold rounded-xl p-2">
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