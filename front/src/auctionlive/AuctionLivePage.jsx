import { useLocation, useNavigate } from 'react-router-dom';
import { createContext, useRef, useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import { useParams } from "react-router-dom";
import * as StomJs from "@stomp/stompjs";
import { jwtDecode } from "jwt-decode";
import AuctionButton from '../components/auction/AuctionButton';
import { auctionlist, getAuthor } from '../API';
import WebCam from '../components/docent/WebCam';
import AuctionLiveContents from '../components/auction/AuctionLiveContents';


export const AuctionLiveContext = createContext();
export default function AuctionLivePage() {
  // auctionId로 열어주기 : 지금은 일단 임의로 설정 => 추후엔 auction_id?
  const auctionId = "bid";

  const navigate = useNavigate();
  const {pathName, setPathName} = useContext(AppContext);
  const [nickname, setNickname] = useState("");
  

  let auctionList = [];
  // const [auctionList, setAuctionList] = useState([]);
  // auctionlist()
  // .then(auctionData => {
  //   console.log(auctionData);
  //   setAuctionList(auctionData)
  // })
  // .catch(e =>{
  //   console.log("경매 정보를 찾을 수 없습니다.", e);
  // })

  useEffect(() => {
    connect();
    // return () => disconnect();
    // 경매 정보 불러오기
    auctionlist()
    .then(auctionData => {
      auctionList.push(...auctionData);
      console.log(auctionList)
    })
    .catch(e =>{
      console.log("경매 정보를 찾을 수 없습니다.", e);
    })
  }, [pathName]);

  console.log(auctionList)

  // 채팅
  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0); // 현재가를 저장할 상태 추가
  const [currentBidUser, setCurrentBidUser] = useState("아직 응찰이 없습니다.");

  const client = useRef({});
  const decodedToken = useRef(jwtDecode(window.localStorage.getItem('token')));

  const connect = () => {
    client.current = new StomJs.Client({
      brokerURL: "ws://localhost:8080/api/ws",
      // brokerURL: "wss://i10d105.p.ssafy.io/api/ws",
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
      destination: "/pub/auctionbid/" + auctionId,
      body: JSON.stringify({
        sessionId: auctionId,
        nickname: nickname,
        askingprice: chat,
      }),
    });
    setChat("");
  };

  const disconnect = () => {
    client.current.deactivate();
  };



  useEffect(()=>{
    return()=> {
      // if (window.performance && window.performance.navigation.type == 2) {
      //   alert('뒤로가기')
      // }
      // if (!window.location.pathname.includes('/docent/')) {
      //   if (!window.confirm('도슨트를 종료하시겠습니까?')) {
      //     navigate({pathName})
      //   }
      // }
      setPathName(window.location.pathname)
    }
  }, [navigate])

  // 클릭된 메뉴
  const [mic, setMic] = useState(false);  // false: off / true: on
  const [cam, setCam] = useState(false);

  return(
    <AuctionLiveContext.Provider value={{mic, setMic, cam, setCam, setChat, publish, chatList, chat, nickname, currentPrice, currentBidUser}}>
      <div style={{display:"flex", width:"100%", height:"100vh", backgroundColor:"#5f5f5f"}}>
        <div style={{flex:"24", width:"100%", display:"flex", flexDirection:"column"}}>

          {/* 8:1 -> 8 (WebCam, DocentContent) */}
          <div style={{flex:"8", display:"flex", padding:"1vw"}}>
            {/* <div style={{flex:"2"}}><WebCam MysessionId={auctionId} myUserName={nickname} /></div> */}
            <div><AuctionLiveContents/></div>
          </div>
          <div style={{flex:"1"}}><AuctionButton/></div>

        </div>
      </div>
    </AuctionLiveContext.Provider>
    
  )
};
