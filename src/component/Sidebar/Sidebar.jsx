import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import "./sidebar.css"
import logo from "../../assets/logo2.png"


const Sidebare = () => {
  return (

    <Sidebar   backgroundColor='#050A30' className='sidebar'>
    
        <div className=''>
        <img src={logo} alt="" className='h-40 w-40 block mx-auto' />
        <Menu className='mt-20' >

        <SubMenu label="Charts">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu>
        <MenuItem> Documentation </MenuItem>
        <MenuItem> Calendar </MenuItem>
      </Menu>
      </div>
    </Sidebar>  )
}

export default Sidebare