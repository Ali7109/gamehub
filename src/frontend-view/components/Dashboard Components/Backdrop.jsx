import React from 'react'
import {motion} from 'framer-motion'

const Backdrop = () => {
  return (
    <motion.div
    initial={{opacity: 0, y:10}}
    animate={{opacity: 1, y:0}}
    exit={{opacity: 0, y:10}}
    transition={{duration: 1, delay: 0.5}}

    className=" h-full max-h-72 w-full rounded-xl bg-dash-backdrop bg-center bg-cover z-20">
          <div className="bg-black/60  flex flex-col md:flex-row h-full w-full">
            <div className="flex-1 flex flex-col md:justify-center space-y-10 w-2/4 md:w-2/3 p-5 md:p-10 text-white font-sans hover:antialiased">
              <h1 className='font-medium text-xl  md:text-3xl italic' >Your trusted Gaming Space</h1>
              <h3 className='font-medium'>Explore our vast collection of games, discover new favorites, and connect with fellow gamers.</h3>
            </div>
            <div className="flex-2 relative md:w-7/12">
              <img className='w-2/3 md:w-full md:max-w-xl absolute  bottom-0 right-0 ' src={require('../../images/kratos.png')} alt="Kratos Splash"/>
              
            </div>
          </div>
        </motion.div>
  )
}

export default Backdrop