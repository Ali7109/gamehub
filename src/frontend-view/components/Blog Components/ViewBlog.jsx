import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchBlogById } from '../../../controller/HelperFetch';
import { CircularProgress } from '@mui/material';
import { faChevronLeft, faClock, faFeather } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import formatFirestoreTimestamp, { blogTimeStamp } from '../Functions/calculationFunctions';

const ViewBlog = () => {

    //Hooks
    const {id} = useParams();
    const nav = useNavigate();

    // State management
    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState({});

    useEffect(() => {
        const getBlog = async () => {
            setLoading(true);
            fetchBlogById(id).then((data)=>{
                if(data == null){
                    nav(-1);
                    alert("Redirecting to previous page");
                }
                setBlog(data)
                setLoading(false)
            });
            
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        getBlog();
    
      }, []);
  return (
        <div className="relative bg-gray-dark w-4/5 p-4 border-l-2 border-r-2 border-orange rounded-lg shadow-lg">
            <>
                <Link to={'/blog'}>
                    <button className='bg-orange rounded-xl p-2 hover:text-orange hover:bg-black transition'><FontAwesomeIcon icon={faChevronLeft}/> back</button>
                </Link>
            </>
            {!loading && blog.timestamp? 
            <>
                <div className="w-full font-yb text-white rounded-xl min-h-80">
                    <div className="w-full text-center text-white pt-5 pb-5">
                        <h1 className='text-2xl font-bold'>{blog.title}</h1>
                    </div>
                    <div className="m-auto flex w-4/5 border-orange border-l-2 border-b-2 justify-between text-orange bg-black rounded-lg p-2 mb-5 mt-5">
                        
                        <h2><FontAwesomeIcon icon={faFeather} /> Written by: {blog.name} </h2>
                        <h2><FontAwesomeIcon icon={faClock} /> {formatFirestoreTimestamp(blog.timestamp)}</h2>
                    </div>

                    <div className="font-serif rounded-xl bg-black p-2 m-2">
                        {blog.content}
                    </div>
                    
                </div>
            </>
            :
            <React.Fragment className="flex m-auto">
                <CircularProgress color='warning' className='h-16 w-16' />
            </React.Fragment>
            }
        </div>
  )
}

export default ViewBlog