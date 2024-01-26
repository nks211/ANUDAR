import { React, useContext } from "react";
import "./changepassword.css";
import { MypageContext } from "../../mypage/mypage";

function ChangePassword() {

    const { passpopup, setPassPopup } = useContext(MypageContext);

    return (
        <div className="changepasswordarea">
            <div className="changepasswordtitle">비밀번호 변경하기</div>
            <p className="changepassworddetail">새로 설정할 비밀번호를 입력한 다음 '변경하기' 버튼을 눌러주세요</p>
            <input className="changeinput" type="password" placeholder="현재 비밀번호 입력" />
            <input className="changeinput" type="password" placeholder="새 비밀번호 입력" />
            <input className="changeinput" type="password" placeholder="새 비밀번호 입력 확인"/>
            <div style={{ position: "relative", left: "38%", top: "10px" }} onClick={() => { setPassPopup(false); }} className="changepasswordcheck">변경하기</div>
        </div>
    );
}

export default ChangePassword;