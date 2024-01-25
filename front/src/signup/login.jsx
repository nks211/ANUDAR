import { React, useState, useContext } from "react";
import { LoginContext } from "../navbar/navbar.jsx";
import "./login.css";

function Login() {

    const { login, setLogin, popup, setPopup } = useContext(LoginContext);
    const [id, setId] = useState("");
    const [pass, setPass] = useState("");

    return (
        <div className="loginarea">
            <div className="logotitle">ANUDAR</div>
            <div className="loginsector">
                <input type="text" className="input" placeholder="아이디" />
            </div>
            <div className="loginsector">
                <input type="password" className="input" placeholder="비밀번호" />
            </div>
            <div onClick={() => { setLogin(true); setPopup(false); }} className="logincheck">로그인</div>
        </div>
    );

}

export default Login;