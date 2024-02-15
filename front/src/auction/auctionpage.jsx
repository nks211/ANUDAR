import { React, createContext, useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import * as StomJs from "@stomp/stompjs";
import { auctionlist, successbid, getUserPoints, reducePoint } from '../API';
import { mainstate } from '../StateManagement';
import AuctionCam from '../components/auction/AuctionCam';
import "./auctionpage.css";

export const AuctionLiveContext = createContext();
export default function AuctionPage() {

  const navigate = useNavigate();

  const { pathName, setPathName } = useContext(AppContext);
  const [inputopen, setInputOpen] = useState(true);

  const [timer, setTimer] = useState(10);
  const [username, setUsername] = useState("");


  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState("");

  const [countAuctions, setCountAuctions] = useState(0);
  const [nowAuction, setNowAuction] = useState(1);
  const [isBidding, setIsBidding] = useState(false);
  const [nowPoint, setNowPoint] = useState(0);

  const [isChecking, setIsChecking] = useState(false); // 상품 설명을 했는지 체크



  const timeset = () => {
    if (timer < 10) return `00:0${timer}`
    else if (timer < 60) return `00:${timer}`
    else return `01:00`
  }

  const test = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]; // 테스트 작품 데이터

  // 관리자 계정인지 확인하는 함수
  const isadmin = () => {
    return localStorage.userdata && localStorage.userdata.username === "admin1234" ? true : false;
  };

  // 응찰이 없었다면 유찰되었습니다. 띄우기
  const bidcomplete = () => {
    // 경매 끝나면 쫓아내기
    if (nowAuction >= countAuctions) {
      alert("경매가 종료되었습니다.");
      setNowAuction(1); // 지금은 이렇게 바꿔두기
      console.log(nowAuction);
      navigate(-1);
      return
    }
    if (currentBidUser === "") {
      alert("작품이 유찰되었습니다.");
    }
    // 낙찰된 경우 => 내가 낙찰 받았다면 던지기
    else {
      alert(`${currentBidUser}님께 ${currentPrice}만원에 낙찰되었습니다.`);

      // 내가 낙찰자라면 낙찰에 쏘기
      if (userdata.nickname === currentBidUser){
        successbid(currentPrice, auctionList[nowAuction-1]?.id, currentBidUser, 1); // 임의로 설정
        // 포인트도 차감
        reduceMyPoint(token, currentPrice, auctionList[nowAuction-1]?.id, currentBidUser, 1);
        console.log(currentPrice, auctionList[nowAuction-1]?.id, currentBidUser, 1);
      }

    }
    // setCurrentPrice(auctionList[nowAuction]?.price) // 다음 작품의 초기 값
    // setCurrentBidUser("");
    // publish(0);
    client.current.publish({
      destination: "/pub/auctionbid/" + auctionId,
      body: JSON.stringify({
        sessionId: auctionId,
        nickname: "",
        askingprice: auctionList[nowAuction]?.price / 10000,
        workId: auctionList[nowAuction - 1]?.id,
        nowNumber : nowAuction + 1,
        countNumber : countAuctions
      }),
    });
    setChat("");
    subscribe();
    setIsBidding(false);
    setTimer(10);
  }

  useEffect(() => {
    const Timer = setInterval(() => {
      setTimer((count) => count - 1);
    }, 1000);

    // 조건을 걸기  => 상품 설명을 안했다면 30초
    // if (timer === 0 && !isChecking) {
    //   clearInterval(Timer);
    //   setTimer(30); // 상품 체크 30초
    //   setIsChecking(true);
    //   // bidcomplete();
    // } else if (timer === 0 && isChecking) {
    //   clearInterval(Timer);
    //   setIsChecking(false);
    //   bidcomplete();
    // }
    if (timer === 0){
      clearInterval(Timer);
      bidcomplete();
    }

    return () => {
      setPathName(window.location.pathname);
      clearInterval(Timer);
    }
  }, [navigate, timer]);

  // 경매
  // auctionId로 열어주기 : 지금은 일단 임의로 설정 => 추후엔 auction_id?
  const auctionId = "bid";
  const userdata = JSON.parse(localStorage.userdata);

  if (userdata == null) navigate("/");

  // 경매에 올릴 작품
  const [auctionList, setAuctionList] = useState([]);
  const [initialdata, setInitialData] = useState(0);

  async function getAuction() {
    try {
      const res = await auctionlist()
      setAuctionList(res)
      setCountAuctions(res.length)
      setCurrentPrice(res[nowAuction-1].price / 10000);
      setInitialData(res[nowAuction-1].price / 10000);
      
    } catch (err) {
      console.log('경매 정보를 찾을 수 없습니다.')
    }
  }

  // 포인트 조회
  const token = window.localStorage.getItem('token');
  async function userPoint() {
    try {
      const res = await getUserPoints(token);
      setNowPoint(res)
      console.log(res)
    } catch (err) {
      console.log("포인트를 찾을 수 없습니다.")
    }
  }

  // 포인트 차감
  async function reduceMyPoint(token, finalPrice, workId, nickname, auctionId){
    try {
      const res = await reducePoint(token, finalPrice, workId, nickname, auctionId);
      console.log(res);
      setNowPoint(res);
    } catch (err) {
      console.log("포인트 차감 오류 발생")
    }
  }
  
  useEffect(()=>{
    getAuction()
    connect()
    userPoint()
    return () => disconnect()
  }, [pathName])

  const [currentPrice, setCurrentPrice] = useState(0); // 현재가를 저장할 상태 추가
  const [currentBidUser, setCurrentBidUser] = useState("");


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
      connectHeaders: {
        Authorization: window.localStorage.getItem('token'),
      },
    });
    client.current.activate();
  };

  const subscribe = () => {
    client.current.subscribe("/sub/auctionbid/" + auctionId, (body) => {
      const json_body = JSON.parse(body.body);
      console.log(body.body)
      // 경매 중 입장 시 현재 응찰자와 현재가 보여주는 경우 추가하지 않기 위함
      if (json_body.askingprice !== 0) {
        setChatList((_chat_list) => [json_body, ..._chat_list]);
      }

      // 현재가 갱신 로직
      const currentPrice = json_body.currentBid;
      const currentBidUser = json_body.currentBidUser;
      console.log(auctionList );
      // ===여기가 굉장히 문제================================================================
      if (currentPrice > initialdata) {
        setIsBidding(true);
      };
      setCurrentPrice(currentPrice);
      setCurrentBidUser(currentBidUser);
      setNowAuction(json_body.nowNumber)
      console.log(json_body.nowNumber);
      console.log(currentPrice);

      setTimer(10);
    });
  };

  const publish = (chat) => {
    if (!client.current.connected) return;
    client.current.publish({
      destination: "/pub/auctionbid/" + auctionId,
      body: JSON.stringify({
        sessionId: auctionId,
        nickname: userdata.nickname,
        askingprice: chat,
        workId: auctionList[nowAuction - 1]?.id,
        nowNumber : nowAuction,
        countNumber : countAuctions
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
    // 응찰한 값이 내가 가진 포인트보다 작거나 같은 경우에만 통과
    if (chat <= nowPoint) { 
      // 현재가 보다 높은 값을 응찰한 경우에만
      if (!isNaN(chat) && chat > currentPrice) {
        setTimer(10); 
        publish(chat);
        setIsBidding(true);
        setChat("");
      }
      else {
        alert('현재가보다 높은 가격으로 응찰해주십시오.');
        setChat("");
      }
    } else {
      alert("포인트가 부족합니다.");
    }

  };


  useEffect(() => {
    // setInputValue(inputvalue);
    setUsername(JSON.parse(localStorage.getItem('userdata')).nickname);
    return () => {
        setPathName(window.location.pathname);
    }
  }, [username])

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh", backgroundColor: "#5f5f5f" }}>
      <div style={{ zIndex: "10", backgroundColor: "#ffffff", borderRadius: "20px", width: "100%", margin: "20px", padding: "20px", display: "flex", flex: "24" }}>
        <div style={{ display: "flex", flex: "7", backgroundColor: "rgb(200, 200, 192)", flexDirection: "column", padding: "30px", margin: "20px", borderRadius: "30px" }}>
          <form onSubmit={(event) => handleSubmit(event, chat)}>
            <div style={{ zIndex: "20", position: "absolute", display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "28%", height: "150px", backgroundColor: "#ffffff80", borderRadius: "20px", padding: "10px", margin: "10px" }}>
              <div style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                <div className="auctiontitle" style={{ display: "flex", justifyContent: "space-between", padding: "0px 20px", }}>
                  <div>경매 <span style={{ fontSize: "28px", color: "976E76", fontWeight: "700", textAlign: "start", }}>{nowAuction}</span>/{countAuctions} 진행중</div>
                  <div style={{ textAlign: "end", fontSize: "16px", margin: "10px" }}>남은 시간 :   {timeset()}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", margin: "0px 20px" }}>
                  <div>현재 입찰 가격</div>
                  <div style={{ fontSize: "20px", color: "#ff0000" }}>{currentPrice}만원</div>
                </div>
              </div>
              <div style={{ width: "50%", height: "80%", padding: "10px", border: "3px #976e76 solid", borderRadius: "10px", display: "flex", alignItems: "end", textAlign: "start", fontSize: "18px", flexFlow: "row wrap", overflowY: "hidden" }}>
                {isBidding ? (
                  <p>{currentBidUser}님이 {currentPrice}만원을 응찰하였습니다.</p>
                ) : (
                  <p>아직 응찰이 없습니다.</p>
                )}
                
              </div>
            </div>

            {/* 경매 진행자 웹캠 컴포넌트 부분 */}
            <div style={{ marginTop: "200px", width: "100%", height: "450px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              {username && (<AuctionCam sessionId={'auction'} username={username}></AuctionCam>)}
            </div>

            {/* 금액 입력 및 보내기 부분 */}
            <div style={{ zIndex: "20", display: inputopen ? "flex" : "none", justifyContent: "space-between", alignItems: "flex-end", width: "100%", height: "100px", padding: "10px 20px" }}>
              <input type="number" style={{ width: "40%", height: "40px", border: "5px #976E76 solid", borderRadius: "20px", padding: "10px", fontSize: "20px" }} value={chat? chat : ""} onChange={handleChange} placeholder="금액을 입력하세요" />
              <div>잔여 포인트 : {nowPoint} 포인트</div>
              <button style={{ width: "200px", height: "60px", backgroundColor: "#976E76", display: "flex", justifyContent: "center", alignItems: "center", color: "#ffffff", fontSize: "20px", borderRadius: "20px", margin: "0px 40px", border: 0,  cursor: "pointer" }}>응찰하기</button>
            </div>
          </form>
          <button onClick={()=>{bidcomplete()}}>낙찰</button>
        </div>
        <div style={{ display: "flex", flex: "5", flexDirection: "column", backgroundColor: "#B7C4CF", padding: "30px", margin: "20px", borderRadius: "30px" }}>
          <div style={{ width: "800px", height: "800px", margin: "20px 0px", pointerEvents: isadmin() ? "auto" : "none" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div >
                <img style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "500px", height: "500px" }} src={auctionList[nowAuction-1]?.image} alt="" /> 
              </div>
            </div>
            <div>
              <div style={{  fontSize: "30px", margin: "30px" }}>{auctionList[nowAuction-1]?.author} 작가의 {auctionList[nowAuction-1]?.title}</div>
            </div>
            <div></div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <div style={{ display: "flex", justifyContent: "right", alignItems: "center", flex: "1", }}>
              <div id="auctionButton" style={{ width: "130px", height: "100px", margin: "10px", borderRadius: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img onClick={() => { if (window.confirm('경매 페이지를 종료하시겠습니까?') === true) { navigate(-1) } }} src="../../asset/leave.png"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}