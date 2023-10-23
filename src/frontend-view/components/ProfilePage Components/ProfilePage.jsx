import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { signInWithPopup } from 'firebase/auth';
import { setUser } from '../../../StateManagement/actions';
import { auth,provider } from '../../../Firebase/Firebase';
import { CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const ProfilePage = () => {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
   
    const handleLogin = () => {
        setLoading(true);
        signInWithPopup(auth, provider)
          .then((result) => {
            const user = result.user;
            dispatch(setUser(user));
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      };
  return (
        <motion.div 
        initial={{ opacity: 0}}
        whileInView={{ opacity: 1}}
        transition={{duration: 1}}
        className='rounded-xl w-full flex-col bg-gray-dark'>
            
            {user ? 
            
            <>
                <div className="w-full rounded-t-xl flex items-center h-52 bg-orange">
                    <div className="w-full h-44 bg-stock-coverphoto bg-center bg-cover p-5">
                        <div className="flex-1 m-5 h-24 w-24 rounded-full">
                        <img
                            className='rounded-full object-cover'
                            src={ require('../../images/StockImages/stockProfPic.jpg')}
                            alt='Profile account DP'
                            />
                           
                            </div>
                    </div>
                </div>
                <div className="flex-col p-10 space-y-3 text-white"> 
                    <div className="w-full flex justify-between">
                        <h1 className='text-3xl'>{user.displayName}</h1>
                        <h2>{user.email}</h2>
                    </div>
                    <p className='text-center italic font-bold'>Feature under development</p>
                </div>
            </>
            :
            <>
                <div className="w-full rounded-t-xl flex items-center h-52 bg-orange bg-opacity-50">
                    <div className="w-full h-44 bg-black bg-center bg-cover p-5">
                        <div className="flex-1 m-5 h-24 w-24 rounded-full">
                            <img className='rounded-full' src={require('../../images/StockImages/stockProfPic.jpg')} alt='error loading DP'/>
                        </div>
                    </div>
                </div>
                <div className="flex-col p-10 space-y-3 text-white"> 
                    <div className="w-full flex justify-around">
                        <h1 className='text-xl bg-black p-2 rounded-xl'>It appears you aren't signed in, let's change that &#10145;</h1>
                        {loading ? 
                        <CircularProgress color='warning' className='mr-3' size={25}/>
                        : 
                        <button onClick={handleLogin} className='p-2 rounded-xl text-base text-black mb-1 cursor-pointer bg-orange  transition hover:scale-110 hover:text-white'>Sign In Now</button>                            
                        }
                    </div>
                </div>
            </>
            }  
        </motion.div>
  )
}

export default ProfilePage