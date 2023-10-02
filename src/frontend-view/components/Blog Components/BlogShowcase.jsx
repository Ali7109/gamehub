import React from 'react'
import formatFirestoreTimestamp, { blogTimeStamp } from '../Functions/calculationFunctions'

const BlogShowcase = ({blog}) => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-black border border-white p-5 pl-60 pr-60 text-white">
        <div className="">
            <div className="flex items-baseline">
                <h1 className='text-3xl mr-5'>{blog.title}</h1>
            </div>
            <div className=" items-center ">
                <h2>Written on: {blogTimeStamp(blog.timestamp)}</h2>
                <h2 >Written by: {blog.name}</h2>
            </div>
        </div>
        <div className="">
            <button className=' border-b-2 border-orange border-t-2 hover:text-black hover:bg-orange transition text-white rounded-lg p-4'>View Post</button>
        </div>
    </div>
  )
}

export default BlogShowcase