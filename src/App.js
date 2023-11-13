import React, { useState, useRef } from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import LogoutButton from './LogoutButton';
import './App.css';

function App() {
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

  const DefaultContent = () => {
    return <div>This is the default content</div>;
  };

  const [user, setUser] = useState(null);

  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
    // Handle successful login, e.g., store user information in state
    setUser(response.profileObj);
  };

  const handleLoginFailure = (error) => {
    console.error('Login Failure:', error);
    // Handle login failure, e.g., show an error message
  };

  const handleLogout = () => {
    // Implement logout logic, e.g., clear user information from state
    setUser(null);
  };
  
const MockInterview = () => {
  const [dialog, setDialog] = useState('');

  return (
    <div className="dialog-input-container">
      <input 
        type="text" 
        value={dialog} 
        onChange={(e) => setDialog(e.target.value)} 
        placeholder="Enter dialog"
      />
    </div>
  );
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
      <h1>AI Interviewer</h1>
      {/* <GoogleLoginButton onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} /> */}
      {user ? (
        <>
          <p>Welcome, {user.name}!</p>
          <LogoutButton onLogout={handleLogout} />
        </>
      ) : (
        <GoogleLoginButton onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} />
      )}
      {console.log("hi")}

      {console.log(user)}
      {/* Add the rest of your application components */}
      <div className="exercise-list-container">
        <div className="logo-button-container">
        <img src="WechatIMG6.jpg" class="top-left-image" alt="logo" />
          <button onClick={createExercise}>New Practice</button>
        </div>
        <div className="history-exercise-list">
          <h2>Practice List</h2>
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
            <button onClick={() => setPage('mockInterview')}>Mock Interview</button>
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

export default App;
