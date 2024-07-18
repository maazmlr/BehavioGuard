import React from 'react';
import './sidebar.css';
import logo from '../../assets/logo.png';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { FaBell, FaUser, FaChartBar, FaQuestionCircle  } from 'react-icons/fa';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import Clock from './Clock';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logoo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="menu">
        <NavLink activeClassName="active" to='/'><div className="menu-item">
          <DashboardIcon className="icon" />
          <span className="menu-item-text">Dashboard</span>
        </div>
        </NavLink>

        <div className="menu-item">
          <FaUser className="icon" />
          <span className="menu-item-text">User Profile</span>
        </div>


        <NavLink activeClassName="active" to='/alert'>
        <div className="menu-item">
          <FaBell className="icon" />
          <span className="menu-item-text">Alerts</span>
        </div>
        </NavLink>
        
        <div className="menu-item">
          <FaChartBar className="icon" />
          <span className="menu-item-text">Reports</span>
        </div>

        <div className="menu-item">
          <AiFillSetting className="icon" />
          <span className="menu-item-text">Setting</span>
        </div>

        <div className="menu-item">
          <FaQuestionCircle className="icon" />
          <span className="menu-item-text">Help</span>
        </div>

        <div className="menu-abs menu-item">
        <LogoutIcon className='margin-icon1' />
          <span className="menu-item-text">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;