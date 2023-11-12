import React from 'react';
import './Header.css'; // Assuming you have a CSS file for styles

function Header() {
  return (
    <header className="header">
      <h1>AI INTERVIEWER</h1>
      <button className="new-button">+ New</button>
      // Add other elements like the logo, search bar, etc.
    </header>
  );
}

export default Header;
