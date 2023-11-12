import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AIConversation from './pages/ai_conversation';
import MockInterview from './pages/mockInterview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/ai-conversation" element={<AIConversation />} />
        <Route path="/mockInterview" element={<MockInterview />} />
      </Routes>
    </Router>
  );
}

export default App;