import React from 'react'
import {Backdrop, HighestRatedGameShowcase, StatsPanel} from '../components/Dashboard Components/DashboardComponents'

const Dashboard = () => {
  return (
    <div className="space-y-20 pt-10 w-full">
      <Backdrop />
      <StatsPanel />
        <HighestRatedGameShowcase /> 
        <div className=" h-64"></div>
    </div>
  )
}

export default Dashboard