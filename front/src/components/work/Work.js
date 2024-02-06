import { useNavigate } from "react-router-dom";
import { React, useState } from "react";
import './Work.css'

export default function Work(props) {
  const workType = props.workType;
  const [infoOpacity, setInfoOpacity] = useState(0);
  const navigate = useNavigate();
      
  if (workType === 1) {
    return (
      <div className="workCard1">
        <div className="workImageCard1"  
          onMouseOver={()=>{setInfoOpacity(1)}}
          onMouseOut={()=>{setInfoOpacity(0)}}>
          <div className="workImage1" onClick={()=> {
            navigate(`/work/${props.workId}`)
            window.scrollTo(0, 0)
          }}>
            <img src={props.image} style={{width:300, height:300}}></img>
          </div>
          <div className="workInfo1 cursorPointer" style={{opacity : infoOpacity}} onClick={()=> {
            navigate(`/work/${props.workId}`)
            window.scrollTo(0, 0)
          }}>
            <div className="workThumbnail"><span>시작가</span> <div>KRW {props.workAuctionPrice.toLocaleString()}</div></div>
            <div className="workThumbnail"><span>경매일</span> <div>{props.workAuctionDate}</div></div>
          </div>
        </div>
        <div className="workName1 cursorPointer" onClick={()=> {
          navigate(`/work/${props.workId}`)
          window.scrollTo(0, 0)
        }}>{props.workName}</div>
        <div className="workArtist1">{props.workArtist}</div>
      </div>
    )
  } else if (workType === 2) {
    return (
      <div>
        <div className="workCard2">
          <div className="workImageCard2" 
            onMouseOver={()=>{setInfoOpacity(1)}}
            onMouseOut={()=>{setInfoOpacity(0)}}
          >
            <div className="workImage2">
              <img /*className="workImageSize"*/ src={props.image} width={250} height={250}></img>
            </div>
            <div className="workInfo2" style={{opacity : infoOpacity}}>
              <div style={{padding: 30}}>
                <p style={{fontSize:28}}><span>{props.workName}</span></p>
                <p style={{fontSize:18, marginBottom:20}}>{props.workArtist}</p>

                <p>시작가</p>
                <p>{props.workAuctionPrice}￦</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (workType === 3) {
    return (
      <div>
        <div className="workCard3">
          <div className="workImageCard3" 
            onMouseOver={()=>{setInfoOpacity(1)}}
            onMouseOut={()=>{setInfoOpacity(0)}}
          >
            <div className="workImage3" onClick={()=> {
              navigate(`/work/${props.workId}`)
              window.scrollTo(0, 0)
            }}>
              <img src={props.image}></img>
            </div>
            <div className="workInfo1 cursorPointer" style={{opacity : infoOpacity}}  onClick={()=> {
              navigate(`/work/${props.workId}`)
              window.scrollTo(0, 0)
            }}>
              <p><span>{props.workName}</span></p>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (workType === 4) {
    return (
      <div>
        <div className="workCard4">
          <div className="deleteBtn">삭제</div>
          <div className="workImageCard4">
            <div className="workImage4">
              <img src={props.image} style={{width:250, height:250}}></img>
            </div>
          </div>
          <div className="workInfo4">
            <p className="workName4">{props.workName}</p>
            <p className="workArtist4">{props.workArtist}</p>
          </div>
        </div>
      </div>
    )
  }
};