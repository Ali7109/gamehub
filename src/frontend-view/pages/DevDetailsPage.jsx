import React, { useEffect, useState } from 'react';
import GameDataAPIController from '../../controller/GameDataAPIController';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import DevDetailCard from '../components/DevDetail Components/DevDetailCard';

const DevDetailsPage = () => {

    const {id} = useParams();

    const [devDetails, setDevDetails] = useState(null);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDevData = async () => {
        setLoading(true);
        const dev = await GameDataAPIController(`developers/${id}`, "").then(setLoading(false));
        setDevDetails(dev);
        console.log(dev)
    }
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      fetchDevData();
  }, []);

  return (
    <div className='flex w-full rounded-xl m-0 p-2 md:p-5 bg-gray-dark'>
        {!loading && devDetails ? 
        <DevDetailCard devDetails={devDetails}/>
        :
            <div className="m-auto">
                <CircularProgress color='warning' className='h-16' />    
            </div>
        }
    </div>
  )
}

export default DevDetailsPage