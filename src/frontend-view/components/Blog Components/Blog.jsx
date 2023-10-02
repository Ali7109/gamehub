import React, {useState,  useEffect } from 'react'
import { fetchBlogs } from '../../../controller/HelperFetch'
import { CircularProgress } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGhost, faHeadset, faScroll } from '@fortawesome/free-solid-svg-icons'
import BlogsDisplay from './BlogsDisplay'

const Blog = () => {
  const [blogs, setBlogs] = useState([])

  useEffect( () => {
    fetchBlogs().then(setBlogs)
  }, [])
  return (
    <>
    {/* <div className='w-full bg-gray-dark rounded-xl p-5'> */}
      <div className="w-full bg-press-banner bg-center rounded-xl">
        <div className=" w-full flex items-center justify-around bg-black bg-opacity-80 rounded-xl p-3 pl-20 pr-20 text-center">
          <div className="text-white text-5xl flex items-center justify-around">
              <FontAwesomeIcon icon={faHeadset} />
            </div>
            <div className="">
              <FontAwesomeIcon icon={faScroll} className='text-white text-5xl' />
              <h1 className='text-orange font-mono text-6xl'>PixelPress</h1>
              <p className='text-white'>Your daily dose of the gaming industry</p>
            </div>
            <div className="text-white text-5xl flex items-center justify-around">
              <FontAwesomeIcon icon={faGhost} />
            </div>
        </div>
      </div>
      {blogs ? 
      <>
        <BlogsDisplay blogs={blogs}/>
      </>
      :
      <>
        <h1>Loading...</h1>
        <CircularProgress color='warning' className='h-16 w-16'/>
      </>}
    {/* </div> */}
    </>
  )
}

export default Blog