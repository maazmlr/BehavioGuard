import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';// Import the Sidebar component
import './header.css'; // Import CSS file for styling
import { FaBell, FaUser } from 'react-icons/fa';
import Cookie from 'js-cookie';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useAppContext } from '../../context';
import { NavLink, useLocation } from 'react-router-dom';
import { invoke } from '@tauri-apps/api/tauri';
import axios from 'axios';
import { Link } from '../../Link';
import { useSelector } from 'react-redux';

const Header = () => {
  const { setTokenContext, data } = useAppContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isSidebarExpanded = useSelector((state) => state.expand.value); // State for sidebar
  let location = useLocation();
  let pathname = location.pathname;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const signOut = async () => {
    const token = Cookie.get('uId');
    axios.get(`${Link}toggleStatus`, {
      headers: {
        'token': token
      }
    })
      .then(function async (response) {
        Cookie.remove('uId');
        invoke('stop_data_collection');
        setTokenContext("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function content(n) {
    if (n === "/") {
      return "Dashboard";
    } else if (n === "/alert") {
      return "Alert & Notification";
    } else if (n === "/profileSetting") {
      return "Profile Setting";
    }
  }

  return (
    <>
      <Sidebar />
      <header className={`header ${isSidebarExpanded ? 'sidebar-expanded' : ''}`}>
        <div className="logo"><strong>{content(pathname)}</strong></div>
        <div className="profile-section">
          <FaBell className="icon" alt="Notifications" />
          <div className="separator"></div> {/* Vertical Separator */}
          <div className="profile-icon m-t" onClick={toggleDropdown}>
            <button className="button">
              <div className='flex-btn'>
                <div>
                  <FaUser className="icon" alt="Profile" />
                </div>
                <div>
                  <p className='email-position'>
                    {data?.name.length > 20 ? `${data?.name.slice(0, 20)}...` : data?.name}
                  </p>
                </div>
              </div>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {/* Dropdown menu items */}
                <NavLink to='/profileSetting'>
                  <div className="dropdown-item">
                    <ManageAccountsIcon fontSize='12' className='margin-icon' />
                    <p>Profile Details</p>
                  </div>
                </NavLink>
                <div onClick={signOut} className="dropdown-item">
                  <LogoutIcon fontSize='12' className='margin-icon' />
                  <p>Sign out</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className={`content ${isSidebarExpanded ? 'sidebar-expanded' : ''}`}>
        {/* Your content goes here */}
      </div>
    </>
  );
}

export default Header;
