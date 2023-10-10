import React, { useEffect } from 'react'
import BlogShowcase from './BlogShowcase'
import { CircularProgress } from '@mui/material'

const BlogsDisplay = ({blogs, loading}) => {

  
  return (
    <div className='w-full bg-gray-dark p-5 rounded-xl border-l-2 border-r-2 border-orange'>
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