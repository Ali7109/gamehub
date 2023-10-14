import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const RightNavbar = () => {
  return (
    <AnimatePresence>
      <motion.div 
        initial={{x:300, opacity: 0}}
        animate={{x:0, opacity: 1}}
        transition={{ease: "easeInOut", duration: 2}}
      className='hidden md:flex items-center justify-around h-80 bg-gray-dark w-1/12 p-3 rounded-xl flex-col'>
          {/* <div className="">Hello</div> */}
      </motion.div>
    </AnimatePresence>
  )
}

export default RightNavbar