import React from 'react';
import './header.css'; // Import CSS file for styling
import { FaBell, FaUser } from 'react-icons/fa'; // Import icons from Font Awesome

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="logo"><strong>BehavioGuard</strong></div>
        <div className="profile-section">
          <FaBell className="icon" alt="Notifications" />
          <div className="separator"></div> {/* Vertical Separator */}
          <FaUser className="icon" alt="Profile" />
        </div>
      </header>
      <div className="content">
        {/* Your content goes here */}
      </div>
    </>
  );
}

export default Header;
