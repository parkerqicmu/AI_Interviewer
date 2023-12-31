import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../asset/AI-Interviewer-logo.jpg';
import './mockInterview.css';
//import axios from 'axios';

export function MockInterview() {
  const [exercises, setExercises] = useState([]); // user practice list
  const [currentExercise, setCurrentExercise] = useState(null); // current practice
  const [CompanyNameInputValue, setCNInputValue] = useState(''); // user input value
  const [CompanyDescriptionInputValue, setCDInputValue] = useState(''); // user input value
  const [PositionNameInputValue, setPNInputValue] = useState(''); // user input value
  const [PositionRequirementInputValue, setPReqInputValue] = useState(''); // user input value
  const [PositionResponsibilityInputValue, setPResInputValue] = useState(''); // user input value
  const [exerciseCount, setExerciseCount] = useState(0);
  const [page, setPage] = useState('default');
  const inputRef = useRef(null); 


  const navigate = useNavigate();

  const handleMockInterviewClick = async () => {
    try {
      const backendResponse = await fetch('http://localhost:8000/job_description', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            job_title: PositionNameInputValue,
            company_name: CompanyNameInputValue,
            company_description: CompanyDescriptionInputValue,
            position_name: PositionNameInputValue,
            position_responsibility: PositionResponsibilityInputValue,
            position_requirements: PositionRequirementInputValue
          }),
      });
      if (!backendResponse.ok) {
          throw new Error('Failed to send data to backend');
      }
      const backendData = await backendResponse.text();
      console.log('Response from backend:', backendData);
      if (backendData['message'] == "User not logged in") {
        navigate('/login');
      }
    } catch (error) {
        console.error('Error:', error);
    }
      navigate('/practice');
    };
  const DefaultContent = () => {
    return <div>This is the default content</div>;
  };
  
  // create new exercise
  const createExercise = () => {
    setExerciseCount(exerciseCount + 1);
    const newExercise = {
      id: Date.now(),
      name: `Practice ${exerciseCount + 1}`,
      content: [],
    };
    setExercises([...exercises, newExercise]);
    setCurrentExercise(newExercise);
    setPage('default'); // Add this line
    setCNInputValue('');
    setCDInputValue('');
    setPNInputValue('');
    setPReqInputValue('');
    setPResInputValue('');
  };

  // add input content to current exercise
  const addInputContent = () => {
    if (currentExercise) {
      const updatedExercise = { ...currentExercise };
      updatedExercise.content.push(CompanyNameInputValue);
      updatedExercise.content.push(CompanyDescriptionInputValue);
      updatedExercise.content.push(PositionNameInputValue);
      updatedExercise.content.push(PositionRequirementInputValue);
      updatedExercise.content.push(PositionResponsibilityInputValue);
      setCurrentExercise(updatedExercise);
      setCNInputValue('');
      setCDInputValue('');
      setPNInputValue('');
      setPReqInputValue('');
      setPResInputValue('');
      inputRef.current.focus();
    }
  };

  return (
    <div className="app-container">
      <div className="exercise-list-container">
        <div className="logo-button-container">
        <img src={logoImage}  class="top-left-image" alt="logo" />
        <h2>Practice List</h2>
          <button onClick={createExercise}>New Practice</button>
        </div>
        <div className="history-exercise-list">
          
          <ul>
            {exercises.map((exercise) => (
              <li key={exercise.id}>{exercise.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="exercise-content-container">
      {page === 'default' && (
    <>
      <DefaultContent />
      {currentExercise && (
          <div>
            <h2>Job Information</h2>
            <h3>Company Name</h3>
            <textarea
              style={{resize:"none"}}            
              ref={inputRef}
              value={CompanyNameInputValue}
              onChange={(e) => setCNInputValue(e.target.value)}
              placeholder="Type in here"
            />
            <h3>Company Description</h3>
            <textarea
              ref={inputRef}
              value={CompanyDescriptionInputValue}
              onChange={(e) => setCDInputValue(e.target.value)}
              placeholder="Type in here"
              style={{resize:"none"}}
            />
            <h3>Position Name</h3>
            <textarea
              style={{resize:"none"}}
              ref={inputRef}
              value={PositionNameInputValue}
              onChange={(e) => setPNInputValue(e.target.value)}
              placeholder="Type in here"
            />
            <h3>Position Responsibility</h3>
            <textarea
              style={{resize:"none"}}
              ref={inputRef}
              value={PositionRequirementInputValue}
              onChange={(e) => setPReqInputValue(e.target.value)}
              placeholder="Type in here"
            />
            <h3>Position Requirement</h3>
            <textarea
              style={{resize:"none"}}
              ref={inputRef}
              value={PositionResponsibilityInputValue}
              onChange={(e) => setPResInputValue(e.target.value)}
              placeholder="Type in here"
            />
            <button onClick={handleMockInterviewClick}>Mock Interview</button>
            <ul>
              {currentExercise.content.map((content, index) => (
                <li key={index}>{content}</li>
              ))}
            </ul>
          </div>

        )}
        
        </>
  )}
        {page === 'mockInterview' && <MockInterview />}
      </div>
    </div>
  );
}

export default MockInterview;