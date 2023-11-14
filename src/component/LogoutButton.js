import React from 'react';
import './LogoutButton.css';

const LogoutButton = ({ onLogout }) => {
  const handleLogout = () => {
    // Implement logout logic, e.g., clear user information from state or context
    onLogout();
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
