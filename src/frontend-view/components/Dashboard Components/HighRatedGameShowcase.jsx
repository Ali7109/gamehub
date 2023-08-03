import React, { useEffect, useRef } from 'react';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { useSelector } from 'react-redux';
import '@splidejs/react-splide/css';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { CircularProgress } from '@mui/material';
import DetailFooter from '../GameDetail Components/DetailFooter';

const HighRatedGameShowcase = () => {
  const highestRated = useSelector((state) => state.highestRated);
  const resArr = useRef([]);

  useEffect(() => {
    resArr.current = highestRated.results;
    // resArr.current = [];
  }, []);
  return (
    <div className=" w-full flex-col">
      <h1 className='text-white text-3xl font-yb rounded-t-3xl font-bold p-6 text-center bg-gray-dark '>Highest Rated Titles</h1>
      <Splide
       hasTrack={ false }
        className=' bg-gray-dark rounded-xl'
        options={{
          type: 'loop',
          autoplay: true,
          drag: 'free',
          focus: 'center',
          perPage: 1,
          preloadPages: 3,
          gap: '10px',
          autoScroll: {
            pauseOnHover: false,
            pauseOnFocus: false,
            rewind: false,
            speed: 1
          }
        }}
        extensions={AutoScroll}
        aria-label="Sliding showcase for high rated games"
      >
      <div className="splide__progress">
          <div className="splide__progress__bar" />
      </div>
        <SplideTrack>
        {resArr ?
        resArr.current.map((game, index) => (
          <SplideSlide className='h-64 rounded-xl w-full' key={index}>
            <div className="flex items-center w-full h-full ">
                <div className="w-full max-w-full flex justify-around items-center h-full bg-cover bg-center md:bg-top" style={{
                backgroundImage: `url(${game.background_image})`}}>
                    <div className="flex justify-center  items-center w-full h-full bg-black bg-opacity-70">
                        <div className="w-1/2 max-w-full">
                            <h1 className="text-orange text-center font-bold sm:text-2xl  md:text-4xl mb-2">{game.name}</h1>
                          <DetailFooter game={game} />
                        </div>
                    </div>
                </div>
            </div>
          </SplideSlide>
        )) : 
       <CircularProgress color='warning' />
        }
        </SplideTrack>
      </Splide>
    </div>
  );
};

export default HighRatedGameShowcase;

// import React, { useEffect, useRef, useState } from 'react'
// import { Splide, SplideSlide } from '@splidejs/react-splide';
// import { useSelector } from 'react-redux';
// import '@splidejs/react-splide/css';

// const HighRatedGameShowcase = () => {
//     const highestRated = useSelector(state => state.highestRated);
//     const resArr = useRef([]);

//     useEffect(() => {
//         resArr.current = highestRated.results; // Assign the value to resArr.current instead of resArr
//       }, []);
    
//     return (
//     <Splide 
//     className=' p-5 bg-gray-dark rounded-xl'
//         options={{
//             type   : 'loop',
//             focus  : 'center',
//             perPage: 1,
//             pauseOnHover: false,
//             pauseOnFocus: false,
//             gap: '10px'
//         }}
//         aria-label="Sliding showcase for high rated games">
           
//         {resArr.current.map((game, index) => (
//             <SplideSlide className='flex h-64 bg-black rounded-xl' key={index}>
//                 <div className="flex-1 rounded-r-full w-1/2">
//                     <img className="rounded-r-full w-full" src={game.background_image} alt="WDADS 1"/>
//                 </div>
//                 <div className="w-1/2 flex">
//                     <div className="m-auto text-white">
//                         <h1 className='text-orange text-4xl font-bold'>{game.name}</h1>
//                         <h3>MetaCritic: {game.metacritic}</h3>
//                     </div>
                    
//                 </div>
//             </SplideSlide>
//         ))}
//     </Splide>
//   )
// }

// export default HighRatedGameShowcase
