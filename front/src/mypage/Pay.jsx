import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Pay() {
  const token = localStorage.getItem('token');
  const tid = localStorage.getItem('tid');
  const location = useLocation();
  const pgToken = location.search.split("?pg_token=")[1];
  // 내 포인트 조회
  let userPoints = localStorage.getItem('userdata.userPoints') !== null ? parseInt(localStorage.getItem('userdata.userPoints'), 10) : 0;
  console.log(userPoints);
  // 문자열을 숫자로 변환하여 저장
  const additionalPoints = parseInt(localStorage.getItem('point'), 10);

  const form = {
    cid: "TC0ONETIME",
    partner_user_id: 'partner_user_id',
    partner_order_id: 'partner_order_id',
    tid: tid,
    pg_token: pgToken
  };

  const handleApprove = async () => {
    userPoints = userPoints + additionalPoints;
    localStorage.setItem('userdata.userPoints', userPoints.toString());

    alert('결제가 완료되었습니다. 포인트가 업데이트 되었습니다.');

      localStorage.setItem("tid", "");
      localStorage.setItem("pg_token", "");
      localStorage.setItem("point", "");

  };

  return (
    <div>
      <button onClick={handleApprove}
        style={{
          width:"300px",
          height:"60px",
          fontSize:"26px",
          fontWeight:900,
          border:"None",
          borderRadius:"2rem",
          
          backgroundColor:"#F7E600",
          color: "#3A1D1D",
          cursor:"pointer",
          boxShadow:"2px 2px 10px 0px #D9D9D9"
        }}
      >
        <div style={{
          display:"flex",
          alignItems: "center",
          justifyContent: "center"}}>
          <img style={{width:"30px", marginRight:"10px"}} src={"../../asset/kakaologo.png"}/>
          <div>결제 승인</div>
        </div>
      </button>
    </div>
  );
}
