import { useLocation, useNavigate } from 'react-router-dom';
import { createContext, useRef, useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import WebCam from '../components/docent/WebCam';
import DocentContents from '../components/docent/DocentContents';
import DocentTab from '../components/docent/DocentTab';
import DocentButton from '../components/docent/DocentButton';
import axios from 'axios';

// 웹소켓 설정
import * as StomJs from "@stomp/stompjs";
import { mainstate } from '../StateManagement'; 

export const DocentContext = createContext();
export default function DocentPage(){
  const docentId = useLocation().pathname.split('/').pop();
  // const username = "host";

  const navigate = useNavigate();
  const {pathName, setPathName} = useContext(AppContext);
  const [docentVideoAvailable, setDocentVideoAvailable] = useState(true);
  const [videoUrl, setVideoUrl] = useState(null);
  const [username, setUsername] = useState(null);
  // 로그인한 유저의 정보
  const loginuser = mainstate((state) => (state.loginuser))

  useEffect(() => {
    axios.get('https://i10d105.p.ssafy.io/api/exhibit/docent/'+docentId)
      .then(response => { // 도슨트 영상이 있음!
        if(response.status === 200) {
          setDocentVideoAvailable(true)
          setVideoUrl(response.data);
        }
      })
      .catch(error => { // 도슨트 영상이 없음!
        console.log(error)
        setDocentVideoAvailable(false)
      })

      axios.get('https://i10d105.p.ssafy.io/api/exhibit/'+docentId+'/author')
        .then(response => {
          console.log(response.data);
          const username = JSON.parse(localStorage.getItem('userdata')).username
          console.log(username)
          if(username === response.data) {
            setUsername('host');
          }else {
            setUsername(JSON.parse(localStorage.getItem('userdata')).nickname)
          }
        })
        .catch(error => {
          console.log(error)
        })

      return () => {
        setPathName(window.location.pathname);
      };
  },[username])

  // 채팅
  useEffect(() => {
    connect();
    return () => disconnect(); // 이거 수정해봄
  }, [pathName]);

  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState("");

  const client = useRef({});

  const connect = () => {
    client.current = new StomJs.Client({
      // brokerURL: "ws://localhost:8080/api/ws",
      brokerURL: "wss://i10d105.p.ssafy.io/api/ws",
      onConnect: () => {
        console.log("success");
        console.log(docentId);
        subscribe();
      },
      connectHeaders : {
        Authorization: window.localStorage.getItem('token'),
      },
    });
    client.current.activate();
  };

  const subscribe = () => {
    client.current.subscribe("/sub/chat/" + docentId, (body) => {
      const json_body = JSON.parse(body.body);
      console.log(body.body);
      setChatList((_chat_list) => [..._chat_list, json_body]);
    });
  };

  const publish = (chat) => {
    if (!client.current.connected) return;

    client.current.publish({
      destination: "/pub/chat/" + docentId,
      body: JSON.stringify({
        sessionId: docentId,
        nickname: loginuser.nickname,
        message: chat,
        image: JSON.parse(localStorage.getItem('userdata')).image
      }),
    });
    setChat("");
  };

  const disconnect = () => {
    client.current.deactivate();
  };


  // 클릭된 메뉴
  const [menu, setMenu] = useState();
  const [mic, setMic] = useState(false);  // false: off / true: on
  const [cam, setCam] = useState(false);

  return(
    <DocentContext.Provider value={{menu, setMenu, mic, setMic, cam, setCam, setChat, publish, chatList, chat}}>
      {/* <div style={{display:"flex", width:"100%", height:"100vh", backgroundColor:"black"}}> */}
      <div style={{display:"flex", width:"100%", height:"100vh", backgroundColor:"#5f5f5f"}}>
        <div style={{flex:"24", width:"100%", display:"flex", flexDirection:"column"}}>

          {/* 8:1 -> 8 (WebCam, DocentContent) */}
          <div style={{flex:"8", display:"flex", padding:"1vw"}}>
            <div style={{ flex: "2" }}>
              {docentVideoAvailable ?
                (<video src={videoUrl} width="840" height="560" controls autoPlay muted></video>) 
              : username && (<WebCam MysessionId={docentId} myUserName={username} />)}
            </div>
            <div style={{flex:menu==="close"?"0":"1"}}><DocentContents/></div>
          </div>
          <div style={{flex:"1"}}><DocentButton/></div>

        </div>
        <div style={{flex:"1"}}><DocentTab/></div>
      </div>
      
    </DocentContext.Provider>
  )
}