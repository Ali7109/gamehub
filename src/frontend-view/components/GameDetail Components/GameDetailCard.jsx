import React from 'react'
import DetailFooter from './DetailFooter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import PlatformCard from './PlatformCard'

const GameDetailCard = ({gameDetails}) => {
    const nav = useNavigate();
    function compare(a,b) {
        if (a.name < b.name)
           return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      }
      
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
        <div className="w-full text-white mb-5">
            <div className='gap-5 flex items-baseline'>Developed by: {
                gameDetails.developers.map((developer, index) => (
                    <h2 as={Link} className='cursor-pointer font-bold hover:bg-orange transition hover:text-black mt-2 max-w-fit bg-white bg-opacity-20 p-2 rounded-xl'>{developer.name}</h2>
                ))
                }</div>
        </div>
        <div className="w-full text-white  custom-scroll transition flex items-baseline">
            <h1 className='mr-5'>Platforms: </h1>
            <div className='overflow-auto transition gap-5 flex items-center'>{
               gameDetails.platforms.sort(compare).map((platform) => {
                   return <PlatformCard platform={platform.platform} />
                })
                }
            </div>
        </div>
    </div>
  )
}

export default GameDetailCard