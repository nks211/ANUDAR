import { React, createContext, useState, useRef, useContext } from "react";
import MyTab from "../components/mytab/mytab";
import MyInfo from "../components/myinfo/myinfo";
import MyHistory from "../components/myinfo/myhistory/myhistory";
import CheckPassword from "../components/checkpassword";
import ChangePassword from "../components/changepassword/changepassword";
import Modal from "react-modal";
import { AppContext } from "../App";
import { popupstate } from "../StateManagement";

export const MypageContext = createContext();

function Mypage() {

    const { modalsetting } = useContext(AppContext);
    const mytab = ["내 정보", "찜한 전시회", "찜한 작품", "팔로잉 목록", "경매 내역", "내 전시", "내 작품"];
    const [myindex, setMyIndex] = useState(mytab[0]);

    const scrollspot = {
        "찜한 전시회" : 0,
        "찜한 작품": 1,
        "팔로잉 목록": 2,
        "경매 내역": 3,
        "내 전시": 4,
        "내 작품": 5,
    };
    const scrollref = useRef([]);
    const scrolltoref = (ref) => {
        if (scrollref.current[scrollspot[ref]]) {
            window.scrollTo({ top: scrollref.current[scrollspot[ref]].offsetTop, behavior: "smooth" });
        }
        else {
            window.scrollTo(0, 0);
        }
    }

    const mypagecheckpopup = popupstate((state) => state.mypagecheckpopup);
    const mypagechangepopup = popupstate((state) => state.mypagechangepopup);
    const setmypagechangepopup = popupstate((state) => state.setmypagechangepopup);

    return (
        <MypageContext.Provider value={{ mytab, myindex, setMyIndex, scrollref, scrollspot, scrolltoref }}>
            <div style={{ width: "100%" }}>
                <div style={{ float: "left", width: "25%", zIndex: "1", }}><MyTab /></div>
                <div style={{ float: "right", width: "70%", margin: "30px 0px", }} >
                    { mypagecheckpopup? (myindex === mytab[0]? <MyInfo /> : <MyHistory />) : null }</div>
            </div>
            <Modal isOpen={!mypagecheckpopup} style={modalsetting}><CheckPassword/></Modal>
            <Modal isOpen={mypagechangepopup} style={modalsetting} onRequestClose={() => { setmypagechangepopup(false); }}><ChangePassword/></Modal>
        </MypageContext.Provider>
    );
}

export default Mypage;