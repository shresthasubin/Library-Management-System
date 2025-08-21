import React from 'react'
import {Pie} from 'react-chartjs-2'
import {
    Chart as ChartJS, 
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { pieChartData } from '../../Data.js'


ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend
)

const PieChart = () => {
    const options= {}
    
  return (
    <div>
      <Pie options = {options} data={pieChartData} style={{width:'400px', height:'400px'}}/>
    </div>
  )
}

export default PieChart
