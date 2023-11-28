import React, { useState, useEffect } from 'react';
import LeftSidebar from '../component/Left_sidebar';
import PracticeForm from '../component/PracticeForm';
import './New_practice.css';
import { useNavigate } from "react-router-dom";
import AI_conversation from './ai_conversation';
import { Typography } from 'antd';

const New_practice = () => {
  const [practiceList, setPracticeList] = useState([]); // user practice list
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(-1); //define the current practice index

  // update form data
  const handleFormChange = (newFormData) => {
      setPracticeList((prev) => {
          let newVal = [...prev];
          newVal[currentPracticeIndex] = newFormData;
          return newVal;
      });
  };

  const initNewFormData = (index) => {
    const data = {
        name: "Practice " + (index + 1),
        companyName: "",
        companyDescription: "",
        positionName: "",
        positionResposibility: "",
        positionRequirements: "",
        questionType: "general",
        questionDifficulty: "easy",
        questionNumbers: 3,
        yourExperience: "",
        step: "form", // form(practice form) || chat(AI conversation) || loading(Loading)
    };
    return data;
  };

  const createNewPractice = () => {
    const newIndex = practiceList.length;
    const newFormData = initNewFormData(newIndex);
    // add new form data to the list
    setPracticeList([...practiceList, newFormData]);
    setCurrentPracticeIndex(newIndex);
  };

  const mockInterview = async () => {
    console.log(
        "[debug] mock interview",
        practiceList[currentPracticeIndex]
    );

    // =================================
    //[placehoder] send form data to backend api, may need process
    const formData = practiceList[currentPracticeIndex];

    // =================================

    // switch to mock interview
    handleFormChange({
        ...practiceList[currentPracticeIndex],
        step: "chat",
    });
  };

  const { Text, Link } = Typography;
  const backPractice = () => {
    handleFormChange({
      ...practiceList[currentPracticeIndex],
      step: "form",
  });
  };

  const currentStep = () => {
      if (currentPracticeIndex < 0) {
          return "form";
      }
      return practiceList[currentPracticeIndex]?.step;
  };

  const [backStep, setCurrentStep] = useState('form');

  const currentName = () => {
      if (currentPracticeIndex < 0) {
          return "";
      }
      return practiceList[currentPracticeIndex]?.name;
  };

  useEffect(() => {
      createNewPractice(0);
  }, []);


  return (
    <div className="main-container">
        <div className="left-column">
            <LeftSidebar
                currentPracticeIndex={currentPracticeIndex}
                practiceList={practiceList}
                onNewClicked={createNewPractice}
                onPracticeSelected={setCurrentPracticeIndex}
            />
        </div>
        <div className="right-column">
            
        <div className="form-title">
          <div className="back">
            {currentStep() === "chat" && (
              <Link href="#" onClick={(e) => {e.preventDefault(); backPractice();}}>Back</Link>
            )}
          </div>
          {currentName()}
        </div>
            {
                // form or chat component
                currentStep() === "chat" ? (
                    <AI_conversation />
                ) : (
                    <PracticeForm
                        formData={
                            currentPracticeIndex >= 0
                                ? practiceList[currentPracticeIndex]
                                : {}
                        }
                        onChange={handleFormChange}
                        onMockInterviewClick={mockInterview}
                    />
                )
            } 
        
        </div>
    </div>
  );
};

export default New_practice;
