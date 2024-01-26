import { React, useContext, useState } from "react";
import "./mytab.css";
import { MypageContext } from "../../mypage/mypage";

function MyTab() {

  const { mytab, myindex, setMyIndex } = useContext(MypageContext);

  return (
    <div className="mytabarea">
      <div className="mytabpage">마이페이지</div>
      <div onClick={() => { setMyIndex(mytab[0]); }} style={{ position: "absolute", left: "62px", top: "144px" }} className={myindex === mytab[0] ? "tabselected" : "tab"}>내 정보</div>
      <div>
        <div className="favorites">
          <div className="tabtitle">FAVORITES</div>
          <div onClick={() => { setMyIndex(mytab[1]); }} style={myindex === mytab[1] ? { position: "relative", left: "62px" } : {}} className={myindex === mytab[1] ? "tabselected" : "tab"}>찜한 전시회</div>
          <div onClick={() => { setMyIndex(mytab[2]); }} style={myindex === mytab[2] ? { position: "relative", left: "62px" } : {}} className={myindex === mytab[2] ? "tabselected" : "tab"}>찜한 작품</div>
          <div onClick={() => { setMyIndex(mytab[3]); }} style={myindex === mytab[3] ? { position: "relative", left: "62px" } : {}} className={myindex === mytab[3] ? "tabselected" : "tab"}>팔로잉 목록</div>
        </div>
        <div className="auction">
          <div className="tabtitle">AUCTION</div>
          <div onClick={() => { setMyIndex(mytab[4]); }} style={myindex === mytab[4] ? { position: "relative", left: "62px" } : {}} className={myindex === mytab[4] ? "tabselected" : "tab"}>경매 내역</div>
        </div>
        <div className="artist">
          <div className="tabtitle">ARTIST</div>
          <div onClick={() => { setMyIndex(mytab[5]); }} style={myindex === mytab[5] ? { position: "relative", left: "62px" } : {}} className={myindex === mytab[5] ? "tabselected" : "tab"}>내 전시</div>
          <div onClick={() => { setMyIndex(mytab[6]); }} style={myindex === mytab[6] ? { position: "relative", left: "62px" } : {}} className={myindex === mytab[6] ? "tabselected" : "tab"}>내 작품</div>
        </div>
      </div>
    </div>
  );

}

export default MyTab;