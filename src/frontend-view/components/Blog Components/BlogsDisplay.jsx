import React, { useEffect } from 'react'
import BlogShowcase from './BlogShowcase'
import { CircularProgress } from '@mui/material'

const BlogsDisplay = ({blogs, loading, refetchBlogs}) => {
  useEffect(() => {
    refetchBlogs();
  },[])
  
  return (
    <div className='w-full bg-gray-dark pt-5 md:p-5 rounded-xl md:border-l-2 md:border-r-2 border-orange'>
        {!loading ?
          <div className=' mt-20'>
            {blogs.map(blog => (
                <BlogShowcase blog={blog}/>
            ))}
          </div>
        : 
         <CircularProgress color='warning' className='h-16 w-16'/>}
        
    </div>
  )
}

export default BlogsDisplay