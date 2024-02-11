import { React, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import Notice, { UptoDate } from "../notice/notice.jsx";
import Login from "../signup/login.jsx";
import { AppContext } from "../App.js";
import Modal from "react-modal";
import { mainstate, popupstate } from "../StateManagement.jsx";

const LoginPanel = (image, notices) => {
  const navigate = useNavigate();

  const loginstatus = localStorage.getItem("login") === "true";
  const noticepopup = popupstate((state) => state.homenoticepopup);
  const setnoticepopup = popupstate((state) => state.sethomenoticepopup);
  const checknotice = mainstate((state) => state.noticecheck);

  if (window.location.pathname.includes('/docent')) { return <div></div> }

  // if (localdata) {
  //   console.log(`{
  //     id : ${localdata.username} \n
  //     password: ${localdata.password} \n
  //     name: ${localdata.name} \n
  //     nickname: ${localdata.nickname} \n
  //     email : ${localdata.email} \n
  //     image : ${localdata.image} \n
  //     phone : ${localdata.phone} \n
  //   }`)
  // }


  return (
    <div>
      <div onClick={() => { setnoticepopup(!noticepopup) }}>{loginstatus ?
        (notices.length > 0 ?
          <img className="noti" src="../../asset/noti_on.png" />
          : <img className="noti" src="../../asset/noti_off.png" />) : ""}
      </div>
      <div>{loginstatus ?
        <img width="45px" height="45px" onClick={() => { navigate("/user/info"); localStorage.setItem("currenttab", ""); window.scrollTo(0, 0) }} className="mypage" src={image} /> : ""}</div>
      <div style={{ zIndex: 5, position: "absolute", left: "10px", top: "50px", display: noticepopup ? "block" : "none" }}>
        {notices.length > 0 ? Object.values(notices).map((notice, i) => <div onClick={() => { checknotice(notice) }}><Notice key={i} title={notice.title} date={notice.date} details={notice.details} /></div>) : UptoDate()}

      </div>
    </div>
  );
}

export default function NavBar() {
  const navigate = useNavigate();
  const { modalsetting } = useContext(AppContext);

  const locallogin = localStorage.getItem("login") === "true";
  const localtab = localStorage.getItem("currenttab");
  const localtoken = localStorage.getItem("token");
  const localdata = JSON.parse(localStorage.getItem("userdata"));
  const [logincheck, setlogincheck] = useState(locallogin != null ? locallogin : false);
  const [loginuser, setloginuser] = useState(localtoken != null ? localdata : {});
  const [navtab, setnavtab] = useState(localtab != null ? localtab : "");
  const [imagedata, setimagedata] = useState(localdata != null ? localdata.image : "../../asset/avatar.png");
  const noticelist = mainstate((state) => state.noticelist);
  const loginpopup = popupstate((state) => state.homepopup);
  const setloginpopup = popupstate((state) => state.sethomepopup);
  const setnoticepopup = popupstate((state) => state.sethomenoticepopup);
  const tabbar = mainstate((state) => state.tabbar);

  useEffect(() => {
    if (locallogin) {
      setlogincheck(locallogin);
    }
    if (localtoken) {
      setloginuser(localdata);
      setimagedata(localdata.image);
    }
    // 로그인 토큰 만료 시간 경과 시 자동 로그아웃 처리됨
    if (localStorage.getItem("tokentime")) {
      const logtime = Date.now() - localStorage.getItem("tokentime");
      if (logtime >= 60 * 60 * 1000) {
        setlogincheck(false); setnoticepopup(false); 
        localStorage.setItem("login", false); 
        localStorage.setItem("currenttab", ""); 
        localStorage.removeItem("token");
        localStorage.removeItem("tokentime"); 
        localStorage.removeItem("userdata"); 
        navigate("/"); window.scrollTo(0, 0);
      }
    }
  });


  if (window.location.pathname.includes('/docent')) {
    return (<div>{LoginPanel(imagedata, noticelist)}</div>);
  }

  return (
    <div id="nav">
      <div className="area">
        <div className="logo" onClick={() => { setnavtab(""); localStorage.setItem("currenttab", ""); navigate("/"); window.scrollTo(0, 0); }}>ANUDAR</div>
        <div className="sector">
          {LoginPanel(imagedata, noticelist)}
          <div className={logincheck ? "login" : "logout"}>
            <button onClick={logincheck ? () => { navigate("/user/info"); window.scrollTo(0, 0); } : () => { setloginpopup(true); }} style={{ border: 0, backgroundColor: "transparent" }} className="loginbutton">{logincheck ? loginuser.nickname + " 님" : "로그인"}</button>
            <div className="line"> |  </div>
            <button onClick={logincheck ? () => { setlogincheck(false); setnoticepopup(false); localStorage.setItem("login", false); localStorage.setItem("currenttab", ""); localStorage.removeItem("token"); localStorage.removeItem("tokentime"); localStorage.removeItem("userdata"); navigate("/"); window.scrollTo(0, 0); } : () => { navigate("/user/join"); window.scrollTo(0, 0); }} style={{ border: 0, backgroundColor: "transparent" }} className="signbutton">{logincheck ? "로그아웃" : "회원가입"}</button>
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