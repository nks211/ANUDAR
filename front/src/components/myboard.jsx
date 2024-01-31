import { React, useState } from "react";
import "./myboard.css";

function MyBoard(props) {
    
    const [userinfo, setUserInfo] = useState(props.user);
    
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
                        <td className="data"><div className="changepassword">변경</div></td>
                    </tr>
                    <tr>
                        <td className="identifier">닉네임</td>
                        <td className="data">{ userinfo.nickname }</td>
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
                        <td className="data">{ userinfo.phonenumber }</td>
                    </tr>
                </tbody>
            </table>
            <div className="exit">회원탈퇴</div>
        </div>
    );
}

export default MyBoard;