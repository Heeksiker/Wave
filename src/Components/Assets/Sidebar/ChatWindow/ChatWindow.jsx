import React, { useState, useRef } from 'react';
import './ChatWindow.css';

const ChatWindow = ({ selectedChat }) => {
  const [messages, setMessages] = useState([
    { user: 'Alice', text: 'Hello everyone!' },
    { user: 'Bob', text: 'Hi Alice!' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() || image) {
      const newMsg = { user: 'You', text: newMessage, image: image ? URL.createObjectURL(image) : null };
      setMessages([...messages, newMsg]);
      setNewMessage('');
      setImage(null);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  if (!selectedChat) {
    return <div className="chat-window">Select a chat to start messaging</div>;
  }

  return (
    <div className="chat-window">
      <h2>Chat: #{selectedChat.name}</h2>
      <div className="messages-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <strong>{msg.user}:</strong> {msg.text}
              {msg.image && <img src={msg.image} alt="uploaded" className="message-image" />}
            </div>
          ))}
        </div>
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message"
        />
        <div className="fileUploadWrapper">
          <label onClick={handleImageClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 337 337">
              <circle
                strokeWidth="20"
                stroke="#6c6c6c"
                fill="none"
                r="158.5"
                cy="168.5"
                cx="168.5"
              ></circle>
              <path
                strokeLinecap="round"
                strokeWidth="25"
                stroke="#6c6c6c"
                d="M167.759 79V259"
              ></path>
              <path
                strokeLinecap="round"
                strokeWidth="25"
                stroke="#6c6c6c"
                d="M79 167.138H259"
              ></path>
            </svg>
            <span className="tooltip">Add an image</span>
          </label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button onClick={handleSendMessage} id="sendButton">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
            <path
              fill="none"
              d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
            ></path>
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="33.67"
              stroke="#6c6c6c"
              d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;