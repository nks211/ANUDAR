import { React, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import Notice, { UptoDate } from "../notice/notice.jsx";
import Login from "../signup/login.jsx";
import { AppContext } from "../App.js";
import Modal from "react-modal";
import { mainstate, popupstate } from "../StateManagement.jsx";
import { getnotices, deletenotice, myinfo, getAllExhibitList } from "../API.jsx";

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

  // console.log(JSON.parse(localStorage.getItem("userdata")).notifies)


  // 로그인패널
  const userdata = mainstate((state)=>state.loginuser)
  const noticepopup = popupstate((state) => state.homenoticepopup);
  const noticelist = mainstate((state) => state.noticelist);  // userdata.notifies
  const setnoticelist = mainstate((state) => state.setnoticelist);
  const checknotice = mainstate((state) => state.noticecheck);

  console.log(userdata.notifies)
  console.log(typeof noticelist)
  // console.log(typeof JSON.parse(localStorage.getItem("userdata")).notifies)
  
  async function getMyInfo() {
    try {
      const res = await myinfo(logintoken)
      localStorage.setItem("userdata", JSON.stringify(res))
    } catch (err) {
      console.log(err)
    }
  }

  function LoginPanel() {
    return (
      <div>
      <div onClick={() => { setnoticepopup(!noticepopup) }}>
        {isLogin ?
        (userdata.notifies?.length ?
          <img className="noti" src="../../asset/noti_on.png" />
          : <img className="noti" src="../../asset/noti_off.png" />) : ""}
      </div>
      <div>{isLogin ?
        <img width="45px" height="45px" className="mypage" src={loginUser.image?loginUser.image:"../../asset/avatar.png"} onClick={() => { navigate("/user/info"); localStorage.setItem("currenttab", ""); window.scrollTo(0, 0) }} /> : ""}
      </div>
      <div style={{ zIndex: 5, position: "absolute", left: "10px", top: "50px", display: noticepopup ? "block" : "none" }}>
        {userdata.notifies?.length ? 
          Object.values(userdata.notifies).map((notice, i) => 
            <div onClick={
              async () => { 
                const result = await deletenotice(notice.id, logintoken);
                getMyInfo() 

                // // 유저 정보에 result로 받은 알림 삭제 결과를 반영
                // const newnotices = userdata.notifies.filter((item) => item.id !== notice.id);
                // setloginUser({ ...loginUser, notifies: newnotices });

                // // 알림 목록에서도 삭제
                // const newlist = noticelist.filter((item) => item.id !== notice.id);
                // setnoticelist(newlist);

                // // 알림 목록이 비어있으면 알림 팝업을 닫음
                // window.scrollTo(0, 0);

                if (result !== "") checknotice(notice)
                }}>
              <Notice key={i} details={notice.content}/>
            </div>) : UptoDate()}
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

  useEffect(() => {
    if (localtab) setnavtab(localtab);
    else setnavtab("");
  })

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
            <button onClick={isLogin ? () => { setnavtab(""); localStorage.setItem("currenttab", ""); navigate("/user/info"); window.scrollTo(0, 0); } : () => { setloginpopup(true); }} style={{ border: 0, backgroundColor: "transparent" }} className="loginbutton">{isLogin ? loginUser.nickname + " 님" : "로그인"}</button>
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