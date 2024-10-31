import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ channels, setSelectedChat, onCreateChannel }) => {
  const [showChannels, setShowChannels] = useState(true);
  const [showDirectMessages, setShowDirectMessages] = useState(true);
  const [newChannelName, setNewChannelName] = useState('');

  const users = ['Alice', 'Bob', 'Charlie'];

  const handleCreateChannel = () => {
    if (newChannelName.trim() !== '') {
      onCreateChannel(newChannelName);
      setNewChannelName('');
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h2 onClick={() => setShowChannels(!showChannels)}>
          Channels {showChannels ? '▲' : '▼'}
        </h2>
        {showChannels && (
          <ul>
            {channels.map(channel => (
              <li key={channel} onClick={() => setSelectedChat({ type: 'channel', name: channel })}>
                #{channel}
              </li>
            ))}
          </ul>
        )}
        <div className="create-channel">
          <input
            type="text"
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
            placeholder="New channel"
          />
          <button onClick={handleCreateChannel}>+</button>
        </div>
      </div>
      <div className="sidebar-section">
        <h2 onClick={() => setShowDirectMessages(!showDirectMessages)}>
          Direct Messages {showDirectMessages ? '▲' : '▼'}
        </h2>
        {showDirectMessages && (
          <ul>
            {users.map(user => (
              <li key={user} onClick={() => setSelectedChat({ type: 'direct', name: user })}>
                {user}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;