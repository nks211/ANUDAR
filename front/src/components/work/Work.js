import { useNavigate } from "react-router-dom";
import { React, useState, useContext  } from "react";
import { AppContext } from "../../App";
import './Work.css'

export default function Work(props) {
  const workType = props.workType;
  const [infoOpacity, setInfoOpacity] = useState(0);
  const navigate = useNavigate();
  const {setPathName} = useContext(AppContext);

  switch (workType) {
    case 1:  // 작품 목록
      return (
        <div className="workCard1">
          <div className="workImageCard1"  
            onMouseOver={()=>{setInfoOpacity(1)}}
            onMouseOut={()=>{setInfoOpacity(0)}}>
            <div className="workImage1" onClick={()=> {
              navigate(`/work/${props.work.id}`)
              setPathName(window.location.pathname)
              window.scrollTo(0, 0)
            }}>
              <img src={props.work.image} style={{width:300, height:300, objectFit:"cover"}}></img>
            </div>
            <div className="workInfo1 cursorPointer" style={{opacity : infoOpacity}} onClick={()=> {
              navigate(`/work/${props.work.id}`)
              setPathName(window.location.pathname)
              window.scrollTo(0, 0)
            }}>
              <div className="workThumbnail"><span>시작가</span> <div>KRW {props.work.price.toLocaleString()}</div></div>
              {/* <div className="workThumbnail"><span>경매일</span> <div>{props.workAuctionDate}</div></div> */}
            </div>
          </div>
          <div className="workName1 cursorPointer" onClick={()=> {
            navigate(`/work/${props.work.id}`)
            setPathName(window.location.pathname)
            window.scrollTo(0, 0)
          }}>{props.work.title}</div>
          <div className="workArtist1">{props.work.author_name}</div>
        </div>
      )

    case 2:
      return (
        <div>
          <div className="workCard2">
            <div className="workImageCard2" 
              onMouseOver={()=>{setInfoOpacity(1)}}
              onMouseOut={()=>{setInfoOpacity(0)}}
            >
              <div className="workImage2">
                <img /*className="workImageSize"*/ src={props.image}></img>
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
    
    case 3:  // 작가 상세
      return (
        <div>
          <div className="workCard3">
            <div className="workImageCard3" 
              onMouseOver={()=>{setInfoOpacity(1)}}
              onMouseOut={()=>{setInfoOpacity(0)}}
            >
              <div className="workImage3" onClick={()=> {
                navigate(`/work/${props.work.id}`)
                setPathName(window.location.pathname)
                window.scrollTo(0, 0)
              }}>
                <img src={props.work.image}></img>
              </div>
              <div className="workInfo1 cursorPointer" style={{opacity : infoOpacity}}  onClick={()=> {
                navigate(`/work/${props.work.id}`)
                setPathName(window.location.pathname)
                window.scrollTo(0, 0)
              }}>
                <p><span>{props.work.title}</span></p>
              </div>
            </div>
          </div>
        </div>
      )

    case 4:
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