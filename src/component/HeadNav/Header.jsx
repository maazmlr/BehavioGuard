

// export default Header
import React from 'react';
import './header.css'; // Import CSS file for styling

const Header = () => {
  return (
    <header className="header">
    <div className="logo">My App</div>
    <div className="profile-section">
      <img  alt="Profile" className="profile-icon" />
      <img  alt="Notifications" className="notification-icon" />
    </div>
  </header>
  );
}

export default Header;
