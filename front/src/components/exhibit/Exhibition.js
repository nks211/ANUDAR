import { useState } from "react";
import './Exhibition.css';

export default function Exhibition(props) {
  const [enterOpacity, setEnterOpacity] = useState(0);
  
  return (
    <>
    <div className="exhibitionCard">
      <div className="exhibitionImageCard"
        onMouseOver={()=>{setEnterOpacity(1)}}
        onMouseOut={()=>{setEnterOpacity(0)}}
      >
        <img className="exhibitionImage" style={{width:240, height:320}} src={props.image}></img>
        <div className="exhibitionEnter" style={{opacity : enterOpacity}} onClick={()=>{/* 주소 변경 */}}>
          <div>입장하기</div>
        </div>
      </div>
      <p className="exhibitionName">{props.exhibitionName}</p>
      <p className="exhibitionArtist">{props.exhibitionArtist}</p>
      <p className="exhibitionPeriod">기간 | {props.exhibitionPeriod}</p>
    </div>
    </>
  )
}