import { React, createContext, useContext, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import Notice, { UptoDate } from "../notice/notice.jsx";
import Login from "../signup/login.jsx";
import { AppContext } from "../App.js";
import Modal from "react-modal";
import { mainstate, mypagestate, popupstate } from "../StateManagement.jsx";

const LoginPanel = () => {

  const navigate = useNavigate();

  const loginstatus = localStorage.getItem("login");
  const logincheck = loginstatus != null ? loginstatus && loginstatus === "true" : false ;
  const noticepopup = popupstate((state) => state.homenoticepopup);
  const setnoticepopup = popupstate((state) => state.sethomenoticepopup);
  const noticelist = mainstate((state) => state.noticelist);
  const checknotice = mainstate((state) => state.noticecheck);
  const localdata = localStorage.getItem("userdata");
  const [imagedata, setimagedata] = useState(localdata.profileimage);

  useEffect(() => {
    if (localStorage.getItem("userdata")) {
      setimagedata(JSON.parse(localStorage.getItem("userdata")).profileimage);
    }
  });

  // return (
  //   <div>
  //     <div onClick={noticeclick}>{islogin === true ?
  //       (notice === true ?
  //         <img className="noti" src="../../asset/noti_on.png" />
  //         : <img className="noti" src="../../asset/noti_off.png" />) : ""}
  //     </div>
  //     <div>{islogin === true ?
  //       <img onClick={() => { navigate("/user/info"); window.scrollTo(0, 0) }} className="mypage" src="../../asset/avatar.png" /> : ""}</div>
  //     <div style={{ zIndex: 5, position: "absolute", left: "10px", top: "50px", display: click === true ? "block" : "none" }}>
  //       {notice ? <div onClick={() => { setNotice(false); }}><Notice title="알림 제목" date="2024/01/24 09:00" details="여기에 알림 내용이 이어집니다." /></div> : UptoDate()}
  //     </div>
  //   </div>
  // );

  return(
    <div>
      <div onClick={() => { setnoticepopup(!noticepopup) }}>{logincheck ?
        (noticelist.length > 0 ?
          <img className="noti" src="../../asset/noti_on.png" />
          : <img className="noti" src="../../asset/noti_off.png" />) : ""}
      </div>
      <div>{logincheck ?
        <img width="45px" height="45px" onClick={() => { navigate("/user/info"); localStorage.setItem("currenttab", ""); window.scrollTo(0, 0) }} className="mypage" src={imagedata} /> : ""}</div>
      <div style={{ zIndex: 5, position: "absolute", left: "10px", top: "50px", display: noticepopup ? "block" : "none" }}>
        {noticelist.length > 0 ? Object.values(noticelist).map((notice, i) => <div onClick={() => { checknotice(notice) }}><Notice key={i} title={notice.title} date={notice.date} details={notice.details}/></div>) : UptoDate()}
      </div>
    </div>
  );
}

export const modalback = {
  backgroundColor: "#00000040",
  width: "100%",
  height: "100vh",
  zIndex: "5",
  position: "fixed",
  top: "0",
  left: "0",
};

function NavBar() {

  const navigate = useNavigate();
  const { modalsetting } = useContext(AppContext);

  const locallogin = localStorage.getItem("login");
  const localtab = localStorage.getItem("currenttab");
  const [logincheck, setlogincheck] = useState(locallogin != null ? locallogin : false); 
  const { loginnickname } = useContext(AppContext);
  const [navtab, setnavtab] = useState(localtab != null ? localtab : "");
  const loginpopup = popupstate((state) => state.homepopup);
  const setloginpopup = popupstate((state) => state.sethomepopup);
  const setnoticepopup = popupstate((state) => state.sethomenoticepopup);
  const tabbar = mainstate((state) => state.tabbar);

  useEffect(() => {
    if (localStorage.getItem("login")) {
      setlogincheck(JSON.parse(localStorage.getItem("login")));
    }
  });

  // return (
  //   <div id="nav">
  //     <div className="area">
  //       <div className="logo" onClick={() => { setMenuTab(""); navigate("/"); window.scrollTo(0, 0); }}>ANUDAR</div>
  //       <div className="sector">
  //         {LoginPanel(login, notice)}
  //         <div className={login === true ? "login" : "logout"}>
  //           <button onClick={login ? () => { navigate("/user/info"); window.scrollTo(0, 0); } : () => { setPopup(true); }} style={{ border: 0, backgroundColor: "transparent" }} className="loginbutton">{login === true ? "닉네임 님" : "로그인"}</button>
  //           <div className="line"> |  </div>
  //           <button onClick={login ? () => { setLogin(false); setPopup(false); navigate("/"); window.scrollTo(0, 0); } : () => { navigate("/user/join"); window.scrollTo(0, 0); }} style={{ border: 0, backgroundColor: "transparent" }} className="signbutton">{login === true ? "로그아웃" : "회원가입"}</button>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="nav">
  //       <div onClick={() => { setMenuTab(menu[0]); navigate("/exhibit"); window.scrollTo(0, 0); }} className={menutab === menu[0] ? "selected" : "menu"}>전시회</div>
  //       <div onClick={() => { setMenuTab(menu[1]); navigate("/artist"); window.scrollTo(0, 0); }} className={menutab === menu[1] ? "selected" : "menu"}>작가</div>
  //       <div onClick={() => { setMenuTab(menu[2]); navigate("/work"); window.scrollTo(0, 0); }} className={menutab === menu[2] ? "selected" : "menu"}>작품</div>
  //       <div onClick={() => { setMenuTab(menu[3]); navigate("/auction"); window.scrollTo(0, 0); }} className={menutab === menu[3] ? "selected" : "menu"}>경매</div>
  //     </div>
  //     <Modal isOpen={popup} onRequestClose={() => { setPopup(false); }} style={modalsetting}>
  //       <LoginContext.Provider value={{ login, setLogin, popup, setPopup }}><Login /></LoginContext.Provider>
  //     </Modal>
  //     {/* {popup ? <><div style={modalback} onClick={() => { setPopup(false); }}></div><LoginContext.Provider value={{ login, setLogin, popup, setPopup }}><Login /></LoginContext.Provider></> : null} */}
  //   </div>
  // );

  return (
    <div id="nav">
      <div className="area">
        <div className="logo" onClick={() => { setnavtab(""); localStorage.setItem("currenttab", ""); navigate("/"); window.scrollTo(0, 0); }}>ANUDAR</div>
        <div className="sector">
          {LoginPanel()}
          <div className={logincheck ? "login" : "logout"}>
            <button onClick={logincheck ? () => { navigate("/user/info"); window.scrollTo(0, 0); } : () => { setloginpopup(true); }} style={{ border: 0, backgroundColor: "transparent" }} className="loginbutton">{logincheck ? loginnickname + " 님" : "로그인"}</button>
            <div className="line"> |  </div>
            <button onClick={logincheck ? () => { setlogincheck(false); setnoticepopup(false); localStorage.setItem("login", false); localStorage.setItem("currenttab", ""); navigate("/"); window.scrollTo(0, 0); } : () => { navigate("/user/join"); window.scrollTo(0, 0); }} style={{ border: 0, backgroundColor: "transparent" }} className="signbutton">{logincheck ? "로그아웃" : "회원가입"}</button>
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

export default NavBar;