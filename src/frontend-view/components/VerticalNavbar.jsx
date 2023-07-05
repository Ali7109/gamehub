import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faHouse, faMagnifyingGlass, faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { IconButton, Typography } from '@mui/material'

const VerticalNavbar = () => {
  return (
    <div className='hidden md:flex items-center justify-around h-4/5 bg-gray-dark w-1/9 p-3 rounded-xl flex-col'>

        <div className="bg-gh-logo bg-cover bg-center h-20 w-20 border-4 border-black rounded-full ">
        </div> 
        <div className="flex flex-col justify-around overflow-auto" >
            <IconButton className=''>
                <FontAwesomeIcon className='m-auto p-2 rounded-xl text-lg text-gray-light transition hover:text-black hover:bg-orange' icon={faHouse} />
            </IconButton>
            <IconButton >
                <FontAwesomeIcon  className='m-auto p-2 rounded-xl text-lg text-gray-light transition hover:text-black hover:bg-orange'  icon={faMagnifyingGlass} />
            </IconButton>
            <IconButton >
                <FontAwesomeIcon className='m-auto p-2 rounded-xl text-lg text-gray-light transition hover:text-black hover:bg-orange' icon={faComments} />
            </IconButton>
            <IconButton >
                <FontAwesomeIcon className='m-auto p-2 rounded-xl text-lg text-gray-light transition hover:text-black hover:bg-orange' icon={faShoppingCart} />
            </IconButton>
        </div>
    </div>
  )
}

export default VerticalNavbar