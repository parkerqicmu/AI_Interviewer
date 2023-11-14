import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AI_conversation from './pages/AI_conversation'
import MockInterview from './pages/MockInterview'
import React from 'react'

function App () {
  console.log("Rendering");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/practice" element={<AI_conversation />} />
        <Route path="/create_practice" element={<MockInterview />} />
      </Routes>
    </Router>
  )
}

export default App