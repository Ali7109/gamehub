import React from 'react'
import discSvg from '../../assets/SVG/discussions.svg'
import newsSvg from '../../assets/SVG/news.svg'
import storeSvg from '../../assets/SVG/store.svg'
import { motion } from 'framer-motion'

const About = () => {
  return (
      <motion.div 
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5}}
      className="mb-10 p-2 border-l-2 border-r-2 border-orange w-full bg-black rounded-xl">
        <div className='w-full text-white p-10 bg-gray-dark rounded-xl'>
          <motion.div
          initial={{x:-20, opacity:0}}
          animate={{x: 0, opacity: 1}}
          transition={{duration: 1, delay: 0.5}}
          className="bg-black border-l-2 border-r-2 border-orange max-w-fit m-auto p-1 pl-3 pr-3 rounded-xl">
              <h1 className='text-center text-3xl font-yb text-bgtrans bg-gradient-to-r font-extrabold'>About Us</h1>
          </motion.div>
          <motion.div 
           initial={{x:-20, opacity:0}}
           animate={{x: 0, opacity: 1}}
           transition={{duration: 1, delay: 0.8}}
          className="p-5 md:p-10 mt-20 mb-20 text-center sh bg-gray-light rounded-xl">
            <motion.p 
            initial={{x:-20, opacity:0}}
            animate={{x: 0, opacity: 1}}
            transition={{duration: 1, delay: 1}}
            className='text-lg '><span className='font-bold text-xl'>Welcome to <span className='text-orange'>GameHub</span>,</span><br></br>your ultimate destination for exploring and engaging with the gaming world!</motion.p>
          </motion.div>
          <motion.h1
          initial={{ x:-20, opacity:0}}
          animate={{ x:0, opacity: 1}}
          transition={{duration: 1, delay: 1.2}}
          className='text-center text-3xl mt-20 mb-10 font-yb text-bgtrans bg-gradient-to-r font-extrabold'>What we offer</motion.h1>
          <div className="xs:flex-col md:flex w-full p-10 gap-10 space-y-5 md:space-y-0 justify-evenly items-center">
            <motion.div
            initial={{x:-20, opacity: 0}}
            whileInView={{x: 0, opacity: 1}}
            transition={{duration: 1, delay: 0.5}}
            className="sh text-center p-5 w-full border-l-2 border-r-2 border-orange rounded-xl bg-black">
                <motion.h1
                initial={{x:-20, opacity: 0}}
                whileInView={{x: 0, opacity: 1}}
                transition={{duration: 2, delay: 0.8}}
                className='text-xl font-bold'>News</motion.h1>
                <div className='h-2 w-2 m-auto mt-5 bg-white rounded-full'></div>
                <motion.p 
                initial={{x:-20, opacity: 0}}
                whileInView={{x: 0, opacity: 1}}
                transition={{duration: 2, delay: 1}}
                className='mt-5'>A single stop solution for all things gaming, from <br></br><strong className='text-orange'>Announcement</strong> <br /> to <br /><strong className='text-orange'>Release</strong></motion.p>
                <motion.img
                initial={{x:-20, opacity: 0}}
                whileInView={{x: 0, opacity: 1}}
                transition={{duration: 2, delay: 1.2}}
                className='mt-5'  alt='News svg' src={newsSvg}/>
            </motion.div>


            <motion.div
               initial={{x:-20, opacity: 0}}
               whileInView={{x: 0, opacity: 1}}
               transition={{duration: 1, delay: 0.5}}
                className="sh-white text-center p-5 w-full border-l-2 border-r-2 border-orange rounded-xl bg-gray-light">
              <motion.h1
               initial={{x:-20, opacity: 0}}
               whileInView={{x: 0, opacity: 1}}
               transition={{duration: 2, delay: 0.8}}
                className='text-xl font-bold'>Discussions</motion.h1>
              <div className='h-2 w-2 m-auto mt-5 bg-white rounded-full'></div>
              <motion.p
              initial={{x:-20, opacity: 0}}
              whileInView={{x: 0, opacity: 1}}
              transition={{duration: 2, delay: 1}}
               className='mt-5'>Everything is better with <br /> <strong className='text-orange'>FRIENDS</strong>! <br /> Discuss on your favourite titles now!</motion.p>
              <motion.img
              initial={{x:-20, opacity: 0}}
              whileInView={{x: 0, opacity: 1}}
              transition={{duration: 2, delay: 1.2}}
               className='mt-5'  alt='Discussions svg' src={discSvg}/>
            </motion.div>


            <motion.div
             initial={{x:-20, opacity: 0}}
             whileInView={{x: 0, opacity: 1}}
             transition={{duration: 1, delay: 0.5}}
              className="sh text-center p-5 w-full border-l-2 border-r-2 border-orange rounded-xl bg-black">
              <motion.h1
               initial={{x:-20, opacity: 0}}
               whileInView={{x: 0, opacity: 1}}
               transition={{duration: 2, delay: 0.8}}
                className='text-xl font-bold'>Store</motion.h1>
              <div className='h-2 w-2 m-auto mt-5 bg-white rounded-full'></div>
              <motion.p
               initial={{x:-20, opacity: 0}}
               whileInView={{x: 0, opacity: 1}}
               transition={{duration: 2, delay: 1}}
                className='mt-5'>Want to find the <br/> <strong className='text-orange'>Best Gaming Deals?</strong><br /> We've got you on our Store page</motion.p>
              <motion.img
               initial={{x:-20, opacity: 0}}
               whileInView={{x: 0, opacity: 1}}
               transition={{duration: 2, delay: 1.2}}
                className='mt-5' alt='Store svg' src={storeSvg}/>
            </motion.div>
          </div>
        </div>
      </motion.div>
  )
}

export default About