import React from 'react'
import { Link } from 'react-router-dom'
import PageList from './PageList';

const Footer = () => {
  
  return (
    <div className='w-full text-white text-xl font-yb bg-gray-dark rounded-t-xl h-44 p-10 flex items-center justify-evenly'>
        <div className="rounded-full h-16 w-16">
            <img src={require('../../images/ghlogo.png')} alt='Game hub logo'  className='rounded-full border border-black'/>
        </div>
        <div className="">&copy;GameHub 2023. All rights reserved.</div>
        <div className="text-base">
            <PageList />
        </div>
    </div>
  )
}

export default Footer