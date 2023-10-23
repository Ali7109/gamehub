import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const BurgerMenu = ({setCollapsed}) => {
    const menu = [{path: '/', label: 'Home' },{path: '/search', label: 'Search' },{path: '/blog', label: 'Blog' }];
  return (
    <motion.div 
    initial={{y:-300, opacity: 0}}
    animate={{y:0, opacity: 1}}
    m
    exit={{y: -300, opacity: 0}}
    transition={{ease: "easeInOut", duration: 0.5}}
    className="md:hidden  z-10 absolute top-0 h-64 w-full bg-gray-dark border-b-2 border-orange rounded-b-xl">
        <button onClick={() => setCollapsed(true)} className='flex absolute h-8 w-8 rounded-full bottom-5 right-5 text-white transition hover:text-orange hover:bg-slate-600 '>
            <FontAwesomeIcon className='m-auto h-6 w-6' icon={faChevronUp}/>
        </button>
        <ul className='m-5 mt-10 h-full flex-col justify-around text-white' >
            {menu.map((item, index) => (
                <Link to={item.path} onClick={() => setCollapsed(true)} key={index}><li className='transition hover:border-orange hover:text-orange border-b-2 mb-5 pb-2 border-white'>{item.label}</li></Link>
            ))}
        </ul>
    </motion.div>
  )
}

export default BurgerMenu