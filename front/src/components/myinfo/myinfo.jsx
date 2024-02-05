import { React, createContext, useState } from "react";
import MyProfile from "./myprofile/myprofile";
import MyBoard from "./myboard/myboard";
import "./myinfo.css";

export const MyEditContext = createContext();

const memberinfo = {
    id : "user1",
    password : "1234",
    nickname : "nickname",
    name : "김싸피",
    birthday : "1990-00-00",
    phonenumber : "010-0000-0000",
};

function MyInfo() {

    const [editmode, setEditMode] = useState(false);
    const [usernickname, setUserNickname] = useState(memberinfo.nickname);
    const [userphonenumber, setUserPhonenumber] = useState(memberinfo.phonenumber);

    return (
        <div className="myinfoarea">
            <div className="title">내 정보</div>
            <div style={{ display: "flex", justifyContent: "center", }}><MyProfile nickname="닉네임" follower="100" following="45"/></div>
            <div style={{ display: "flex", justifyContent: "center", position: "relative", top: "100px", }}><MyEditContext.Provider value={{ editmode, usernickname, userphonenumber, setUserNickname, setUserPhonenumber }}><MyBoard user={memberinfo}/></MyEditContext.Provider></div>
            <div onClick={() => { setEditMode(!editmode); }} style={{ display: "flex", justifyContent: "center", position: "relative", top: "250px", left: "40%" }} className="checkbutton">{editmode? "저장" : "수정"}</div>
        </div>
    );

}

export default MyInfo;