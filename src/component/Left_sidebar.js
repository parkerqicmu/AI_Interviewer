import React, { useState, useEffect } from 'react';
import { Button } from "antd"; // Import your Button component
import './Left_sidebar.css'; // Import your CSS for styling
import logo from '../asset/AI-Interviewer-logo.jpg';
import { PlusOutlined } from "@ant-design/icons";

const LeftSidebar = ({
    currentPracticeIndex,
    practiceList,
    onPracticeSelected,
    onNewClicked,
}) => {

// open the cooresponding practice form with the index
  const selectPractice = (index) => {
    onPracticeSelected(index);
};


return (
  <div className="left-side-bar">
      <div className="logo-header">
          <img src={logo} alt="Logo" />
      </div>
      <div className="new-button-container">
          <Button
              className="new-practice-button"
              type="primary"
              shape="round"
              onClick={onNewClicked}
          >
              + New
          </Button>
      </div>
      <div className="practice-button-wrap">
          {practiceList.map((item, index) => {
              return (
                  <Button
                      key={index}
                      type="default"
                      className={
                          currentPracticeIndex === index
                              ? "selected-practice-button"
                              : "practice-button"
                      }
                      shape="round"
                      onClick={() => {
                          selectPractice(index);
                      }}
                  >
                      {item?.name || ""}
                  </Button>
              );
          })}
      </div>
  </div>
);
};

export default LeftSidebar;
