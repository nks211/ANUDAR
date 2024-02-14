import { React, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import Notice, { UptoDate } from "../notice/notice.jsx";
import Login from "../signup/login.jsx";
import { AppContext } from "../App.js";
import Modal from "react-modal";
import { mainstate, popupstate } from "../StateManagement.jsx";
import { getnotices, deletenotice, getAllExhibitList } from "../API.jsx";

export default function NavBar() {
  const navigate = useNavigate();
  const { modalsetting } = useContext(AppContext);
  
  const localtab = localStorage.getItem("currenttab");
  const [navtab, setnavtab] = useState(localtab != null ? localtab : "");
  const loginpopup = popupstate((state) => state.homepopup);
  const setloginpopup = popupstate((state) => state.sethomepopup);
  const setnoticepopup = popupstate((state) => state.sethomenoticepopup);

  // getSnapshot 오류 ..?
  const isLogin = mainstate((state) => state.isLogin)
  const setIsLogin = mainstate((state) => state.setIsLogin)
  const loginUser = mainstate((state) => state.loginuser)
  const setloginUser = mainstate((state) => state.setloginuser)
  const logintoken = mainstate((state) => state.logintoken)
  const setlogintoken = mainstate((state) => state.setlogintoken)
  const tabbar = mainstate((state) => state.tabbar)


  // 로그인패널
  const noticepopup = popupstate((state) => state.homenoticepopup);
  const noticelist = mainstate((state) => state.noticelist);
  const setnoticelist = mainstate((state) => state.setnoticelist);
  const checknotice = mainstate((state) => state.noticecheck);
  
  function LoginPanel() {
    return (
      <div>
      <div onClick={() => { setnoticepopup(!noticepopup) }}>{isLogin ?
        (noticelist.length > 0 ?
          <img className="noti" src="../../asset/noti_on.png" />
          : <img className="noti" src="../../asset/noti_off.png" />) : ""}
      </div>
      <div>{isLogin ?
        <img width="45px" height="45px" className="mypage" src={loginUser.image?loginUser.image:"../../asset/avatar.png"} onClick={() => { navigate("/user/info"); localStorage.setItem("currenttab", ""); window.scrollTo(0, 0) }} /> : ""}
      </div>
      <div style={{ zIndex: 5, position: "absolute", left: "10px", top: "50px", display: noticepopup ? "block" : "none" }}>
        {noticelist.length > 0 ? Object.values(noticelist).map((notice, i) => <div onClick={async () => { const result = await deletenotice(notice.id, logintoken); if (result != "") checknotice(notice) }}><Notice key={i} title={notice.name} type={notice.notifyType} details={notice.content}/></div>) : UptoDate()}
      </div>
    </div>
    )
  }

  const mynotices = async () => await getnotices(logintoken);

  useEffect(() => {
    setnoticelist(mynotices);

    // 로그인 토큰 만료 시간 경과 시 자동 로그아웃 처리됨
    if (localStorage.getItem("tokentime")) {
      const logtime = Date.now() - localStorage.getItem("tokentime");
      if (logtime >= 60 * 60 * 1000) {
        setIsLogin(false); setnoticepopup(false); 
        localStorage.setItem("login", false); 
        localStorage.setItem("currenttab", ""); 
        localStorage.removeItem("token");
        localStorage.removeItem("tokentime"); 
        localStorage.removeItem("userdata"); 
        navigate("/"); window.scrollTo(0, 0);
      }
    }
  }, []);

  if (window.location.pathname.includes('/docent')) { 
    return (<div></div>);
  }
  if (window.location.pathname.includes('/now')) {
    return (<div></div>);
  }



  // if (window.location.pathname.includes('/docent')) {
  //   return (<div>{LoginPanel(imagedata, noticelist)}</div>);
  // }






  return (
    <div id="nav">
      <div className="area">
        <div className="logo" onClick={() => { setnavtab(""); localStorage.setItem("currenttab", ""); navigate("/"); window.scrollTo(0, 0); }}>ANUDAR</div>
        <div className="sector">
          {LoginPanel()}
          <div className={isLogin ? "login" : "logout"}>
            <button onClick={isLogin ? () => { navigate("/user/info"); window.scrollTo(0, 0); } : () => { setloginpopup(true); }} style={{ border: 0, backgroundColor: "transparent" }} className="loginbutton">{isLogin ? loginUser.nickname + " 님" : "로그인"}</button>
            <div className="line"> |  </div>
            <button onClick={
              isLogin ? 
                () => { 
                  setIsLogin(false)
                  setloginUser({})
                  setlogintoken("")
                  setnoticepopup(false); 

                  localStorage.setItem("login", false); 
                  localStorage.setItem("currenttab", ""); 
                  localStorage.removeItem("token"); 
                  localStorage.removeItem("userdata"); 
                  navigate("/"); window.scrollTo(0, 0); 
                  } : 
                () => { navigate("/user/join"); window.scrollTo(0, 0); }} 
              style={{ border: 0, backgroundColor: "transparent" }} className="signbutton">{isLogin ? "로그아웃" : "회원가입"}
            </button>  
          </div>
        </div>
      </div>
      <div className="nav">
        <div onClick={() => { setnavtab(tabbar[0]); localStorage.setItem("currenttab", tabbar[0]); navigate("/exhibit"); window.scrollTo(0, 0); }} className={navtab === tabbar[0] ? "selected" : "menu"}>전시회</div>
        <div onClick={() => { setnavtab(tabbar[1]); localStorage.setItem("currenttab", tabbar[1]); navigate("/artist"); window.scrollTo(0, 0); }} className={navtab === tabbar[1] ? "selected" : "menu"}>작가</div>
        <div onClick={() => { setnavtab(tabbar[2]); localStorage.setItem("currenttab", tabbar[2]); navigate("/work"); window.scrollTo(0, 0); }} className={navtab === tabbar[2] ? "selected" : "menu"}>작품</div>
        <div onClick={() => { setnavtab(tabbar[3]); localStorage.setItem("currenttab", tabbar[3]); navigate("/auction"); window.scrollTo(0, 0); }} className={navtab === tabbar[3] ? "selected" : "menu"}>경매</div>
      </div>
      <Modal isOpen={loginpopup} onRequestClose={() => { setloginpopup(false); }} style={modalsetting}><Login /></Modal>
    </div>
  );
}