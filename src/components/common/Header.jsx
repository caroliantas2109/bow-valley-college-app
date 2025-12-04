import React from 'react';

const Header = ({ userType, userName, onLogout }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>Bou Valley College</h1>
        <p>Hit the ground working.</p>
      </div>
      <div className="header-right">
        <p className="current-date">{currentDate}</p>
        <div className="user-info">
          {userName && <span>Welcome back, {userName}</span>}
          {onLogout && (
            <button className="logout-btn" onClick={onLogout}>
              Log out
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
