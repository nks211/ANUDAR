import { React, useState } from "react";
import "./changepassword.css";
import { mypagestate, popupstate } from "../../StateManagement";
import { changepassword } from "../../API";

function ChangePassword() {

    const [validdata, setValiddata] = useState("");
    const { updatedata, setnewpassword, setnewpasswordcheck } = mypagestate((state) => ({
        updatedata: state.updates,
        setnewpassword: state.setnewpassword,
        setnewpasswordcheck: state.setnewpasswordcheck,
    }));

    const setmypagechangepopup = popupstate((state) => state.setmypagechangepopup);

    const passwordcheckupdate = async () => {
        const token = localStorage.getItem("token");
        if (updatedata.newpassword === updatedata.newpasswordcheck) {
            const result = await changepassword(validdata, updatedata.newpassword, token);
            if (result != null) {
                setmypagechangepopup(false);
                localStorage.setItem("userdata", JSON.stringify(result));
                setnewpassword(""); setnewpasswordcheck("");
                alert("비밀번호가 변경되었습니다")
            }
            else {
                alert("입력한 비밀번호 값이 다릅니다");
            }
        }
        else {
            alert("비밀번호 확인값이 새 비밀번호와 다릅니다");
        }
    };

    return (
        <div className="changepasswordarea">
            <div style={{ textAlign: "center", }} className="changepasswordtitle">비밀번호 변경하기</div>
            <p className="changepassworddetail">새로 설정할 비밀번호를 입력한 다음 '변경하기' 버튼을 눌러주세요</p>
            <input className="changeinput" type="password" placeholder="현재 비밀번호 입력" onChange={(e) => { setValiddata(e.target.value) }}/>
            <input className="changeinput" type="password" placeholder="새 비밀번호 입력" onChange={(e) => { setnewpassword(e.target.value) }}/>
            <input className="changeinput" type="password" placeholder="새 비밀번호 입력 확인" onChange={(e) => { setnewpasswordcheck(e.target.value) }}/>
            <div style={{ position: "relative", left: "38%", top: "10px" }} onClick={() => { passwordcheckupdate(); }} className="changepasswordcheck">변경하기</div>
        </div>
    );
}

export default ChangePassword;