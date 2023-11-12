import React from 'react';
//import LandingPage from './pages/LandingPage'; // adjust the path according to your project structure

function conversation_ai() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, border: '1px solid black' }}>
        <h2>Selection Area</h2>
        {/* Add your selection items here */}
      </div>
      <div style={{ flex: 2, border: '1px solid black', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <h2>Conversation Area</h2>
          {/* Add your conversation items here */}
        </div>
        <div style={{ height: '50px', border: '1px solid black' }}>
          <input type="text" placeholder="Type here..." style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </div>
  );
}

export default conversation_ai;