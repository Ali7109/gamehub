import { faGear, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TextField } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
    <div className='flex space-x-3 w-full p-3 rounded-xl  bg-gray-dark'>
           <div className="flex-1">
           <TextField
            InputProps={{
              startAdornment: (
                <FontAwesomeIcon className='text-lg mr-3 text-gray-light' icon={faMagnifyingGlass} />
              ),
            }}faMagnifyingGlass
            label="Search everything!"
            variant="standard"
            color="warning"
          /></div>
        <div className='p-2 space-x-3'>
            <FontAwesomeIcon className='p-2 rounded-xl text-lg text-black bg-orange  transition hover:scale-110 hover:text-white' icon={faUser} />
            <FontAwesomeIcon className=' p-2 rounded-xl text-lg text-gray-light transition hover:text-black hover:bg-orange' icon={faGear} />
        </div>
    </div>
  )
}

export default Header