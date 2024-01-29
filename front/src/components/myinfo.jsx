import { React } from "react";
import MyProfile from "./myprofile";
import MyBoard from "./myboard";
import "./myinfo.css";

const memberinfo = {
    id : "user1",
    password : "1234",
    nickname : "nickname",
    name : "김싸피",
    birthday : "1990-00-00",
    phonenumber : "010-0000-0000",
};

function MyInfo() {

    return (
        <div className="myinfoarea">
            <div className="title">내 정보</div>
            <div style={{ display: "flex", justifyContent: "center", }}><MyProfile nickname="닉네임" follower="100" following="45"/></div>
            <div style={{ display: "flex", justifyContent: "center", position: "relative", top: "100px", }}><MyBoard user={memberinfo}/></div>
            <div style={{ display: "flex", justifyContent: "center", position: "relative", top: "250px", left: "40%" }} className="checkbutton">수정</div>
        </div>
    );

}

export default MyInfo;