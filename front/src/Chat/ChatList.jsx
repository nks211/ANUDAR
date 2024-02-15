import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [newChatRoomName, setNewChatRoomName] = useState('');

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/chat-rooms/all');
      setChatRooms(response.data);
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    }
  };

  const createChatRoom = async () => {
    try {
      await axios.post('http://localhost:8080/api/chat-rooms/create', { name: newChatRoomName });
      fetchChatRooms(); // 채팅방 생성 후 목록 갱신
      setNewChatRoomName('');
    } catch (error) {
      console.error('Error creating chat room:', error);
    }
  };

  return (
    <div>
      <h1>Chat Rooms</h1>
      <ul>
        {chatRooms.map(chatRoom => (
          <Link to={`/chat-rooms/list/${chatRoom.id}`}><li key={chatRoom.id}>{chatRoom.name}</li></Link>
        ))}
      </ul>         
      <div>
        <input
          type="text"
          value={newChatRoomName}
          onChange={(e) => setNewChatRoomName(e.target.value)}
          placeholder="Enter new chat room name"
        />
        <button onClick={createChatRoom}>Create Chat Room</button>
      </div>
    </div>
  );
};

export default ChatRoomList;
