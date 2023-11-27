import React, { useState, useRef, useEffect } from 'react';
import './AI_conversation.css';

const AI_conversation = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // reply from ai
    if (messages.length > 0 && messages[messages.length - 1].user === 'user') {
      setTimeout(() => {
        setMessages([
          ...messages,
          { user: 'bot', text: `output from ai` },
        ]);
      }, 1000);
    }
  }, [messages]);

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
