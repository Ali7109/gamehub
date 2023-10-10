import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const BurgerMenu = ({setCollapsed}) => {
  return (
    <div className="md:hidden transition absolute top-0 h-64 w-full bg-gray-dark border-b-2 border-orange rounded-b-xl">
        <button onClick={() => setCollapsed(true)} className='flex absolute h-8 w-8 rounded-full bottom-5 right-5 text-white transition hover:text-orange hover:bg-slate-600 '>
            <FontAwesomeIcon className='m-auto h-6 w-6' icon={faChevronUp}/>
        </button>
        <ul className='m-5'>
            <Link><li>Home</li></Link>
            <Link><li>Search</li></Link>
            <Link><li>Blog</li></Link>
        </ul>
    </div>
  )
}

export default BurgerMenu