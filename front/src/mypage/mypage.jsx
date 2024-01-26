import { React, createContext, useState } from "react";
import MyTab from "../components/mytab/mytab";
import MyInfo from "../components/myinfo/myinfo";
import ChangePassword from "../components/changepassword/changepassword";
import { modalback } from "../navbar/navbar";
import MyHistory from "../components/myinfo/myhistory/myhistory";

export const MypageContext = createContext();

function Mypage() {

    const [passpopup, setPassPopup] = useState(false);
    const mytab = ["내 정보", "찜한 전시회", "찜한 작품", "팔로잉 목록", "경매 내역", "내 전시", "내 작품"];
    const [myindex, setMyIndex] = useState(mytab[0]);

    return (
        <MypageContext.Provider value={{ passpopup, setPassPopup, mytab, myindex, setMyIndex }}>
            <div style={{ width: "100%" }}>
                <div style={{ float: "left", width: "25%", zIndex: "1", }}><MyTab /></div>
                <div style={{ float: "right", width: "70%", margin: "90px 0px", }} >{ myindex === mytab[0]? <MyInfo /> : <MyHistory />}</div>
            </div>
            { passpopup? <><div style={modalback} onClick={() => { setPassPopup(false); }}></div><ChangePassword/></> : null }
        </MypageContext.Provider>
    );
}

export default Mypage;