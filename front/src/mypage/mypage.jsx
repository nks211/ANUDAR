import { React, useState } from "react";
import MyTab from "../components/mytab";
import MyInfo from "../components/myinfo";
import ChangePassword from "../components/changepassword";

function Mypage() {
    return (
        <div>
            <div style={{ width: "100%" }}>
                <div style={{ float: "left", width: "25%", zIndex: "1", }}><MyTab /></div>
                <div style={{ float: "right", width: "70%", margin: "90px 0px", }} ><MyInfo /></div>
            </div>
            <ChangePassword/>
        </div>
    );
}

export default Mypage;