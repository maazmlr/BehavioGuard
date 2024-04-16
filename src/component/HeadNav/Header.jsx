import React, { useState } from 'react';
import './header.css'; // Import CSS file for styling
import { FaBell, FaUser } from 'react-icons/fa'; // Import icons from Font Awesome

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <header className="header">
        <div className="logo"><strong>BehavioGuard</strong></div>
        <div className="profile-section">
          <FaBell className="icon" alt="Notifications" />
          <div className="separator"></div> {/* Vertical Separator */}
          <div className="profile-icon" onClick={toggleDropdown}>
            <FaUser className="icon" alt="Profile" />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {/* Dropdown menu items */}
                <div className="dropdown-item">Profile Details</div>
                <div className="dropdown-item">Sign out</div>

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