import { faGear, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TextField } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between items-center space-x-3 w-full p-3 rounded-xl  bg-gray-dark'>
        <div className="w-1/3">
          <TextField
              InputProps={{
                startAdornment: (
                  <FontAwesomeIcon className='text-lg mr-3 text-gray-light' icon={faMagnifyingGlass} />
                ),
              }}faMagnifyingGlass
              label="Search everything!"
              variant="standard"
              color="warning"
          />
        </div>
        <div className="md:hidden w-1/3">
        <div className="bg-gh-logo bg-cover bg-center h-16 w-16 border-4 border-black rounded-full ">
        </div> </div>
        <div className='p-2 space-x-3'>
            <FontAwesomeIcon className='p-2 rounded-xl text-lg text-black bg-orange  transition hover:scale-110 hover:text-white' icon={faUser} />
            <FontAwesomeIcon className=' p-2 rounded-xl text-lg text-gray-light transition hover:text-black hover:bg-orange' icon={faGear} />
        </div>
    </div>
  )
}

export default Header