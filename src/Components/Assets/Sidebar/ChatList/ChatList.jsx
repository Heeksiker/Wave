import React from 'react';
import './ChatList.css';

const ChatList = ({ chats, setSelectedChat }) => {
  return (
    <div className="chat-list">
      <h2>Chats</h2>
      <ul>
        {chats.map(chat => (
          <li key={chat.id} onClick={() => setSelectedChat(chat)}>
            <div className="chat-name">{chat.type === 'channel' ? `#${chat.name}` : chat.name}</div>
            <div className="chat-last-message">{chat.lastMessage}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;