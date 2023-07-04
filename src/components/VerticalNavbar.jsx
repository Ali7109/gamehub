import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faHouse, faMagnifyingGlass, faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { IconButton, Typography } from '@mui/material'

const VerticalNavbar = () => {
  return (
    <div className=' h-4/5 bg-gray-dark w-1/9 p-3 rounded-xl flex flex-col'>
        <div className="bg-orange h-10 w-10 rounded-full m-auto ">
            <Typography >Logo</Typography>
        </div> 
        <div className="flex flex-col h-4/5 justify-around" >
            <IconButton>
                <FontAwesomeIcon className='m-auto p-2 rounded-xl mt-10 text-lg text-gray-light transition hover:text-black hover:bg-orange' icon={faHouse} />
            </IconButton>
            <IconButton >
                <FontAwesomeIcon  className='m-auto p-2 rounded-xl mt-5 text-lg text-gray-light transition hover:text-black hover:bg-orange'  icon={faMagnifyingGlass} />
            </IconButton>
            <IconButton >
                <FontAwesomeIcon className='m-auto p-2 rounded-xl mt-5 text-lg text-gray-light transition hover:text-black hover:bg-orange' icon={faComments} />
            </IconButton>
            <IconButton >
                <FontAwesomeIcon className='m-auto p-2 rounded-xl mt-5 text-lg text-gray-light transition hover:text-black hover:bg-orange' icon={faShoppingCart} />
            </IconButton>
        </div>
    </div>
  )
}

export default VerticalNavbar