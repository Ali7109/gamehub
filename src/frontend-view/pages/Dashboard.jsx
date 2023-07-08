import React from 'react'
import {Backdrop, StatsPanel} from '../components/Dashboard Components/DashboardComponents'

const Dashboard = () => {
  return (
    <div className="space-y-20 pt-10 w-full">
      <Backdrop />
      <StatsPanel />
    </div>
  )
}

export default Dashboard