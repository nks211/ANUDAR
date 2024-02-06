import { React, useContext, useState } from "react";
import "./myboard.css";
import { MypageContext } from "../../../mypage/mypage";
import { MyEditContext } from "./../myinfo";
import Modal from "react-modal";
import ModalPopup from "../../modal/modalpopup";
import { AppContext } from "../../../App";

const changedata = {
    backgroundColor: "#ffffff",
    border: "2px solid #967E76",
    borderRadius: "5px",
    width: "150px",
    height: "30px",
    fontSize: "14px",
    fontWeight: 400,
};

const phonenumberformatting = (number) => {
    return number.replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
};

function MyBoard(props) {
    
    const [userinfo, setUserInfo] = useState(props.user);
    const { modalsetting } = useContext(AppContext);
    const { passpopup, setPassPopup } = useContext(MypageContext);
    const [exitpopup, setExitPopup] = useState(false);
    const { editmode, usernickname, userphonenumber, setUserNickname, setUserPhonenumber } = useContext(MyEditContext);

    const exitmodal = () => {
        return <Modal isOpen={exitpopup} onRequestClose={() => { setExitPopup(false); }} style={modalsetting}>
            <ModalPopup title="회원 탈퇴" detail="정말로 탈퇴하시겠습니까?" okbutton={true} cancelbutton={true} okbuttonlabel="확인" cancelbuttonlabel="취소" />
        </Modal>;
     };
    
    return (
        <div className="myboardarea">
            <div className="mytable">회원 정보</div>
            <table>
                <thead></thead>
                <tbody>
                    <tr>
                        <td className="identifier">아이디</td>
                        <td className="data">{ userinfo.id }</td>
                    </tr>
                    <tr>
                        <td className="identifier">비밀번호</td>
                        <td className="data"><div className="changepassword" onClick={() => { setPassPopup(true); }}>변경</div></td>
                    </tr>
                    <tr>
                        <td className="identifier">닉네임</td>
                        <td className="data">{ editmode? <input type="text" style={changedata} value={usernickname} onChange={(e) => { setUserNickname(e.target.value); }}/> : usernickname }</td>
                    </tr>
                    <tr>
                        <td className="identifier">이름</td>
                        <td className="data">{ userinfo.name }</td>
                    </tr>
                    <tr>
                        <td className="identifier">생년월일</td>
                        <td className="data">{ userinfo.birthday }</td>
                    </tr>
                    <tr>
                        <td className="identifier">전화번호</td>
                        <td className="data">{ editmode? <input type="tel" style={changedata} value={userphonenumber} onChange={(e) => { if(e.target.value.length <= 13) { setUserPhonenumber(phonenumberformatting(e.target.value)); } }} /> : userphonenumber }</td>
                    </tr>
                </tbody>
            </table>
            <div onClick={() => { setExitPopup(true); }} className="exit">회원탈퇴</div>
            { exitmodal() }
        </div>
    );
}

export default MyBoard;