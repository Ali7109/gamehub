import { faGear, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TextField } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-around items-center w-full p-3 rounded-xl  bg-gray-dark'>
        <div className="md:w-4/6 xs:w-2/6">
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
        <div className="flex items-center ">
          <div className="md:hidden w-full flex justify-center">
              <img src={require('../../images/ghlogo.png')} alt="Logo" className=' border-black h-16 w-16 rounded-full'/>
          </div>
          <div className='p-2 w-full flex-col justify-around items-center'>
              <FontAwesomeIcon className='p-2 rounded-xl text-lg text-black bg-orange  transition hover:scale-110 hover:text-white' icon={faUser} />
              <FontAwesomeIcon className=' p-2 ml-3 rounded-xl text-lg text-gray-light transition hover:text-black hover:bg-orange' icon={faGear} />
          </div>
        </div>
        
    </div>
  )
}

export default Header