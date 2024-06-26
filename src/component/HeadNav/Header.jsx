import React, { useState } from 'react';
import './header.css'; // Import CSS file for styling
import { FaBell, FaUser } from 'react-icons/fa'; // Import icons from Font Awesome
import Cookie from 'js-cookie'
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useAppContext } from '../../context';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const { setTokenContext, data } = useAppContext()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const signOut = () => {
    Cookie.remove('uId')
    setTokenContext("")
  }

  return (
    <>
      <header className="header">
        <div className="logo"><strong>BehavioGuard</strong></div>
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
                <NavLink  to='/'>
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
      <div className="content">
        {/* Your content goes here */}
      </div>
    </>
  );
}

export default Header;