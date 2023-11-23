import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../asset/AI-Interviewer-logo.jpg';
// import './mockInterview.css';

const PracticeForm = ({onChange}) => {
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
  
    const updateData = () => {
        const jobData = {
            CompanyNameInputValue: CompanyNameInputValue,
            CompanyDescriptionInputValue: CompanyDescriptionInputValue,
            PositionNameInputValue: PositionNameInputValue,
            PositionRequirementInputValue: PositionRequirementInputValue,
            PositionResponsibilityInputValue: PositionResponsibilityInputValue
        }
        onChange(jobData)
    }


    const navigate = useNavigate();
  
    const handleMockInterviewClick = () => {
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

    useEffect(() => {
        updateData();
    }, [CompanyNameInputValue, CompanyDescriptionInputValue, PositionNameInputValue, PositionRequirementInputValue, PositionResponsibilityInputValue]);
  
    return (
        <div>
        <h2>Job Imformation</h2>
        <h3>Company Name</h3>
        <textarea
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
        />
        <h3>Position Name</h3>
        <textarea
          ref={inputRef}
          value={PositionNameInputValue}
          onChange={(e) => setPNInputValue(e.target.value)}
          placeholder="Type in here"
        />
        <h3>Position Responsibility</h3>
        <textarea
          ref={inputRef}
          value={PositionRequirementInputValue}
          onChange={(e) => setPReqInputValue(e.target.value)}
          placeholder="Type in here"
        />
        <h3>Position Requirement</h3>
        <textarea
          ref={inputRef}
          value={PositionResponsibilityInputValue}
          onChange={(e) => setPResInputValue(e.target.value)}
          placeholder="Type in here"
        />
        {/* <button onClick={handleMockInterviewClick}>Mock Interview</button>
        <ul>
          {currentExercise.content.map((content, index) => (
            <li key={index}>{content}</li>
          ))}
        </ul> */}
      </div>
    );
  }
export default PracticeForm;

