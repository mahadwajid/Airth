import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">
        GreenInsight AI Dashboard
      </div>
      
      <div className="header-actions">
        <button className="header-button">
          📊 Analytics
        </button>
        <button className="header-button primary">
          🌱 New Action
        </button>
        <div className="header-notification">
          🔔
        </div>
        <div className="header-user">
          <div className="user-avatar">
            U
          </div>
          <div className="user-info">
            User
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;