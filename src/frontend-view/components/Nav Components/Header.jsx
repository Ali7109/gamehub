import { faGear, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress, TextField } from '@mui/material'
import React, { useState } from 'react'
import Lottie from "lottie-react";
import animationData from "../../assets/animation_ljyucfqa.json";
import HeaderMenu from './HeaderMenu';

import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../StateManagement/actions';
import { auth, provider } from '../../../Firebase/Firebase';

const Header = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState({});
  const dispatch = useDispatch();

  auth.onAuthStateChanged(function(user) {
    if (user) {
      setSignedIn(true);
      dispatch(setUser(user))
    }
  });

  const handleLogin = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(setUser(user));
        setSignedIn(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     setSignedIn(true);
  // }, 4000);

  const handleLogout = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
        setSignedIn(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  // const handleLogout = () => {
  //   setLoading(true);
  //   setSignedIn(false);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }

  return (
    <div className='flex justify-around items-center w-full p-3 rounded-xl  bg-gray-dark'>
        <div className="w-2/6">
          <TextField
              InputProps={{
                startAdornment: (
                  <FontAwesomeIcon className='text-lg mr-3 text-gray-light' icon={faMagnifyingGlass} />
                ),
              }}faMagnifyingGlass
              label="Search here!"
              variant="standard"
              color="warning"
          />
        </div>
        <div className="w-3/6 md:w-1/6 flex justify-around max-h-fit">
						<div className="w-16 md:w-20">
							<Lottie animationData={animationData} />
						</div>
					</div>
        <div className="flex items-center  w-2/6">
        
          {/* <div className="md:hidden w-full flex justify-center">
              <img src={require('../../images/ghlogo.png')} alt="Logo" className=' border-black h-16 w-16 rounded-full'/>
          </div> */}
          <div className='flex flex-col md:flex-row justify-around md:justify-end items-center p-2 w-full '>
              {signedIn ? 
              <HeaderMenu onLogout={handleLogout}/>
            : (loading ? 
                <CircularProgress color='warning' className='mr-3' size={25}/>
            :
            <button onClick={handleLogin} className='p-2 rounded-xl text-base text-black mb-1 cursor-pointer bg-orange  transition hover:scale-110 hover:text-white'>Sign In</button>)
            }
              <FontAwesomeIcon className=' p-2 ml-3 rounded-xl text-lg text-gray-light transition hover:text-black hover:bg-orange' icon={faGear} />
          </div>
        </div>
        
    </div>
  )
}

export default Header