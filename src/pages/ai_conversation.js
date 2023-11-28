import React, { useState, useRef, useEffect } from 'react';
import './AI_conversation.css';

const AI_conversation = ({ gptResponse }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const inputRef = useRef(null);

  /*
  try {
    const backendResponse = await fetch('http://localhost:8000/generate_feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answer: "I am a student at UBC.",
        }),
    });
    const backendData = await backendResponse.text();
    console.log('Response from backend:', backendData);
  } catch (error) {
      console.error('Error:', error);
  }
  */


  //example of default messages from bot
  useEffect(() => {
    setMessages([{ user: 'bot', text: 'The tailored questions are being generated for you. Please wait.' }]);
  }, []);

  useEffect(() => {
    // reply from ai
    if (messages.length > 0 && messages[messages.length - 1].user === 'user') {
      setMessages(prevMessages => [
        ...prevMessages,
        { user: 'bot', text: gptResponse },
      ]);
    }
  }, [messages, gptResponse]);

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages([...messages, { user: 'user', text: inputText }]);
      setInputText('');
      inputRef.current.focus();
    }
  };

  return (
    <div className="chat-bot-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <textarea
          className='chat-input-textarea'
          ref={inputRef}
          type="text"
          placeholder="Type your answer here"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Done</button>
      </div>
    </div>
  );
};




export default AI_conversation;
