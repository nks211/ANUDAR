import React, { useContext } from "react";
import { DocentContext } from '../../docent/DocentPage'


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
    <div>
      <div className={"chat-list"}>
        {chatList.map((chatItem, index) => (
          <div key={index}>
            <p>{chatItem.username} : {chatItem.message}</p>
          </div>
        ))}
      </div>
      <div id="chatInput">      
        <form onSubmit={(event) => handleSubmit(event, chat)}>
        <div>
          <input placeholder="채팅을 입력하세요."
            type={"text"}
            name={"chatInput"}
            onChange={handleChange}
            value={chat}
          />
        </div>
        <input type={"submit"} value={"입력"} />
      </form>
      </div>

    </div>
  );
};