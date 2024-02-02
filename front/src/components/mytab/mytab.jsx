import { React, useContext, useEffect, useState } from "react";
import "./mytab.css";
import { MypageContext } from "../../mypage/mypage";

function MyTab() {

  const { mytab, myindex, setMyIndex, scrollref, scrolltoref } = useContext(MypageContext);
  const [scroll, setScroll] = useState(0);
  const [mytabscroll, setMyTabScroll] = useState(0);
  const updatescroll = () => {
    setScroll(window.scrollY || document.documentElement.scrollTop);
  }
  useEffect(() => {
    window.addEventListener('scroll', updatescroll);
    return () => {
      window.removeEventListener("scroll", updatescroll);
    };
  }, []);

  return (
    <div className={ scroll <= 150 ? "mytabareadefault" : "mytabarea" }>
      <div className="mytabpage">마이페이지</div>
      <div onClick={() => { setMyIndex(mytab[0]); scrolltoref(mytab[0]); console.log(scrollref.current.scrollTop) }} style={{ position: "absolute", left: "62px", top: "144px" }} className={myindex === mytab[0] ? "tabselected" : "tab"}>내 정보</div>
      <div>
        <div className="favorites">
          <div className="tabtitle">FAVORITES</div>
          <div onClick={() => { setMyIndex(mytab[1]); scrolltoref(mytab[1]); }} style={myindex === mytab[1] ? { position: "relative", left: "62px" } : {}} className={(myindex === mytab[1] || scroll >= scrollref.current.scrollTop) ? "tabselected" : "tab"}>찜한 전시회</div>
          <div onClick={() => { setMyIndex(mytab[2]); scrolltoref(mytab[2]); }} style={myindex === mytab[2] ? { position: "relative", left: "62px" } : {}} className={(myindex === mytab[2] || scroll >= scrollref.current.scrollTop) ? "tabselected" : "tab"}>찜한 작품</div>
          <div onClick={() => { setMyIndex(mytab[3]); scrolltoref(mytab[3]); }} style={myindex === mytab[3] ? { position: "relative", left: "62px" } : {}} className={(myindex === mytab[3] || scroll >= scrollref.current.scrollTop) ? "tabselected" : "tab"}>팔로잉 목록</div>
        </div>
        <div className="auction">
          <div className="tabtitle">AUCTION</div>
          <div onClick={() => { setMyIndex(mytab[4]); scrolltoref(mytab[4]); }} style={myindex === mytab[4] ? { position: "relative", left: "62px" } : {}} className={(myindex === mytab[4] || scroll >= scrollref.current.scrollTop) ? "tabselected" : "tab"}>경매 내역</div>
        </div>
        <div className="artist">
          <div className="tabtitle">ARTIST</div>
          <div onClick={() => { setMyIndex(mytab[5]); scrolltoref(mytab[5]); }} style={myindex === mytab[5] ? { position: "relative", left: "62px" } : {}} className={(myindex === mytab[5] || scroll >= scrollref.current.scrollTop) ? "tabselected" : "tab"}>내 전시</div>
          <div onClick={() => { setMyIndex(mytab[6]); scrolltoref(mytab[6]); }} style={myindex === mytab[6] ? { position: "relative", left: "62px" } : {}} className={(myindex === mytab[6] || scroll >= scrollref.current.scrollTop) ? "tabselected" : "tab"}>내 작품</div>
        </div>
      </div>
    </div>
  );

}

export default MyTab;