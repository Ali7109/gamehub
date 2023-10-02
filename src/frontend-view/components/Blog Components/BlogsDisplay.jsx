import React from 'react'
import BlogShowcase from './BlogShowcase'
import { Link } from 'react-router-dom'

const BlogsDisplay = ({blogs}) => {
  return (
    <div className='w-full relative bg-gray-dark p-5 rounded-xl border-l-2 border-r-2 border-orange'>
        <div className="absolute end-20">
            <Link to={'/blog/create'}>
            <button className='hover:text-orange hover:bg-black transition bg-orange rounded-xl p-2 pl-4 pr-4'>Create a post</button>
            </Link>
        </div>
        <div className=' mt-20'>
        {blogs.map(blog => (
            <BlogShowcase blog={blog}/>
        ))}
        </div>
    </div>
  )
}

export default BlogsDisplay