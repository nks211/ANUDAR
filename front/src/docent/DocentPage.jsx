import { useLocation, useNavigate } from 'react-router-dom';
import { createContext, useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import WebCam from '../components/docent/WebCam';
import DocentContents from '../components/docent/DocentContents';
import DocentTab from '../components/docent/DocentTab';
import DocentButton from '../components/docent/DocentButton';

export const DocentContext = createContext();
export default function DocentPage(){
  const docentId = useLocation().pathname.split('/').pop();

  const navigate = useNavigate();
  const {pathName, setPathName} = useContext(AppContext);

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
            <div style={{flex:"2"}}><WebCam /></div>
            <div style={{flex:menu==="close"?"0":"1"}}><DocentContents/></div>
          </div>
          <div style={{flex:"1"}}><DocentButton/></div>

        </div>
        <div style={{flex:"1"}}><DocentTab/></div>
      </div>
      
    </DocentContext.Provider>
  )
}