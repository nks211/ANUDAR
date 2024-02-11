import { useLocation, useNavigate } from 'react-router-dom';
import { createContext, useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import WebCam from '../components/docent/WebCam';
import DocentContents from '../components/docent/DocentContents';
import DocentTab from '../components/docent/DocentTab';
import DocentButton from '../components/docent/DocentButton';
import axios from 'axios';

export const DocentContext = createContext();
export default function DocentPage(){
  const docentId = useLocation().pathname.split('/').pop();
  const username = "host";

  const navigate = useNavigate();
  const {pathName, setPathName} = useContext(AppContext);
  const [docentVideoAvailable, setDocentVideoAvailable] = useState(true);
  const [videoUrl, setVideoUrl] = useState(null);
  useEffect(() => {
    axios.get('https://i10d105.p.ssafy.io/api/docent/'+docentId)
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
    <DocentContext.Provider value={{menu, setMenu, mic, setMic, cam, setCam}}>
      {/* <div style={{display:"flex", width:"100%", height:"100vh", backgroundColor:"black"}}> */}
      <div style={{display:"flex", width:"100%", height:"100vh", backgroundColor:"#5f5f5f"}}>
        <div style={{flex:"24", width:"100%", display:"flex", flexDirection:"column"}}>

          {/* 8:1 -> 8 (WebCam, DocentContent) */}
          <div style={{flex:"8", display:"flex", padding:"1vw"}}>
            <div style={{ flex: "2" }}>
              {docentVideoAvailable ?
                (<video src={videoUrl} width="840" height="560" controls autoPlay muted></video>) 
              : (<WebCam MysessionId={docentId} myUserName={username} />)}
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