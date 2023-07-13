import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { setUser } from '../../../StateManagement/actions';
import { auth, provider } from '../../../Firebase/Firebase';
import { CircularProgress } from '@mui/material';

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
        <div className='rounded-xl w-full flex-col max-h-fit bg-gray-dark'>
            
            {user ? 
            <>
                <div className="w-full rounded-t-xl flex items-center h-52 bg-orange">
                    <div className="w-full h-44 bg-stock-coverphoto bg-center bg-cover p-5">
                        <div className="flex-1 m-5 h-24 w-24 rounded-full">
                            {user.photoUrl ?
                            <img className='rounded-full' src={require(user.photoUrl)} alt='Profile account DP'/>
                            :
                            <img className='rounded-full' src={require('../../images/StockImages/stockProfPic.jpg')} alt='error loading DP'/>
                            }
                            </div>
                    </div>
                </div>
                <div className="flex-col p-10 space-y-3 text-white"> 
                    <div className="w-full flex justify-between">
                        <h1 className='text-3xl'>{user.displayName}</h1>
                        <h2>{user.email}</h2>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est vitae, labore inventore unde voluptatem corporis?</p>
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
                        <h1 className='text-2xl bg-black p-2 rounded-xl'>It appears you aren't signed in, let's change that &#10145;</h1>
                        {loading ? 
                        <CircularProgress color='warning' className='mr-3' size={25}/>
                        : 
                        <button onClick={handleLogin} className='p-2 rounded-xl text-base text-black mb-1 cursor-pointer bg-orange  transition hover:scale-110 hover:text-white'>Sign In Now</button>                            
                        }
                    </div>
                </div>
            </>
            }  
        </div>
  )
}

export default ProfilePage