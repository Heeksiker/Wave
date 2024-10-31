import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Sidebar from './Components/Assets/Sidebar/Sidebar/Sidebar';
import ChatList from './Components/Assets/Sidebar/ChatList/ChatList';
import ChatWindow from './Components/Assets/Sidebar/ChatWindow/ChatWindow';
import Home from './Components/Assets/Sidebar/Home/Home';
import Login from './Components/Assets/Sidebar/Register/Login';
import Register from './Components/Assets/Sidebar/Register/Register';
import SpotifyPlayer from './Components/Assets/Sidebar/SpotifyPlayer/SpotifyPlayer';
import Callback from './Components/Assets/Sidebar/SpotifyPlayer/Callback';
import './App.css';

const App = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [channels, setChannels] = useState(['general', 'random', 'development']);
  const [chats, setChats] = useState([
    { id: 1, name: 'general', lastMessage: 'Hello everyone!', type: 'channel', messages: [{ user: 'Alice', text: 'Hello everyone!' }] },
    { id: 2, name: 'random', lastMessage: 'Check this out!', type: 'channel', messages: [{ user: 'Bob', text: 'Check this out!' }] },
    { id: 3, name: 'development', lastMessage: 'Need help with code.', type: 'channel', messages: [{ user: 'Charlie', text: 'Need help with code.' }] },
    { id: 4, name: 'Alice', lastMessage: 'Hey, how are you?', type: 'direct', messages: [{ user: 'Alice', text: 'Hey, how are you?' }] },
    { id: 5, name: 'Bob', lastMessage: 'Let\'s catch up later.', type: 'direct', messages: [{ user: 'Bob', text: 'Let\'s catch up later.' }] },
    { id: 6, name: 'Charlie', lastMessage: 'Can you review my PR?', type: 'direct', messages: [{ user: 'Charlie', text: 'Can you review my PR?' }] },
  ]);

  const handleCreateChannel = (channelName) => {
    setChannels([...channels, channelName]);
    setChats([...chats, { id: chats.length + 1, name: channelName, lastMessage: '', type: 'channel', messages: [] }]);
  };

  const handleSendMessage = (chatId, message) => {
    const updatedChats = chats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, { user: 'You', text: message }],
          lastMessage: message,
        };
      }
      return chat;
    });
    setChats(updatedChats);
  };

  const RedirectToHome = () => {
    const navigate = useNavigate();
    useEffect(() => {
      navigate('/home');
    }, [navigate]);

    return null;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/spotify" element={<SpotifyPlayer />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/" element={<RedirectToHome />} />
        <Route path="/chat" element={
          <div className="app-container">
            <Sidebar channels={channels} setSelectedChat={setSelectedChat} onCreateChannel={handleCreateChannel} />
            <ChatList chats={chats} setSelectedChat={setSelectedChat} />
            <ChatWindow selectedChat={selectedChat} onSendMessage={handleSendMessage} />
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;