import React from 'react';
import './sidebar.css';
import logo from '../../assets/logo.png';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
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
          <AiFillHome className="icon" />
          <span className="menu-item-text">Home</span>
        </div>
        </NavLink>
        <div className="menu-item">
          <AiFillSetting className="icon" />
          <span className="menu-item-text">Profile Settings</span>
        </div>
      </div>
      <div className='flex justify-center mt-16'>
        <Clock />
      </div>
    </div>
  );
};

export default Sidebar;