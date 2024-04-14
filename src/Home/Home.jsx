import React from 'react'
import "../App.css"
import "./home.css"
import LineChart from '../component/Charts/LineChart'

const Home = () => {
  return (
    <div className=' bg-white main  flex '>
      <div className=''>
        <LineChart/>

      </div>
    </div>
  )
}

export default Home