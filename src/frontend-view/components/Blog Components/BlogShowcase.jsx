import React from 'react'
import  { blogTimeStamp } from '../Functions/calculationFunctions'
import { faBookOpen, faClock, faFeather } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const BlogShowcase = ({blog}) => {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
  return (
    <div className="bg-gradient-to-b md:bg-gradient-to-r from-orange to-black border-orange relative flex-column md:flex min-h-28 mb-10 mr-8 ml-8 items-center justify-between rounded-xl p-5  text-white">
        <div className="mb-4">
            <div className="border-l-4 border-black pl-2 flex items-baseline overflow-hidden">
                <h1 className='text-2xl w-80 mr-5'>{capitalizeFirstLetter(blog.title + "")}</h1>
            </div>
        </div>
        <div className="md:absolute mb-1 w-56 right-2 top-2 bg-black rounded-xl text-black">
            <div className="w-full overflow-clip font-yb bg-white rounded-xl border-l-2 border-b-2 border-orange pl-2 pr-2">
                <h2> <FontAwesomeIcon icon={faFeather} /> {blog.name}</h2>
            </div>
        </div>
        <div className="md:absolute mb-1 w-56 right-2 bg-black rounded-xl text-black">
            <div className="font-yb bg-white rounded-xl border-l-2 border-b-2 border-orange pl-2 pr-2">
                <h2><FontAwesomeIcon icon={faClock} /> {blogTimeStamp(blog.timestamp)}</h2>
            </div>
        </div>

        <div className="md:absolute w-56 right-2 bottom-2">
            <Link to={`/blog/view/${blog.id}`}>
                <button className='bg-black w-full border-b-2 border-orange border-t-2 hover:text-black hover:bg-orange transition text-white rounded-lg'><FontAwesomeIcon icon={faBookOpen} /> View</button>
            </Link>
        </div>
    </div>
  )
}

export default BlogShowcase