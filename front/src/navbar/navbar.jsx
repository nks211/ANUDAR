import { React, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import Notice, { UptoDate } from "../notice/notice.jsx";
import Login from "../signup/login.jsx";
import { AppContext } from "../App.js";

export const LoginContext = createContext();

const LoginPanel = (islogin, notice) => {

  const [click, setClick] = useState(false);
  const noticeclick = () => { setClick(!click); }
  const { setNotice } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div>
      <div onClick={noticeclick}>{islogin === true ?
        (notice === true ?
          <img className="noti" src="../../asset/noti_on.png" />
          : <img className="noti" src="../../asset/noti_off.png" />) : ""}
      </div>
      <div>{islogin === true ?
        <img onClick={() => { navigate("/user/info") }} className="mypage" src="../../asset/avatar.png" /> : ""}</div>
      <div style={{ zIndex: 1, position: "absolute", left: "10px", top: "50px", display: click === true ? "block" : "none" }}>
        { notice? <div onClick={() => { setNotice(false); }}><Notice title="알림 제목" date="2024/01/24 09:00" details="여기에 알림 내용이 이어집니다." /></div> : UptoDate() }
      </div>
    </div>
  );
}

const menu = ["전시회", "작가", "작품", "경매"];
const modalback = {
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
  const { login, notice, setLogin, setNotice } = useContext(AppContext);
  const [popup, setPopup] = useState(false);
  const [menutab, setMenuTab] = useState("");

  return (
    <div>
      <div className="area">
        <div className="logo" onClick={() => { setMenuTab(""); navigate("/"); }}>ANUDAR</div>
        <div className="sector">
          {LoginPanel(login, notice)}
          <div className={login === true ? "login" : "logout"}>
            <button onClick={login ? () => { } : () => { setPopup(true); }} style={{ border: 0, backgroundColor: "transparent" }} className="loginbutton">{login === true ? "닉네임 님" : "로그인"}</button>
            <div className="line"> |  </div>
            <button onClick={login ? () => { setLogin(false); setPopup(false); navigate("/"); } : () => { navigate("/user/join"); }} style={{ border: 0, backgroundColor: "transparent" }} className="signbutton">{login === true ? "로그아웃" : "회원가입"}</button>
          </div>
        </div>
      </div>
      <div className="nav">
        <div onClick={() => { setMenuTab(menu[0]); navigate("/exhibit"); }} className={menutab === menu[0] ? "selected" : "menu"}>전시회</div>
        <div onClick={() => { setMenuTab(menu[1]); navigate("/artist"); }} className={menutab === menu[1] ? "selected" : "menu"}>작가</div>
        <div onClick={() => { setMenuTab(menu[2]); navigate("/work"); }} className={menutab === menu[2] ? "selected" : "menu"}>작품</div>
        <div onClick={() => { setMenuTab(menu[3]); navigate("/auction"); }} className={menutab === menu[3] ? "selected" : "menu"}>경매</div>
      </div>
        {popup ? <><div style={modalback} onClick={() => { setPopup(false); }}></div><LoginContext.Provider value={{ login, setLogin, popup, setPopup }}><Login /></LoginContext.Provider></> : null}
    </div>
  );
}

export default NavBar;