import { React, useContext } from "react";
import "./checkpassword.css";
import { MypageContext } from "../mypage/mypage";

export default function CheckPassword() {

    const { passwordcheck, setPasswordCheck } = useContext(MypageContext);

    return (
        <div className="checkpasswordarea">
            <div className="checkpasswordtitle">비밀번호 입력</div>
            <div className="checkpassworddetail">본인 확인을 위해 비밀번호를 입력해주세요.</div>
            <input className="checkpasswordinput" type="password" placeholder="비밀번호" />
            <div onClick={() => { setPasswordCheck(false); }} className="checkpasswordbutton">확인</div>
        </div>
    );

};