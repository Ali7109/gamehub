import React, { useEffect, useState } from 'react';
import GameDataAPIController from '../../controller/GameDataAPIController';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import GameDetailCard from '../components/GameDetail Components/GameDetailCard';

const GameDetailsPage = () => {

    const {id} = useParams();

    const [gameDetails, setGameDetails] = useState(null);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGameData = async () => {
        setLoading(true);
        const game = await GameDataAPIController(`games/${id}`, "").then(setLoading(false));
        setGameDetails(game);
        console.log(game)
    }
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    fetchGameData();

  }, []);

  // Render the game details content here
  return  (
    <div className='flex w-full rounded-xl m-5 p-5 bg-gray-dark'>
        {!loading && gameDetails ? 
           <GameDetailCard gameDetails={gameDetails}/>
        :
            <div className="m-auto">
                <CircularProgress color='warning' className='h-16' />    
            </div>
        }
    </div>
    )
};

export default GameDetailsPage;
