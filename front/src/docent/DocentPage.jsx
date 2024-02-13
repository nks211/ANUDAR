import { useLocation, useNavigate } from 'react-router-dom';
import { createContext, useRef, useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import { useParams } from "react-router-dom";
import * as StomJs from "@stomp/stompjs";
import { jwtDecode } from "jwt-decode";
// import WebCam from '../components/docent/WebCam';
import DocentContents from '../components/docent/DocentContents';
import DocentTab from '../components/docent/DocentTab';
import DocentButton from '../components/docent/DocentButton';
import axios from 'axios';
import { mainstate } from '../StateManagement'; 

export const DocentContext = createContext();
export default function DocentPage(){
  const docentId = useLocation().pathname.split('/').pop();
  const username = "host";

  const navigate = useNavigate();
  const {pathName, setPathName} = useContext(AppContext);
  const loginuser = mainstate((state) => (state.loginuser))


    useEffect(() => {
    connect();
    // return () => disconnect();
  }, [pathName]);

  // 채팅
  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState("");

  const client = useRef({});
  const decodedToken = useRef(jwtDecode(window.localStorage.getItem('token')));

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

  const [docentVideoAvailable, setDocentVideoAvailable] = useState(true);
  const [videoUrl, setVideoUrl] = useState(null);
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

      return () => {
        setPathName(window.location.pathname);
      };
  },[])

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
            {/* <div style={{ flex: "2" }}>
              {docentVideoAvailable ?
                (<video src={videoUrl} width="840" height="560" controls autoPlay muted></video>) 
              : (<WebCam MysessionId={docentId} myUserName={username} />)}
            </div> */}
            <div style={{flex:menu==="close"?"0":"1"}}><DocentContents/></div>
          </div>
          <div style={{flex:"1"}}><DocentButton/></div>

        </div>
        <div style={{flex:"1"}}><DocentTab/></div>
      </div>
      
    </DocentContext.Provider>
  )
}