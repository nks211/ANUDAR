import React, { useRef, useState, useEffect } from "react";
// import auctionbidding from "./auctionbidding";
import { useParams } from "react-router-dom";
import * as StomJs from "@stomp/stompjs";
import { jwtDecode } from "jwt-decode";
import { getAuthor, successbid } from "../API";

function AuctionLivePage() {
  const [chatList, setChatList] = useState([]); // 회면에 표시될 채팅 기록
  const [chat, setChat] = useState(""); // 채널을 구분하는 식별자를 URL 파라미터로 받음
  const [currentPrice, setCurrentPrice] = useState(0); // 현재가를 저장할 상태 추가
  const [currentBidUser, setCurrentBidUser] = useState("아직 응찰이 없습니다.");
  const [nickname, setNickname] = useState("");

  const { apply_id } = useParams();
  const client = useRef({});
  const decodedToken = useRef(
    jwtDecode(window.localStorage.getItem("authorization"))
  );

  const connect = () => {
    // 연결시
    client.current = new StomJs.Client({
      // brokerURL: "ws://localhost:8080/api/ws",
      brokerURL: "wss://i10d105.p.ssafy.io/api/ws",
      onConnect: () => {
        console.log("success");
        console.log(apply_id);
        subscribe(); // 연결 성공 시 구독하는 로직 실행
      },
      connectHeaders: {
        Authorization: window.localStorage.getItem("authorization"),
      },
    });
    client.current.activate(); // 클라이언트 활성화
  };

  // 구독중인 채널에서 메시지가 왔을 때 처리
  const subscribe = () => {
    client.current.subscribe("/sub/auctionbid/" + apply_id, (body) => {
      const json_body = JSON.parse(body.body); // string으로 오기 때문에 JSON 사용하려면 파싱 필요
      console.log(body.body);
      setChatList((_chat_list) => [..._chat_list, json_body]); // 화면에 받은 메시지 표시

      // 현재가 갱신 로직
      const currentPrice = json_body.currentBid;
      const currentBidUser = json_body.currentBidUser;
      setCurrentPrice(currentPrice);
      setCurrentBidUser(currentBidUser);
      console.log(currentPrice);
    });
  };

  // 메시지 발행
  const publish = (chat) => {
    if (!client.current.connected) return;

    // 토큰 디코딩 후 사용자 정보 추출
    const username = decodedToken.current.username;
    console.log(username);

    // username으로 get 요청
    getAuthor(username)
    .then(userData => {
      setNickname(userData.nickname);
      console.log(userData.nickname);
    })
    .catch(e =>{
      console.log("회원 정보를 찾을 수 없습니다.", e);
    })

    client.current.publish({
      destination: "/pub/auctionbid/" + apply_id,
      body: JSON.stringify({
        sessionId: apply_id,
        nickname: nickname,
        askingprice: chat,
      }),
    });
    setChat("");
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const handleChange = (event) => {
    // 채팅 입력 시 state에 값 설정
    setChat(event.target.value);
  };

  const handleSubmit = (event, chat) => {
    // 보내기 버튼 눌렀을 때 publish
    event.preventDefault();
    publish(chat);
  };

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  

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
              {nickname}님이 {chatItem.askingprice}원을 응찰하였습니다!
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
      <button onClick={() =>successbid(currentPrice, 1, currentBidUser, 1)}>낙찰하기</button>
    </div>
  );
}

export default AuctionLivePage;
