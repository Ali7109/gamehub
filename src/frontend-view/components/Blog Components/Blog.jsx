import React, {useState,  useEffect } from 'react'
import { fetchBlogs } from '../../../controller/HelperFetch'
import { CircularProgress } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGhost, faHeadset, faScroll } from '@fortawesome/free-solid-svg-icons'
import BlogsDisplay from './BlogsDisplay'
import { Link } from 'react-router-dom'
import CreateBlog from './CreateBlog'
import { useSelector } from 'react-redux'

const Blog = () => {

  const user = useSelector(state => state.user);

  const [blogs, setBlogs] = useState([])
  const [createPage, setCreatePage] = useState(false);

  useEffect( () => {
    refetchBlogs();
  }, [])

  const refetchBlogs = () => {
    fetchBlogs().then(setBlogs)
  }
  return (
    <>
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
      
      <div className="relative w-full">

        <div className="absolute end-20 top-7">
            <button
              disabled={!user}
              onClick={() => setCreatePage(!createPage)}
              className={`${
                !user ? 'cursor-not-allowed ' : 'hover:text-orange hover:bg-black '
              }transition w-56 bg-orange rounded-xl p-2 pl-4 pr-4`}
            >
              {!user ? "Sign in to create a post" : createPage ? "Cancel creating" : "Create a post"}
            </button>
          </div>
          {!createPage ? 
          <>
          {blogs ? 
            <BlogsDisplay blogs={blogs}/> : <CircularProgress color='warning' className='h-16 w-16'/>}
          </>
          : <CreateBlog setCreatePage={setCreatePage} user={user}/> }
      </div>
    </>
  )
}

export default Blog