import { React, useContext } from "react";
import { AppContext } from "../App.js";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { mainstate, popupstate } from "../StateManagement.jsx";

function Login() {
    const {setPathName} = useContext(AppContext);
    const navigate = useNavigate();

    const setloginstate = mainstate((state) => state.setlogin);
    const { loginidinput, loginpasswordinput, setloginidinput, setloginpasswordinput } = mainstate((state) => ({
        loginidinput: state.idinput,
        loginpasswordinput: state.passwordinput,
        setloginidinput: state.setloginidinput,
        setloginpasswordinput: state.setloginpasswordinput,
    }));
    
    const logincomplete = mainstate((state) => state.logincomplete);
    const loginpopup = popupstate((state) => state.sethomepopup);
    const setlogintoken = mainstate((state) => state.setlogintoken);

    const loginenter = (event) => {
        event.preventDefault();
        const localdata = JSON.parse(localStorage.getItem("userdata"));
        const check = loginidinput === localdata.id && loginpasswordinput === localdata.password;
        if (loginidinput && loginpasswordinput && check) {
            // 로그인 요청
            logincomplete(loginidinput, loginpasswordinput);
            setloginstate(true);
            loginpopup(false);
            // 로그인 토큰 값 스토리지 저장
            localStorage.setItem("login", true);
            localStorage.setItem("currenttab", "");
            // setLogin(true);
            // setPopup(false);
            navigate("/");
            setPathName(window.location.pathname);
        }
        else {
            alert("아이디 혹은 비밀번호를 확인해주세요.");
        }
    };

    return (
        <form className="loginarea" onSubmit={loginenter}>
            <div className="logotitle">ANUDAR</div>
            <div className="loginsector">
                <input type="text" className="input" placeholder="아이디" onChange={(e) => { setloginidinput(e.target.value); }} />
            </div>
            <div className="loginsector">
                <input type="password" className="input" placeholder="비밀번호" onChange={(e) => { setloginpasswordinput(e.target.value); }} />
            </div>
            <button style={{ border: 0, }} className="logincheck">로그인</button>
        </form>
    );

}

export default Login;