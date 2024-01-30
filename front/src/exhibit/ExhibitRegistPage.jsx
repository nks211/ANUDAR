import { useState } from 'react'
import Exhibit from '../components/exhibit/Exhibit';
import Calendar from '../components/exhibit/Calendar';
import './ExhibitPage.css'

export default function ExhibitRegistPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(<div style={{width:300, height:400, backgroundColor:"#D9D9D9", borderRadius:"0.7rem"}}></div>);

  return (
    <div className="exhibitRegist">
      <div style={{textAlign:"left", fontSize:"28px", fontWeight:"900", color:"#967E76"}}>전시회 등록하기</div>
      {/* <div style={{fontSize:"18px", marginTop:"10px"}}>온라인으로 나의 작품을 선보일 수 있는 기회!</div>
      <div style={{fontSize:"18px"}}>도슨트와 함께 더욱 풍성한 전시회를 꾸며보세요</div> */}
      <hr style={{width:"100%", border:"1px solid #EEE3CB", margin:"20px 0"}}/>
      <div className="registColumn">
        <div className="registPoster">
          <div className="registTitle">대표 이미지</div>
          <div className="registDescription">전시회 목록에서 보여질 이미지를 등록해주세요.</div>
          {/* <div style={{width:300, height:400, backgroundColor:"#D9D9D9", borderRadius:"0.7rem"}}></div> */}
          {/* *수정* : artist = username */}
          <Exhibit exhibitType={3} exhibit={{"title":title, "artist":"작가명", "start":"2024-02-01 00", "end":"2024-03-31 23", "image":image}}/>
          <button>선택</button>
        </div>
        <div className="registInfo">
          <div className="registTitle">전시회 정보</div>
          <div className="registDescription"><span>*</span>는 필수 입력사항입니다.</div>
          <div className="registInput"><div className="item1"><span>*</span> 전시회 이름</div>
            <input id="exhibitTitle" placeholder="최대 글자수 20자" onChange={(event)=>{setTitle(event.target.value)}}/>
          </div>
          <div className="registInput"><div className="item1"><span>*</span> 전시회 설명</div><textarea id="exhibitDescription" placeholder="최대 글자수 255자"/></div>
          <div className="registInput"><div className="item1"><span>*</span> 전시회 기간
          </div>
            <div className="item2">
              <div>시작일</div>
              <div>종료일</div>
              {/* <div className="registPeriod">
                <input id="startYear"/>년 
                <input id="startMonth"/>월 
                <input id="startDay"/>일 
              </div> */}
            </div>
          </div>
          <Calendar/>


          {/* 캐러셀 작품 선택 최소 1개 - 최대 10개 */}
        </div>
      </div>
    </div>
  )
}