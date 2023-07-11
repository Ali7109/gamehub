import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from '@mui/material'
import React from 'react'

const BackToTop = () => {
  return (
    <div className="transition flex justify-center rounded-full fixed ml-4 mb-4 bottom-0 left-0 bg-white h-12 w-12">
        <IconButton className="w-full h-full" onClick={() => {
           window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}>
            <FontAwesomeIcon className='rounded-full p-2 text-3xl text-gray-light transition hover:text-black hover:bg-orange' icon={faAngleUp} />
        </IconButton>
    </div>
    
  )
}

export default BackToTop