import { React, useState } from "react";
import "./checkpassword.css";
import { popupstate } from "../StateManagement";
import bcrypt from "bcryptjs";
import { changepassword } from "../API";

export default function CheckPassword() {

    const { mypagecheckpopup, setmypagecheckpopup } = popupstate((state) => ({
        mypagecheckpopup: state.mypagecheckpopup,
        setmypagecheckpopup: state.setmypagecheckpopup,
    }));

    const [checkinput, setCheckInput] = useState("");
    const passwordcheck = async () => {
        const token = localStorage.getItem("token");
        const result = await changepassword(checkinput, checkinput, token);
        if (result != null) {
            setmypagecheckpopup(!mypagecheckpopup);
        }
        else {
            alert("비밀번호가 맞지 않습니다");
        }
    }

    return (
        <div className="checkpasswordarea">
            <div className="checkpasswordtitle">비밀번호 입력</div>
            <div className="checkpassworddetail">본인 확인을 위해 비밀번호를 입력해주세요.</div>
            <input className="checkpasswordinput" type="password" placeholder="비밀번호" onChange={(e) => { setCheckInput(e.target.value); }} />
            <div onClick={() => { passwordcheck(); }} className="checkpasswordbutton">확인</div>
        </div>
    );

};