import { React, useState } from "react";
import "./myprofile.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { popupstate } from "../../../StateManagement";
import Payment from "../../payment/Payment";


export default function MyProfile(props) {

  const localdata = JSON.parse(localStorage.getItem("userdata"));
  const [url, setUrl] = useState(localdata.profileimage);
  const [urlimage, setUrlImage] = useState(localdata.profileimage);
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

  const paymentPopup = popupstate((state) => state.paymentPopup);
  const setPaymentPopup = popupstate((state) => state.setPaymentPopup);
  const paymentmodal = () => {
    return <Modal isOpen={paymentPopup} onRequestClose={() => { setPaymentPopup(false) }} style={setting}>
            <Payment/>
          </Modal>;
  };


  const upload = (e) => {
    const file = e.target.files[0];
    if (file === null) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      const newimageurl = URL.createObjectURL(file);
      reader.onload = () => {
        setUrl(reader.result || null);
        setUrlImage(reader.result || null);
        localStorage.setItem("userdata", JSON.stringify({ ...localdata, "profileimage": newimageurl, }));
        navigate("/user/info");
        resolve();
      };
    });
  }

  return (
    <div className="myprofilearea">
      <div className="left">
        <img width="200px" height="200px" style={{ objectFit: "cover", borderRadius:"70%", overflow:"hidden" }} src={url} />
        <label className="myprofileimage" for="profileurl">프로필 사진 수정</label>
        <input type="file" id="profileurl" accept="image/*" onChange={e => upload(e)} style={{ display: "none" }} />
      </div>
      <div className="right">
        <div className="nickname"><b>{localdata.nickname}</b> 님</div>
        <div style={{ display: "flex", flexDirection: "row", }}>
          <div className="follower">팔로워 {props.follower}</div>
          <div className="following">팔로잉 {props.following}</div>
        </div>
        <div id="myPoint">
          <div>
            <img width={30} src="../../asset/point.png"></img> 
            <span>{"0"/* *수정* 포인트 잔액 API 연결 */} POINT</span>
          </div>
          <button onClick={()=>{setPaymentPopup(true)}}>충전</button>
          {paymentmodal()}
        </div>
      </div>
    </div>
  );
}