import React, { useEffect } from 'react'
import BlogShowcase from './BlogShowcase'

const BlogsDisplay = ({blogs}) => {

  
  return (
    <div className='w-full bg-gray-dark p-5 rounded-xl border-l-2 border-r-2 border-orange'>
        
        <div className=' mt-20'>
        {blogs.map(blog => (
            <BlogShowcase blog={blog}/>
        ))}
        </div>
    </div>
  )
}

export default BlogsDisplay