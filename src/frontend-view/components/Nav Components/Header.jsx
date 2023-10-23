import { faBurger, faCircle, faGear, faLightbulb, faMagnifyingGlass, faMoon, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Lottie from "lottie-react";
import animationData from "../../assets/animation_ljyucfqa.json";
import HeaderMenu from './HeaderMenu';
import { motion, AnimatePresence } from 'framer-motion';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser, setUserProfile } from '../../../StateManagement/actions';
import { auth, db, provider } from '../../../Firebase/Firebase';
import { addUser, getUserById, userExists } from '../../../controller/HelperFetch';
import { DarkModeContext } from '../../../Context/DarkModeContext';
import BurgerMenu from './BurgerMenu';

const Header = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();

  const unsub = auth.onAuthStateChanged(function(user) {
    if (user) {
      setSignedIn(true);
      let name = user.displayName.split(" ");
      let len = name.length;
      let fullName = len === 1 ? name[0] : name[0] + " " + name[len-1];

      setUserName(fullName)
      dispatch(setUser(user))
    }
  });

  useEffect(() => {
    unsub();
  }, [])
  // const {darkMode, toggleDarkMode} = useContext(DarkModeContext);
  
  const handleLogin = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(setUser(user));
        setSignedIn(true);
        setLoading(false);

        // userExists(db, user.uid).then(data => {
        //   if(!data){
        //     addUser(db, user).then(
        //       getUserById(db, user.uid).then(data => {
        //         dispatch(setUserProfile(data))
        //       })
        //     );
        //   }
        // })
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // const handleToggleDarkMode = () => {
  //   console.log("Toggle Dark Mode button clicked"); // Add this line for debugging
  //   toggleDarkMode();
  // };

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

  const [collapsed, setCollapsed] = useState(true);
  const handleCollapse = () => {
    setCollapsed(!collapsed)
  }
  
  return (
    <AnimatePresence>
    <motion.div 
      initial={{y:-300, opacity: 0}}
      animate={{y:0, opacity: 1}}
      transition={{ease: "easeInOut", duration: 2}}
      className={` mt-10 md:mt-0 flex justify-around md:justify-between items-center w-full p-3 rounded-xl bg-gray-dark`}>
      
      <div className="md:hidden">
        {signedIn ? 
              <HeaderMenu onLogout={handleLogout}/>
            : (loading ? 
                <CircularProgress color='warning' className='mr-3' size={25}/>
            :
            <button onClick={handleLogin} className='p-2 rounded-xl text-base text-black mb-1 cursor-pointer bg-orange  transition hover:scale-110 hover:text-white'>Sign In</button>)
            }
      </div>
        <div className=" md:w-1/6 flex justify-around max-h-fit">
              <div className="w-16 md:w-20 mt-3">
                <Lottie animationData={animationData} />
              </div>
          </div>
          <div className="hidden md:block text-5xl">
            <h1 className="font-prism text-white">pixel<span className='or'>verse</span></h1>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bg-black pl-9 pr-9 md:hidden text-4xl rounded-xl">
            <h1 className="font-prism text-white">pixel<span className='or'>verse</span></h1>
          </div>
          {
              !signedIn
              &&
              <div className="md:hidden">
                <button onClick={handleCollapse}>
                  <FontAwesomeIcon className=' p-2 ml-3 rounded-xl text-lg text-gray-light transition hover:text-black hover:bg-orange' icon={faBurger} />
                </button>
              </div>
            }
        

          <div className="hidden md:flex items-center  w-1/6">
            <div className=' md:flex flex-col md:flex-row justify-around justify-center items-center p-2 w-full '>
                {signedIn ? 
                <HeaderMenu userName={userName} onLogout={handleLogout}/>
              : (loading ? 
                  <CircularProgress color='warning' className='mr-3' size={25}/>
              :
              <button onClick={handleLogin} className='p-2 rounded-xl text-base text-black mb-1 cursor-pointer bg-orange  transition hover:scale-110 hover:text-white'>Sign In</button>)
              }
              {/* <button onClick={handleToggleDarkMode} className='p-1 pl-3 pr-3 rounded-xl bg-black text-lg text-gray-light transition hover:text-yellow-400'>
                <FontAwesomeIcon icon={darkMode ? faLightbulb : faMoon } />
              </button> */}
            </div>
          </div>
          {
            !collapsed && 
            <BurgerMenu setCollapsed={setCollapsed} collapsed={collapsed}/>
          }
          
      </motion.div>
    </AnimatePresence>
  )
}

export default Header