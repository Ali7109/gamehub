import React from 'react'
import { motion } from 'framer-motion'

const SearchCard = ({title}) => {
    const searchCardStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.3)),
        url(${title.background_image})`
    }
  return (
    <motion.div
    initial={{opacity: 0, y:10}}
    whileInView={{opacity: 1, x:0}}
    className='h-48 bg-white rounded-xl p-8 bg-cover bg-center transition hover:scale-95 card cursor-pointer overflow-auto' style={searchCardStyle}>
        <h1 className='font-bold font-yb text-white text-2xl'>{title.name}</h1>
    </motion.div>
  )
}

export default SearchCard