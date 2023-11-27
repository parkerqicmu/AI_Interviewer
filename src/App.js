import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AI_conversation from './pages/ai_conversation'
import MockInterview from './pages/mockInterview'
import New_practice from './pages/New_practice'
import React from 'react'
import { ConfigProvider } from "antd"

function App () {
  console.log("Rendering");

  return (
    <ConfigProvider
    theme={{
        token: {
            colorPrimary: "#086330",
            borderRadius: 2,
        },
        Button: {
            colorPrimary: '#086330',
            algorithm: true, // Enable algorithm
          },
    }}
>    
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/practice" element={<AI_conversation />} />
          <Route path="/mockInterview" element={<MockInterview />} />
          <Route path="/create" element={<New_practice />} />
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App