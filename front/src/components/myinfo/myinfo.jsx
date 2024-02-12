import { React, createContext, useContext, useState } from "react";
import MyProfile from "./myprofile/myprofile";
import MyBoard from "./myboard/myboard";
import "./myinfo.css";
import { updateinfo } from "../../API";
import { mypagestate } from "../../StateManagement";

export const MyEditContext = createContext();

function MyInfo() {

    const myeditmode = mypagestate((state) => state.myeditmode);
    const setmyeditmode = mypagestate((state) => state.setmyeditmode);
    const localdata = JSON.parse(localStorage.getItem("userdata"));
    const updatedatainput = mypagestate((state) => state.updates);
    const updatedata = async () => {
        const newupdatedata = {
            "nickname": updatedatainput.newnickname != "" ? updatedatainput.newnickname : localdata.nickname,
            "email": updatedatainput.newemail != "" ? updatedatainput.newemail : localdata.email,
            "image": updatedatainput.newprofileimage != "" ? updatedatainput.newprofileimage : localdata.image,
            "phone": updatedatainput.newphonenumber != "" ? updatedatainput.newphonenumber : localdata.phone,
        };
        const token = localStorage.getItem("token");
        const result = await updateinfo(newupdatedata, token);
        if (result != null) {
            localStorage.setItem("userdata", JSON.stringify(result));
            alert("회원정보가 변경되었습니다");
        }
        else {
            alert("오류가 발생했습니다. 다시 시도해주세요");
        }
    };

    return (
        <div className="myinfoarea">
            <div className="title">내 정보</div>
            <div style={{ display: "flex", justifyContent: "center", }}><MyProfile/></div>
            <div style={{ display: "flex", justifyContent: "center", position: "relative", top: "100px", }}><MyBoard/></div>
            <div onClick={() => { if (myeditmode) updatedata(); setmyeditmode(!myeditmode); }} style={{ display: "flex", justifyContent: "center", position: "relative", top: "250px", left: "40%" }} className="checkbutton">{myeditmode? "저장" : "수정"}</div>
        </div>
    );

}

export default MyInfo;