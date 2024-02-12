import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios'
import {useLocation} from 'react-router-dom';

export default function PaymentApproval () {
    const location = useLocation();
    const [pgToken, setPgToken] = useState('');
    console.log(location);
    const url = location.search;
    const token = localStorage.getItem('token');

    useEffect(() => {
        // location 객체로부터 pg_token 값을 추출하여 상태에 저장합니다.
        const pgToken = url.split('pg_token=')[1];
        setPgToken(pgToken);
        console.log(location, pgToken);
    }, [location]);
   

    const handleApprove  = () => {

        const tid = localStorage.getItem("tid");
        if (!pgToken || !tid) {
            alert('결제 승인 정보가 누락되었습니다.');
            return;
        }

        axios.post('http://localhost:8080/api/payment/PaymentApproval', {
            cid: 'TC0ONETIME',
            partner_order_id: 'partner_order_id',
            partner_user_id: 'partner_user_id',
            tid,
            pg_token : pgToken
        }, {
            headers: {
                "Content-Type": `application/json`,
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response);
            localStorage.setItem("tid", "")
            alert('결제가 완료되었습니다.');
        })
        .catch(error => {
            console.error('결제 승인 중 에러 발생:', error);
            alert('결제 승인 중 오류가 발생했습니다.');
        })

    }
    
    return (
        <div>

            <button onClick={handleApprove}>
                버튼을 누르면 결제가 완료됩니다.
            </button>
    </div>
    )
}
