import React from 'react';
import './ChatMessage.css'; // 스타일 시트 임포트

const ChatMessage = ({ profileImg, nickname, message }) => {
  return (
    <div className="chat-message">
      <img src={profileImg} alt="profile" className="profile-img" />
      <div className="message-content">
        <div className="nickname">{nickname}</div>
        <div className="message">{message}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
