import React, { useEffect } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useSelector } from 'react-redux';
import '@splidejs/react-splide/css';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

const HighRatedGameShowcase = () => {
    const highestRated = useSelector(state => state.highestRated);
    let resArr = highestRated.results; 
    
    return (
    <Splide 
    className=' min-h-fit'
        options={{
            type   : 'loop',
            drag   : 'free',
            focus  : 'center',
            perPage: 2,
            pauseOnHover: false
            
        }}
        extensions={{ AutoScroll }}
    aria-label="Sliding showcase for high rated games">

        {resArr.map((game, index) => (
            <SplideSlide className=' h-56' key={index}>
                <img src={game.background_image} alt={`${game.name} poster`} />
            </SplideSlide>
        ))}
    </Splide>
  )
}

export default HighRatedGameShowcase