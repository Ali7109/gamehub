import React from 'react'
import {Backdrop, HighestRatedGameShowcase, StatsPanel} from '../components/Dashboard Components/DashboardComponents'
import {motion} from 'framer-motion'

const Dashboard = () => {
  return (
    <motion.div 
    initial={{opacity: 0, y:10}}
    animate={{opacity: 1, y:0}}
    exit={{opacity: 0, y:10}}
    transition={{duration: 1}}
    className="space-y-20 pt-10 w-full">
      <Backdrop />
      <StatsPanel />
      <HighestRatedGameShowcase /> 
      <div className=" h-20"></div>
    </motion.div>
  )
}

export default Dashboard