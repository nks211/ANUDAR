import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios'
import {useLocation} from 'react-router-dom';

export default function Pay () {
    // const location = useLocation();
    // const [pgToken, setPgToken] = useState('');
    // console.log(location);
    // const url = location.search;
    console.log(localStorage)
    const token = localStorage.getItem('token');
    const tid = localStorage.getItem('tid');

    const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const pgToken = queryParams.get('pg_token');
    const pgToken = location.search.split("?pg_token=")[1]
// 

    console.log(token)

    const form = {
      cid: 'TC0ONETIME',
      partner_user_id: `partner_user_id_${new Date().getTime()}`,
      partner_order_id: `partner_order_id_${new Date().getTime()}`,
      tid: tid,
      pg_token : pgToken
    }

    console.log(form)

    const handleApprove  = async (form, token) => {
        if (!pgToken || !tid) {
            alert('결제 승인 정보가 누락되었습니다.');
            return;
        }
        
        console.log(form)
        console.log(token)
    
        await axios.post(
        //   'http://localhost:8080/api/payment/kakaoPayApprove',
          '/api/payment/kakaoPayApprove', 
            form
          , {
            headers: {
                "Content-Type": `application/json`,
                "Authorization": `Bearer ${token}`
            }
          })
          .then(response => {
              console.log(response);
              localStorage.setItem("tid", "")
              alert('결제가 완료되었습니다.');
          })
          .catch(error => {
              console.log(error)
              console.error('결제 승인 중 에러 발생:', error);
              alert('결제 승인 중 오류가 발생했습니다.222');
          })

    }
    return(
        <div>

            <button onClick={()=>handleApprove(form, token)}>
                버튼을 누르면 결제가 완료됩니다.
            </button>
    </div>
    )
}