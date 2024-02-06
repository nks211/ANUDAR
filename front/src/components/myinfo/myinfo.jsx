import { React, createContext, useContext, useState } from "react";
import MyProfile from "./myprofile/myprofile";
import MyBoard from "./myboard/myboard";
import "./myinfo.css";
import { mypagestate } from "../../StateManagement";
import { AppContext } from "../../App";

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

    const myeditmode = mypagestate((state) => state.myeditmode);
    const setmyeditmode = mypagestate((state) => state.setmyeditmode);
    const { setLoginNickname } = useContext(AppContext);
    const localdata = JSON.parse(localStorage.getItem("userdata"));
    const updatedatainput = mypagestate((state) => state.updates);
    const updatedata = () => {
        const updatenickname = updatedatainput.newnickname === "" ? localdata.nickname : updatedatainput.newnickname;
        const updatephonenumber = updatedatainput.newphonenumber === "" ? localdata.number : updatedatainput.newphonenumber;
        setLoginNickname(updatenickname);
        localStorage.setItem("userdata", JSON.stringify({ ...localdata, nickname: updatenickname, number: updatephonenumber, }));
    };



    return (
        <div className="myinfoarea">
            <div className="title">내 정보</div>
            <div style={{ display: "flex", justifyContent: "center", }}><MyProfile nickname="닉네임" follower="100" following="45"/></div>
            <div style={{ display: "flex", justifyContent: "center", position: "relative", top: "100px", }}><MyBoard/></div>
            <div onClick={() => { setmyeditmode(!myeditmode); updatedata(); }} style={{ display: "flex", justifyContent: "center", position: "relative", top: "250px", left: "40%" }} className="checkbutton">{myeditmode? "저장" : "수정"}</div>
        </div>
    );

}

export default MyInfo;