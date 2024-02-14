import { React, createContext, useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import * as StomJs from "@stomp/stompjs";
import { auctionlist, successbid } from '../API';
import { mainstate } from '../StateManagement'; 
import "./auctionpage.css";

const test = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export const AuctionLiveContext = createContext();
export default function AuctionPage() {

    const navigate = useNavigate();

    const {pathName, setPathName} = useContext(AppContext);
    const [mic, setMic] = useState(false);  // false: off / true: on
    const [cam, setCam] = useState(false);
    const [screen, setScreen] = useState(false);
    const [timer, setTimer] = useState(60);
    const [auctionvalue, setAuctionValue] = useState(100000);
    const [inputvalue, setInputValue] = useState("");

    const timeset = () => {
        if (timer < 10) return `00:0${timer}`
        else if (timer < 60) return `00:${timer}`
        else return `01:00`
    }

    useEffect(() => {
        const Timer = setInterval(() => {
            setTimer((count) => count - 1);
        }, 1000);
        if (timer === 0) clearInterval(Timer)
        return () => {
            setPathName(window.location.pathname);
            clearInterval(Timer);
        }
    }, [navigate, timer]);

    // 경매
    // auctionId로 열어주기 : 지금은 일단 임의로 설정 => 추후엔 auction_id?
    const auctionId = "bid";
    const loginuser = mainstate((state) => (state.loginuser));

    // 경매에 올릴 작품
    let auctionList = [];

    useEffect(() => {
        connect();
        // 경매 정보 불러오기
        auctionlist()
        .then(auctionData => {
            auctionList.push(...auctionData);
            console.log(auctionList)
        })
        .catch(e =>{
            console.log("경매 정보를 찾을 수 없습니다.", e);
        })
        return () => disconnect();
      }, [pathName]);

    const [chatList, setChatList] = useState([]);
    const [chat, setChat] = useState("");
    const [currentPrice, setCurrentPrice] = useState(0); // 현재가를 저장할 상태 추가
    const [currentBidUser, setCurrentBidUser] = useState("아직 응찰이 없습니다.");

    const client = useRef({});
    const connect = () => {
        client.current = new StomJs.Client({
          // brokerURL: "ws://localhost:8080/api/ws",
          brokerURL: "wss://i10d105.p.ssafy.io/api/ws",
          onConnect: () => {
            console.log("success");
            console.log(auctionId);
            publish(0);
            subscribe();
          },
          connectHeaders : {
            Authorization: window.localStorage.getItem('token'),
          },
        });
        client.current.activate();
      };

      const subscribe = () => {
        client.current.subscribe("/sub/auctionbid/" + auctionId, (body) => {
          const json_body = JSON.parse(body.body);
          console.log(body.body);
          console.log(json_body.askingprice);
          if (json_body.askingprice !== 0) {
            setChatList((_chat_list) => [..._chat_list, json_body]);
          }
          
          // 현재가 갱신 로직
          const currentPrice = json_body.currentBid;
          const currentBidUser = json_body.currentBidUser;
          setCurrentPrice(currentPrice);
          setCurrentBidUser(currentBidUser);
          console.log(currentPrice);
        });
      };
    
      const publish = (chat) => {
        if (!client.current.connected) return;
        client.current.publish({
          destination: "/pub/auctionbid/" + auctionId,
          body: JSON.stringify({
            sessionId: auctionId,
            nickname: loginuser.nickname,
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
        <div style={{ display: "flex", width: "100%", height: "100vh", backgroundColor: "#5f5f5f" }}>
            <div style={{ zIndex: "10", backgroundColor: "#ffffff", borderRadius: "20px", width: "100%", margin: "20px" }}>
                <div className="auctiontitle" style={{ width: "300px", height: "50px", textAlign: "start", padding: "10px 20px", margin: "30px 20px", }}>
                    경매 <span style={{ fontSize: "28px", color: "976E76", fontWeight: "700" }}>{10}</span>/{30} 진행중
                </div>
                <div style={{ display: "flex", flexDirection: "column", flex: "25", height: "80vh", margin: "20px", }}>
                    <div style={{ display: "flex", flex: "24", padding: "1vw" }}>
                        <div style={{ display: "flex", flex: "8", margin: "0px 10px", padding: "40px", backgroundColor: "rgb(200, 200, 192)", borderRadius: "20px" }}>
                            경매 작품 목록...
                            <div>
                                
                            </div>
                            <div></div>
                        </div>
                        <div style={{ display: "flex", flex: "12", flexDirection: "column", margin: "-15px 10px", padding: "20px", backgroundColor: "white", borderRadius: "20px" }}>
                            <div style={{ display: "flex", flex: "11", borderRadius: "20px", backgroundColor: "#5f5f5f", color: "#ffffff", padding: "20px", }}>
                                경매 진행자 화면...
                            </div>
                            <div style={{ display: "flex", flex: "1", justifyContent: "space-between", margin: "20px 0px" }}>
                                <div style={{ width: "50%", height: "120%", backgroundColor: "#B7C4CF", borderRadius: "20px", display: "flex", flexDirection: "row", overflow: "hidden" }}>
                                {/* 응찰 */}
                                <div>
                                  <div>
                                    <p>응찰자 : {currentBidUser}</p>
                                    <p>현재가 : {currentPrice}</p>
                                  </div>
                                  <div>
                                    <p>
                                    {currentBidUser}님이 {currentPrice}만원을 응찰하였습니다.
                                    </p>
                                  </div>
                                  {/* <div className={"chat-list"}>
                                    {chatList.length > 0 && (
                                      <div>
                                        <p>
                                          {chatList[chatList.length - 1].nickname}님이{" "}
                                          {chatList[chatList.length - 1].askingprice}원을 응찰하였습니다!
                                        </p>
                                      </div>
                                    )}
                                </div> */}
                                  {/* <form onSubmit={(event) => handleSubmit(event, chat)}>
                                    <div>
                                      <input
                                        type={"text"}
                                        name={"chatInput"}
                                        onChange={handleChange}
                                        value={chat}
                                      />
                                    </div>
                                    <input type={"submit"} value={"응찰하기"} />
                                  </form> */}
                                  <button onClick={() =>successbid(currentPrice, 2, currentBidUser, 1)}>낙찰하기</button>
                                </div>
                                </div>


                                <form onSubmit={(event) => handleSubmit(event, chat)}>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                                    <div style={{ textAlign: "start", margin: "10px 0px" }}>남은 시간 <span style={{ fontSize: "30px" }}><b>{timeset()}</b></span></div>
                                    <div style={{ margin: "10px 0px" }}>경매가 <span style={{ color: "#ff0000", fontSize: "25px", fontWeight: "800" }}>{currentPrice}</span> KRW</div>
                                    <input type={"text"}
                                        name={"chatInput"}
                                        onChange={handleChange}
                                        value={chat} style={{ width: "100%", height: "30px", border: "1px #976E76 solid", borderRadius: "10px", padding: "5px" }} placeholder="금액을 입력하세요" />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "end" }}>
                                    <input type={"submit"} value={"응찰하기"} onClick={() => { setTimer(60); }} style={{ backgroundColor: "#976E76", color: "#ffffff", fontSize: "20px", width: "160px", height: "50px", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}/>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "1", }}>
                        <div id="auctionButton" style={{ width: "400px", height: "100px", margin: "10px", backgroundColor: "#967E76", borderRadius: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div onClick={()=>{setCam(!cam)}}>{cam?<img src="../../asset/cam_off.png"></img>:<img src="../../asset/cam_on.png"></img>}</div>
                            <div onClick={()=>{setMic(!mic)}}>{mic?<img src="../../asset/mic_off.png"></img>:<img src="../../asset/mic_on.png"></img>}</div>
                            <div onClick={()=>{setScreen(!screen)}}>{screen?<img src="../../asset/screen_off.png"></img>:<img src="../../asset/screen_on.png"></img>}</div>
                            <img onClick={()=>{if (window.confirm('경매 페이지를 종료하시겠습니까?') === true) { navigate(-1) }}} src="../../asset/leave.png"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}