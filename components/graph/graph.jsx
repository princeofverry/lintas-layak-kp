"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
  } from 'chart.js';
  import { Bar } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
  );

const graph = () => {

    const[chartData, setChartData] = useState({
        datasets: [],
      });
    
      const [chartOptions, setChartOptions] = useState({});
    
      useEffect(() =>{
        setChartData({
          labels: ['Banyumanik', 'Candisari', 'Gajahmungkur', 'Gayamsari', 'Genuk', 
                    'Gunungpati', 'Mijen', 'Ngaliyan', 'Pedurungan', 'Semarang Barat', 'Semarang Selatan', 
                    'Semarang Tengah', 'Semarang Timur', 'Semarang Utara', 'Tembalang', 'Tugu'],
          datasets: [
            {
              label: 'Kecamatan',
              data: [3, 7, 14, 1, 8, 12, 5, 10, 4, 15, 2, 11, 9, 6, 13, 10],
              borderColor: 'rgba(33, 133, 213, 0.8)',
              backgroundColor: 'rgba(33, 133, 213, 0.8)',
            }
          ]
        })
        
      }, [])

  return (
    <div className="mt-5  w-full h-auto overflow-auto rounded-lg shadow-lg ">
          <Bar data={chartData} options={chartOptions}/>
    </div>
  )
}

export default graph