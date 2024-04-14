import React from 'react'
import Header from './component/HeadNav/Header'
import Sidebare from './component/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='flex  '>
        <Sidebare/>
        <div className='w-screen'>
        <Header/>
        <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout