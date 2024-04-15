import React from 'react';
import './sidebar.css';
import logo from '../../assets/logo.png';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logoo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="menu">
        <div className="menu-item">
          <AiFillHome className="icon" />
          <span className="menu-item-text">Home</span>
        </div>
        <div className="menu-item">
          <AiFillSetting className="icon" />
          <span className="menu-item-text">Profile Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
