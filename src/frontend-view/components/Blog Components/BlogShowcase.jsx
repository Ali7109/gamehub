import React from 'react'
import  { blogTimeStamp } from '../Functions/calculationFunctions'

const BlogShowcase = ({blog}) => {
  return (
    <div className="relative flex mb-10 mr-8 ml-8 items-center justify-between rounded-xl bg-black p-5  text-white">
        <div className="">
            <div className="flex items-baseline">
                <h1 className='text-2xl mr-5'>{blog.title}</h1>
            </div>
            
        </div>
        <div className="absolute -bottom-7 -left-2 bg-black rounded-xl text-black">
            <div className="bg-white bg-opacity-50 rounded-xl border-l-2 border-b-2 border-orange pl-2 pr-2">
                <h2>created on {blogTimeStamp(blog.timestamp)}</h2>
                <h2 >author: {blog.name}</h2>
            </div>
        </div>
        <div className="">
            <button className=' border-b-2 border-orange border-t-2 hover:text-black hover:bg-orange transition text-white rounded-lg p-4'>View Post</button>
        </div>
    </div>
  )
}

export default BlogShowcase