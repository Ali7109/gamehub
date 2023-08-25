import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const DevDetailCard = ({devDetails}) => {

    const nav = useNavigate();
  return (
    <div className="bg-black border-l-2 border-r-2 border-orange w-full rounded-xl p-10 text-black">
        <button onClick={() => {
            nav(-1) 
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
        }} className="p-2 text-center bg-orange rounded-xl font-bold transition hover:scale-105 hover:text-white"><FontAwesomeIcon icon={faBackward}/> Back</button>
        
        <h2 className='text-center p-2 pl-4 pr-4 rounded-xl bg-gray-dark max-w-fit m-auto text-2xl font-bold text-orange'>Game Developers</h2>
        
        <div className="w-full bg-gray-dark rounded-xl mt-10 flex justify-center items-center">
            <img src={devDetails.image_background} alt={`${devDetails.name} icon`} className='h-56 w-full object-cover object-top'/>
        </div>
        <div className="w-full mt-5 mb-10 text-center">
            <h1 className='text-4xl text-white font-yb'>{devDetails.name}</h1>
        </div>
        <div className="flex text-white w-full text-justify pl-0 pr-0 md:pl-10 md:pr-10 h-56 overflow-auto">
            {devDetails.description ? 
            
            <p dangerouslySetInnerHTML={{ __html: devDetails.description }} />
            :
            <div className="m-auto text-center bg-white bg-opacity-10 p-5 rounded-xl ">
                <h1 className='text-orange font-bold text-4xl mb-2'>Sorry! It's not you, it's us</h1>
                <p className=''>Looks like we do not have more info for the developer "{devDetails.name}" at this time.<br></br>Check here again soon...</p> 
                <p className='mt-3 flex items-center justify-center'>You can learn more about the developer 
                <a
                onClick={(event) => {
                    if(!window.confirm("You will be redirected. Continue?")){
                        event.preventDefault();
                    }
                }}
                target="_blank" rel='noreferrer' href={`https://en.wikipedia.org/wiki/${devDetails.slug.replace("-", "_")}`} t className='bg-white hover:bg-orange transition rounded-xl ml-3 pl-2 pr-2 text-black font-semibold'>HERE</a></p>
            </div>
            }
        </div>
    </div>
  )
}

export default DevDetailCard