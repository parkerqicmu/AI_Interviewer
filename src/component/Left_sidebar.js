import React, { useState } from 'react';
import { Button } from './Button'; // Import your Button component
import './Left_sidebar.css'; // Import your CSS for styling
import logo from '../asset/AI-Interviewer-logo.jpg';

const ButtonList = () => {
  const [buttons, setButtons] = useState([]);

  const addNewButton = () => {
    setButtons([...buttons, 'New Button']);
  };

  return (
    <div className="container">
      <div className="fixed-header">
        <img src={logo} alt="Logo" />
        <Button
          buttonStyle="btn--green"
          buttonSize="btn--medium"
          onClick={addNewButton}
        >
          + New
        </Button>
      </div>
      <div className="scroll-area">
        {buttons.map((button, index) => (
          <Button
            key={index}
            buttonStyle="btn--primary"
            buttonSize="btn--medium"
          >
            {button}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ButtonList;
