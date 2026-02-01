import React, { useEffect, useState } from 'react'
import {LuPlus} from "react-icons/lu"
import CustomBarChart from"../Charts/CustomBarChart"
// import CustomTooltip from '../Charts/CustomTooltip'
// import { setChartData } from 'recharts/types/state/chartDataSlice'
import { prepareIncomeBarChartData } from '../../utils/helper'


const IncomeOverview = ({transactions, onAddIncome}) => {
  const [chartData, setChartData]=useState([])

  // useEffect(()=>{
  //   const result=prepareIncomeBarChartData(transactions)
  //   setChartData(result)
  //   return ()=>{}
  // }, [transactions])

  useEffect(() => {
  console.log("transactions prop:", transactions);

  const result = prepareIncomeBarChartData(transactions);
  console.log("chartData result:", result);

  setChartData(result);
}, [transactions]);




  return(
    <div className='card overflow-visible'>
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>

        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className='text-lg'/>
          Add Income
        </button>
      </div>

      <div className="mt-10 ">
        <CustomBarChart data={chartData} xKey="source" labelKey="source" />
        {/* <CustomTooltip/> */}
      </div>
    </div>
  )
}

export default IncomeOverview