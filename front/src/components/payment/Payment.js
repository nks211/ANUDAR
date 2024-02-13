import { useState } from 'react'
import './Payment.css'

export default function Payment() {
  const [selectPoint, setSelectPoint] = useState(0);
  const [selectKRW, setSelectKRW] = useState(0);
  const styleSetting = [
    { backgroundColor: "white", color: "black" }, 
    { backgroundColor: "#967E76", color: "white" }
  ];
  
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
          <PointBtn point={100000} krw={1000000}/>
          <PointBtn point={50000} krw={500000}/>
          <PointBtn point={30000} krw={300000}/>
          <PointBtn point={10000} krw={100000}/>
          <PointBtn point={5000} krw={50000}/>
          <PointBtn point={1000} krw={10000}/>
        </div>
        <button onClick={()=>{
          // 결제하기 누른 후 코드는 여기 작성하세요 ..
          // selectKRW : 결제금액 입니다 ...
          if (selectKRW) {
            alert(selectKRW+"원 결제!")
          }
          else {
            alert('결제 금액을 선택해주세요')
          }

        }}>결제하기</button>
      </div>
    </div>
  )
}