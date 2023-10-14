import { CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { motion, stagger } from 'framer-motion';

const StatsPanel = () => {
    const data = useSelector(state => state.data);
    const publishers = useSelector(state => state.publishers);

    const [trigger, setTrigger] = useState(false);

    const countOfTitles = data.count - 10000;
    const countOfPublishers = publishers.count - 1000;
    const platforms = 50;

    const [count, setCount] = useState(0);
    const [platformsCount, setPlatformsCount] = useState(0);
    const [publishersCount, setPublishersCount] = useState(0);

    window.addEventListener('scroll', () => {
        setTrigger(window.scrollY > 150);
    })

    useEffect(() => {
      const incCount = (i,inc, maxNum, duration, flag) => {
        if(flag){
          setCount(i);
        } else {
          if(inc < 100){
            setPlatformsCount(i);
          } else {
            setPublishersCount(i);
          }
        }
        if (i < maxNum) {
          setTimeout(() => {
              incCount(i + inc,inc, maxNum, duration, flag);
          }, duration);
        }
      };
      if(!trigger) return;
      incCount(count, 10000, countOfTitles, 10, true);
      setTimeout(() => {
        incCount(publishersCount, 1000, countOfPublishers, 10, false);
      }, 500)
      setTimeout(() => {
        incCount(platformsCount, 5, platforms, 10, false);
      }, 1000);
      
    }, [window.scrollY]); 

        
    return (
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.5, delay: 4 }, // Stagger the children with a delay of 0.5 seconds
            }
          }}
          className="metr-cont space-y-16 md:space-y-0 md:flex gap-2 p-5 w-full justify-center items-center ">

            <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 }, // Initial hidden state
              show: { opacity: 1, y: 0 }, // Final visible state
            }}
            className=" drop-shadow-xl flex w-60 h-60 font-mono text-3xl bg-gray-dark rounded-xl p-5 text-center  text-white">
                <div className="m-auto">
                {countOfTitles <= 0 || !countOfTitles ? 
                          <CircularProgress color='warning' />
                          : 
                    <>
                        <h1 className='transition font-bold text-orange tracking-wide hover:scale-110 '>{count.toLocaleString("en-US")}+</h1> 
                        <h2>Titles</h2> 
                    </>
                }
                </div> 
            </motion.div>
           
            <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 }, // Initial hidden state
              show: { opacity: 1, y: 0 }, // Final visible state
            }}
            className="drop-shadow-xl flex w-60 h-60 font-mono text-3xl bg-gray-dark rounded-xl p-5 text-center  text-white">
                <div className="m-auto">
                {countOfPublishers <= 0 || !countOfPublishers ? 
                          <CircularProgress color='warning' />
                          : 
                    <>
                        <h1 className='transition font-bold text-orange tracking-wide hover:scale-110 '>{publishersCount.toLocaleString("en-US")}+</h1> 
                        <h2>Publishers</h2> 
                    </>
                }
                </div> 
            </motion.div>
            <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 }, // Initial hidden state
              show: { opacity: 1, y: 0 }, // Final visible state
            }}
            className="drop-shadow-xl flex w-60 h-60 font-mono text-3xl bg-gray-dark rounded-xl p-5 text-center  text-white">
                <div className="m-auto">
                {platforms <= 0 || !platforms ? 
                          <CircularProgress color='warning' />
                          : 
                    <>
                        <h1 className='transition font-bold text-orange tracking-wide hover:scale-110 '>{platformsCount}+</h1> 
                        <h2>Platforms</h2> 
                    </>
                }
                </div> 
            </motion.div>
        </motion.div>
        
  )
}

export default StatsPanel

// OLDER LOGIC
    // const incCount = (i, maxNum) => {
    //     setCount(i);
    //     if(i < maxNum){
    //         setTimeout(function() {//Delay a bit before calling the function again.
    //             incCount(i + 10000, maxNum);
    //           }, 10);
    //     }
    // }
    
    // window.addEventListener('scroll', () => {
    //     if(window.scrollY > 180 && count < countOfTitles){
    //         incCount(count, countOfTitles);
    //     }
    // })
  