import React from 'react'
import DetailFooter from './DetailFooter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const GameDetailCard = ({gameDetails}) => {
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
        <div className="xs:flex-col md:flex pt-5 md:pt-0 justify-around md:items-center w-full">
            <div className="xs:w-full md:w-1/3">
                <img className='m-auto h-80 w-72 rounded-xl sh-white object-cover' src={gameDetails.background_image} alt={`${gameDetails.name} background`}/>
            </div>
            <div className="xs:w-full md:w-2/3 text-white md:p-10">
                <div className="p-2 sh font-yb text-3xl flex items-baseline justify-around bg-white text-black mt-2 mb-2 rounded-xl">
                    <h1 className=''>{gameDetails.name}</h1>
                    <h3 className=' text-xl'>{gameDetails.released}</h3>
                </div>
                <p className='sh h-56 overflow-auto p-3 mb-5 mt-5'>{gameDetails.description_raw}</p>
                <DetailFooter game={gameDetails}/>
            </div>
        </div>
        <div className=""></div>
    </div>
  )
}

export default GameDetailCard