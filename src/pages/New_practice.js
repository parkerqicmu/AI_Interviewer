import React from 'react';
import Left_sidebar from '../component/Left_sidebar';

const New_practice = () => {
  return (
    <div className="main-container">
      <div className="left-column">
        <Left_sidebar />
      </div>
      <div className="right-column">
        {/* Other content goes here */}
        <h2>Welcome to the Page!</h2>
        <p>More content can be added here.</p>
      </div>
    </div>
  );
}

export default New_practice;
