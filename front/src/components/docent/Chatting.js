import React, { useContext } from "react";
import { DocentContext } from '../../docent/DocentPage'
import './DocentContents.css'
import ChatMessage from "./ChatMessage";

export default function Chatting() {
    const { setChat, publish, chatList, chat } = useContext(DocentContext);

    const handleChange = (event) => {
      // 채팅 입력 시 state에 값 설정
      setChat(event.target.value);
    };
  
    const handleSubmit = (event, chat) => {
      // 보내기 버튼 눌렀을 때 publish
      event.preventDefault();
      publish(chat);
    };

    return (
      <><div id="chatting">
        <div className={"chat-list"}>
          {chatList.map((chatItem, index) => (
            <div key={index}>
              <ChatMessage
              profileImg={chatItem.image}
              nickname={chatItem.nickname}
              message={chatItem.message}
              />
            </div>
          ))}
        </div>
      </div>
        <form onSubmit={(event) => handleSubmit(event, chat)}>
          <input placeholder="채팅을 입력하세요."
            type={"text"}
            name={"chatInput"}
            onChange={handleChange}
            value={chat} />
          <input type={"submit"} value={"입력"} />
        </form>
      </>
      );
}