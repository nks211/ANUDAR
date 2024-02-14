import { React, useState } from "react";
import "./checkpassword.css";
import { popupstate } from "../StateManagement";
import { changepassword } from "../API";

export default function CheckPassword() {

    const { mypagecheckpopup, setmypagecheckpopup } = popupstate((state) => ({
        mypagecheckpopup: state.mypagecheckpopup,
        setmypagecheckpopup: state.setmypagecheckpopup,
    }));
    const setloadingpopup = popupstate((state) => state.setloadingpopup);

    const [checkinput, setCheckInput] = useState("");
    const passwordcheck = async () => {
        if (checkinput == null) alert("비밀번호를 입력해주세요")
        const token = localStorage.getItem("token");
        return await changepassword(checkinput, checkinput, token);
    }

    const checksubmit = async (event) => {
        event.preventDefault();
        
        passwordcheck()
        .then(result => {
            if (checkinput != "") {
                if (result != null) {
                    setmypagecheckpopup(!mypagecheckpopup);
                    setloadingpopup(true);
                }
                else {
                    alert("비밀번호가 맞지 않습니다");
                }
            }
            else alert("비밀번호를 입력해주세요")
        });
    };

    return (
        <form className="checkpasswordarea" onSubmit={checksubmit}>
            <div className="checkpasswordtitle">비밀번호 입력</div>
            <div className="checkpassworddetail">본인 확인을 위해 비밀번호를 입력해주세요.</div>
            <input className="checkpasswordinput" type="password" placeholder="비밀번호" onChange={(e) => { setCheckInput(e.target.value); }} />
            <button type="submit" style={{ border: 0 }} className="checkpasswordbutton">확인</button>
        </form>
    );

};