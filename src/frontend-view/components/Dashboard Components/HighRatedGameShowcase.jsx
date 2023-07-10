import React, { useEffect, useRef } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useSelector } from 'react-redux';
import '@splidejs/react-splide/css';

const HighRatedGameShowcase = () => {
  const highestRated = useSelector((state) => state.highestRated);
  const resArr = useRef([]);

  useEffect(() => {
    resArr.current = highestRated.results;
  }, []);
  const image = require('../../images/Metacritic.png');
  return (
    <div className="splide-wrapper">
      <Splide
        className='p-5 bg-gray-dark rounded-xl'
        options={{
          type: 'loop',
          focus: 'center',
          perPage: 1,
          pauseOnHover: false,
          pauseOnFocus: false,
          gap: '10px',
        }}
        aria-label="Sliding showcase for high rated games"
      >
        {resArr.current.map((game, index) => (
          <SplideSlide className='h-64 rounded-xl' key={index}>
            <div className="flex items-center w-full h-full ">
                <div className="w-full max-w-full flex justify-around items-center h-full bg-cover" style={{
                backgroundImage: `url(${game.background_image})`}}>
                    <div className="flex justify-center  items-center w-full h-full bg-black bg-opacity-70">
                        <div className="w-1/2 max-w-full">
                            <h1 className="text-orange font-bold">{game.name}</h1>
                            <h4 className=" bg-white bg-opacity-20 text-white font-bold rounded-xl p-2">
                                <a className='flex items-center hover:text-orange transition' href={`https://www.metacritic.com/game/pc/${game.slug}`} target='_blank' rel="noopener noreferrer">
                                <img src={image} alt="metacritic-icon" className="mr-2 h-6 w-6" />
                                {game.metacritic}%</a>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
          </SplideSlide>
        ))}
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