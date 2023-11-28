import React, { useState, useEffect } from 'react';
import LeftSidebar from '../component/Left_sidebar';
import PracticeForm from '../component/PracticeForm';
import './New_practice.css';
import { useNavigate } from "react-router-dom";
import AI_conversation from './ai_conversation';
import { Typography } from 'antd';

const New_practice = () => {

  const navigate = useNavigate();

  const [practiceList, setPracticeList] = useState([]); // user practice list
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(-1); //define the current practice index
  const [gptResponse, setGptResponse] = useState('');

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
    try {
      const backendResponse = await fetch('http://localhost:8000/job_description', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            job_title: formData.positionName,
            company_name: formData.companyName,
            company_description: formData.companyDescription,
            position_name: formData.positionName,
            position_responsibility: formData.positionResposibility,
            position_requirements: formData.positionRequirements
          }),
      });

      if (!backendResponse.ok) {
        navigate('/');
        throw new Error('Failed to send data to backend');  
      }
      const backendData = await backendResponse.text();
      console.log('Response from backend:', backendData);
    } catch (error) {
        console.error('Error:', error);
    }

    // =================================

    // switch to mock interview
    handleFormChange({
        ...practiceList[currentPracticeIndex],
        step: "chat",
    });

    try {
      const backendResponse = await fetch('http://localhost:8000/get_questions', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            job_title: formData.positionName,
            company_name: formData.companyName,
            company_description: formData.companyDescription,
            position_name: formData.positionName,
            position_responsibility: formData.positionResposibility,
            position_requirements: formData.positionRequirements,
            number_of_questions: formData.questionNumbers,
            user_experience: formData.yourExperience,
            question_type: formData.questionType,
            difficulty: formData.questionDifficulty
          }),
      });
      const backendData = await backendResponse.json();;
      setGptResponse(JSON.stringify(backendData));
      console.log('Response from backend:', backendData);
    } catch (error) {
        console.error('Error:', error);
    }
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
                  <AI_conversation gptResponse={gptResponse} />
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
