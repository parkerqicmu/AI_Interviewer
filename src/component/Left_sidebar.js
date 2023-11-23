import React, { useState, useEffect } from 'react';
import { Button } from './Button'; // Import your Button component
import './Left_sidebar.css'; // Import your CSS for styling
import logo from '../asset/AI-Interviewer-logo.jpg';
import { useNavigate } from 'react-router-dom';
import createExercise from '../pages/mockInterview';

const ButtonList = ({onPracticeSelected, currentPracticeIndex}) => {
  const [buttons, setButtons] = useState([]);
  
  // const navigate = useNavigate();
  const handlePracticeClick = (index) => {
    // navigate('/practice');
    onPracticeSelected(index);
  };

  const addNewButton = () => {
    const buttonNumber = buttons.length;
    setButtons([...buttons, `Practice ${buttons.length + 1}`]);
    handlePracticeClick(buttonNumber);
  };

  useEffect(()=>{
    addNewButton();
  },[])


  return (
    <div className="container">
      <div className="logo-header">
        <img src={logo} alt="Logo" />
      </div>
      <div className="new-button-container">
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
            buttonStyle="btn--outline"
            buttonSize="btn--medium"
            onClick={()=>{handlePracticeClick(index)}}
          >
            {button}
          </Button>
        ))}
      </div>
      <div className="footer">
      </div>
    </div>
  );
};

export default ButtonList;
