import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    // WebSocket 연결
    const socket = new SockJS('http://localhost:8080/api/chat/send/ws');
    const stomp = Stomp.over(socket);
    setStompClient(stomp);

    stomp.connect({}, () => {
      // 특정 주제에 구독
      stomp.subscribe('/topic/public', receivedMessage => {
        // 메시지 수신 시 처리
        const parsedMessage = JSON.parse(receivedMessage.body);
        setMessages(prevMessages => [...prevMessages, parsedMessage]);
      });
    });

    return () => {
      // 컴포넌트 언마운트 시 WebSocket 연결 해제
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []); // 최초 렌더링 시에만 실행

  const sendMessage = () => {
    if (stompClient && message.trim() !== '') {
      // 서버로 메시지 전송
      stompClient.send('/app/chat/send', {}, JSON.stringify({ content: message }));
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{`${msg.sender}: ${msg.content}`}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatApp;
