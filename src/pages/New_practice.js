import React, { useState, useEffect } from 'react';
import Left_sidebar from '../component/Left_sidebar';
import PracticeForm from '../component/PracticeForm';
import './New_practice.css';

const New_practice = () => {
  const [formData, setFormData] = useState({});

  const [practiceData, setPracticeData] = useState([]); // user practice list

  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0);
  const handleFormChange=(newFormData)=>{
    setPracticeData((prev)=>{
      let newVal=[...prev];
      newVal[currentPracticeIndex]=newFormData;
      return newVal;
  })
};
  useEffect(() => {
    console.log("22222222",practiceData);
  }, [practiceData]);

  useEffect(() => {
    console.log("3333333333333",currentPracticeIndex);
  }, [currentPracticeIndex]);



  return (
    <div className="main-container">
      <div className="left-column">
        <Left_sidebar onPracticeSelected = {setCurrentPracticeIndex} currentPracticeIndex = {currentPracticeIndex}/>
      </div>
      <div className="right-column">
        <PracticeForm onChange = {handleFormChange} />

      </div>
    </div>
  );
}

export default New_practice;
