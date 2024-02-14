import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react'
import axios from 'axios'
import './Payment.css'


export default function Payment() {
  
  const [selectPoint, setSelectPoint] = useState(0);
  const [selectKRW, setSelectKRW] = useState(0);
  const [paymentUrl, setPaymentUrl] = useState(''); // 결제 승인 페이지 URL 상태

  const location = useLocation();

  useEffect(()=>{
    console.log(location)
  }, [location])

  const styleSetting = [
    { backgroundColor: "white", color: "black" }, 
    { backgroundColor: "#967E76", color: "white" }
  ];

  const token = localStorage.getItem('token');

  // 결제 요청 함수
  const handlePayment = async () => {
    if (selectPoint === 0 || selectKRW === 0) {
      alert('포인트를 선택해주세요.');
      return;
    }

    
    axios.post('http://localhost:8080/api/payment/kakaoPayReady', {
    // await axios.post('/api/payment/kakaoPayReady', {
    item_name: `포인트 ${selectPoint}개 충전`,
    total_amount: selectKRW,
    partner_user_id: 'partner_user_id',
    partner_order_id: 'partner_order_id',
    vat_amount: 0,
    tax_free_amount: 0,
    cid: "TC0ONETIME",
    quantity: 1,
    tax_free_amount: 0,
    approval_url: 'https://i10d105.p.ssafy.io/pay',
    cancel_url: 'https://i10d105.p.ssafy.io/',
    fail_url: 'https://i10d105.p.ssafy.io/'
    // approval_url: '/PaymentApproval',
    // cancel_url: '/',
    // fail_url: '/'
  }, {
    headers: {
      "Content-Type": `application/json;charset=utf-8`,
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    
    // tid 값을 저장
    console.log(`tid : ${response.data.tid}`)
    localStorage.setItem('tid', response.data.tid);

    // 결제한 가격을 포인트에 저장
    localStorage.setItem('point', selectPoint * 10000);

    // 결제 승인 페이지 URL을 상태에 저장
    setPaymentUrl(response.data.next_redirect_pc_url);

  })
  .catch(error => {
    console.error('결제 준비 중 에러 발생:', error);
    alert('결제 준비 중 오류가 발생했습니다.111');
  });
};


  
  function PointBtn(props) {
    // const point = props.point
    // const krw = props.krw
    const [point, krw] = [props.point, props.krw]
    
    return (
      <div className="point" style={selectPoint===point?styleSetting[1]:styleSetting[0]} onClick={()=>{
        if (selectPoint===point) { setSelectPoint(0); setSelectKRW(0) }
        else { setSelectPoint(point); setSelectKRW(krw)}}}>
        <div>
          <img width={25} src={"../../asset/point"+((selectPoint===props.point)?"_white":"")+".png"} style={{marginRight:"10px"}}/>
          <span>{point.toLocaleString()} POINT</span>
        </div>
        <span>KRW {krw.toLocaleString()}</span>
      </div>
    )
  }
  
  return (
    <div className="paymentArea">
      <div>
        <h2>충전하기</h2>
        <hr/>
        <div className="chargePoint">
          <PointBtn point={100} krw={1000000}/>
          <PointBtn point={50} krw={500000}/>
          <PointBtn point={30} krw={300000}/>
          <PointBtn point={10} krw={100000}/>
          <PointBtn point={5} krw={50000}/>
          <PointBtn point={1} krw={10000}/>
        </div>
        <button onClick={handlePayment}>{paymentUrl && (
          <a href={paymentUrl}>결제하기</a>
        )}</button>
      </div>
    </div>
  )
}