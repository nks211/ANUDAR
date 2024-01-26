import { React, useContext, useState } from "react";
import "./myboard.css";
import { MypageContext } from "../../../mypage/mypage";
import { MyEditContext } from "./../myinfo";

const changedata = {
    backgroundColor: "#ffffff",
    border: "2px solid #967E76",
    borderRadius: "5px",
    width: "150px",
    height: "30px",
    fontFamily: "Inter-Regular",
    fontSize: "14px",
    fontWeight: 400,
};

const phonenumberformatting = (number) => {
    return number.replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
};

function MyBoard(props) {
    
    const [userinfo, setUserInfo] = useState(props.user);
    const { passpopup, setPassPopup } = useContext(MypageContext);
    const { editmode, usernickname, userphonenumber, setUserNickname, setUserPhonenumber } = useContext(MyEditContext);
    
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
            <div className="exit">회원탈퇴</div>
        </div>
    );
}

export default MyBoard;