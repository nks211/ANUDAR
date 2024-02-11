import { React, useState } from "react";
import "./myprofile.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { mypagestate, popupstate } from "../../../StateManagement.jsx";
import Payment from "../../payment/Payment";
import { uploadimage, myfollowers, myfollowings } from "../../../API";


export default function MyProfile() {

  const localdata = JSON.parse(localStorage.getItem("userdata"));
  const [url, setUrl] = useState(localdata.image);
  const setnewprofileimage = mypagestate((state) => state.setnewprofileimage);
  const navigate = useNavigate();


  const setting = {
    overlay: {
      position: "fixed",
      backgroundColor: "#00000040",
    },
    content: {
      position: "absolute",
      border: "0",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
      alignItems: "center"
    }
  };

  const myeditmode = mypagestate((state) => state.myeditmode);
  const paymentPopup = popupstate((state) => state.paymentPopup);
  const setPaymentPopup = popupstate((state) => state.setPaymentPopup);
  const paymentmodal = <Modal isOpen={paymentPopup} onRequestClose={() => { setPaymentPopup(false); }} style={setting}><Payment /></Modal>;;
  const following = async () => { return await myfollowings(localStorage.getItem("token")) };
  const follower = async () => { return await myfollowers(localStorage.getItem("token")) };

  const upload = async (e) => {
    const file = e.target.files[0];
    if (file === null) return
    const imageurl = await uploadimage(file);
    if (imageurl != "") {
      setUrl(imageurl);
      setnewprofileimage(imageurl);
    }
    else {
      alert("이미지를 등록할 수 없습니다.");
    }
  }

  return (
    <div className="myprofilearea">
      <div className="left">
        <img width="200px" height="200px" style={{ objectFit: "cover", }} src={url} />
        <label style={{ display: myeditmode ? "flex" : "none" }} className="myprofileimage" for="profileurl">프로필 사진 수정</label>
        <input type="file" id="profileurl" accept="image/*" onChange={(e) => { upload(e); e.target.value = ""; }} style={{ display: "none" }} />
      </div>
      <div className="right">
        <div className="nickname"><b>{localdata.nickname}</b> 님</div>
        <div style={{ display: "flex", flexDirection: "row", }}>
          <div className="follower">팔로워 {}</div>
          <div className="following">팔로잉 {}</div>
        </div>
        <div id="myPoint">
          <div>
            <img width={30} src="../../asset/point.png"></img>
            <span>{"0"/* *수정* 포인트 잔액 API 연결 */} POINT</span>
          </div>
          <button onClick={() => { setPaymentPopup(true) }}>충전</button>
          {paymentmodal}
        </div>
      </div>
    </div>
  );
}