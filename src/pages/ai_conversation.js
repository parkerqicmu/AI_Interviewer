import React, { useState, useRef, useEffect } from 'react';
import './AI_conversation.css';

const AI_conversation = ({ gptResponse }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const inputRef = useRef(null);
  const [feedbackData, setFeedbackData] = useState('');

  const fetchGptFeedback = async () => {
    try {
      const backendResponse = await fetch('http://localhost:8000/generate_feedback', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            questions: messages.slice(1, -1).map(message => message.text),
            answer: messages[messages.length - 1].text,
          }),
      });
      const backendData = await backendResponse.text();
      setFeedbackData(backendData);
      console.log('feedback:', backendData);
    } catch (error) {
        console.error('Error:', error);
    }
  };


  useEffect(() => {
    if (messages.length > 1 && messages[messages.length - 1].user === 'user') {
      fetchGptFeedback();
    }
  }, [messages]);

  useEffect(() => {
    if (gptResponse === '') {
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { user: 'bot', text: "Working on the questions...." },
        ]);
      }, 1000);
      return;
    }
    const parsedResponse = JSON.parse(gptResponse)

    parsedResponse.questions.forEach(question => {
      setMessages(prevMessages => [
        ...prevMessages,
        { user: 'bot', text: question },
      ]);
    });
  }, [gptResponse]);


  useEffect(() => {
    if (feedbackData === '') {
      return;
    }
    const parsedFeedback = JSON.parse(feedbackData)
    console.log('parsedFeedback:', parsedFeedback);
    setMessages(prevMessages => [
      ...prevMessages,
      { user: 'bot', text: parsedFeedback.feedback },
    ]);
  
  }, [feedbackData]);

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
