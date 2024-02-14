import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function Pay() {
  const token = localStorage.getItem('token');
  const tid = localStorage.getItem('tid');
  const location = useLocation();
  const pgToken = location.search.split("?pg_token=")[1];
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
    if (!pgToken || !tid) {
      alert('결제 승인 정보가 누락되었습니다.');
      return;
    }

    try {
      await axios.post('/api/payment/kakaoPayApprove', form, {
        headers: {
          "Content-type": "application/json;charset=utf-8",
          "Authorization": `Bearer ${token}`
        }
      });

      const updatePointsData = {
        newPoints: additionalPoints 
      };
      console.log(updatePointsData)

      await axios.put('http://localhost:8080/api/user/updatePoints', updatePointsData, {
        headers: {
          "Content-type": "application/json;charset=utf-8",
          "Authorization": `Bearer ${token}`
        }
      });

      alert('결제가 완료되었습니다. 포인트가 업데이트 되었습니다.');

      localStorage.setItem("tid", "");
      localStorage.setItem("pg_token", "");
      localStorage.setItem("point", "");

    } catch (error) {
      console.error('처리 중 에러 발생:', error);
      alert('처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <button onClick={handleApprove}>
        결제 승인
      </button>
    </div>
  );
}
