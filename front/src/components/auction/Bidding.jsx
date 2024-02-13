import React, { useContext } from "react";
import { AuctionLiveContext } from '../../auctionlive/AuctionLivePage'
import { successbid } from "../../API";


export default function Bidding() {
    const { setChat, publish, chatList, chat, currentPrice, currentBidUser } = useContext(AuctionLiveContext);
  
  
    const handleChange = (event) => {
      // 채팅 입력 시 state에 값 설정
      setChat(event.target.value);
    };
  
    const handleSubmit = (event, chat) => {
      // 보내기 버튼 눌렀을 때 publish
      event.preventDefault();
      if (!isNaN(chat) && chat > currentPrice) {
        console.log('응찰이 완료되었습니다.');
        publish(chat);
      }
      else {
        console.log('현재가보다 높은 가격으로 응찰해주십시오.');
        alert('현재가보다 높은 가격으로 응찰해주십시오.');
      }
    };
    return (
      <div>
      <div>
        <p>응찰자 : {currentBidUser}</p>
        <p>현재가 : {currentPrice}</p>
      </div>
      <div className={"chat-list"}>
        {chatList.map((chatItem, index) => (
          <div key={index}>
            <p>
              {chatItem.nickname}님이 {chatItem.askingprice}원을 응찰하였습니다!
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={(event) => handleSubmit(event, chat)}>
        <div>
          <input
            type={"text"}
            name={"chatInput"}
            onChange={handleChange}
            value={chat}
          />
        </div>
        <input type={"submit"} value={"응찰하기"} />
      </form>
      <button onClick={() =>successbid(currentPrice, 2, currentBidUser, 1)}>낙찰하기</button>
    </div>
    );
  };
