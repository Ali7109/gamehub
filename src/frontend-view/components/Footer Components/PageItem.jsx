import React from 'react'
import { Link } from 'react-router-dom'

const PageItem = ({label, path}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <li onClick={scrollToTop} className='hover:text-orange hover:scale-105 hover:bg-black bg-opacity-50 pl-2 pr-2 pt-1 pb-1 rounded-xl cursor-pointer transition'><Link to={path}>{label}</Link></li>
  )
}

export default PageItem