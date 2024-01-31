import { useEffect, useState } from 'react'
import Exhibit from '../components/exhibit/Exhibit';
import Calendar from '../components/exhibit/Calendar';
import './ExhibitPage.css'

export default function ExhibitRegistPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(<div style={{width:300, height:400, backgroundColor:"#D9D9D9"}}></div>);
  const [poster, setPoster] = useState();

  let [curY, curM] = [0, 0];

  const curDate = new Date();
  curY = curDate.getFullYear();
  curM = String(curDate.getMonth()+1);
  
  const [exhibitY, setExhibitY] = useState(curY);
  const [exhibitM, setExhibitM] = useState(curM);
  const [exhibitEndD, setExhibitEndD] = useState(getEndDate(exhibitY, exhibitM));
  const [isEnd, setIsEnd] = useState(true);

  const [docentDate, setDocentDate] = useState(1);
  const [docentHour, setDocentHour] = useState(10);
  const [docentMinute, setDocentMinute] = useState("00");

  const [lastSat, setLastSat] = useState();
  const [ampm, setAmpm] = useState("am");

  
  function getEndDate(year, month) {
    return(new Date(year, month, 0).getDate())
  }

  useEffect(()=>{
    setExhibitEndD(new Date(exhibitY, exhibitM, 0).getDate())
    var lastDay = new Date(exhibitY, exhibitM-1, exhibitEndD).getDay() + 1
    if (lastDay < 7) {
      setLastSat(exhibitEndD - lastDay)
    } else {
      setLastSat(exhibitEndD)
    }
  })

  const upload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
        reader.onload = () => {
            // *수정* 취소 눌렀을 때 오류
            setPreview(<img style={{width:300, height:400, objectFit: "cover"}} src={(reader.result || null)} />)
            setPoster(reader.result || null);
            resolve();
        };
    });
}
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

          {/* *수정* : artist = username */}
          <Exhibit exhibitType={3} exhibit={{"title":(title?title:"작품명"), "artist":"작가명", "start":`${exhibitY}-${String(exhibitM).padStart(2, '0')}-01`, "end":`${exhibitY}-${String(exhibitM).padStart(2, '0')}-${String(exhibitEndD).padStart(2,'0')}`, "image":preview}}/>
          <label className="uploadBtn" style={{width:"40px", height:"25px"}} for="poster">선택</label>
          <input type="file" id="poster" accept="image/*" onChange={event => upload(event)} style={{ display: "none" }}/>
            
        </div>
        <div className="registInfo">
          <div className="registTitle">전시회 정보</div>
          <div className="registDescription"><span>*</span>는 필수 입력사항입니다.</div>
          <div className="registInput"><div className="item1"><span>*</span> 전시회 이름</div>
            <input id="exhibitTitle" placeholder="최대 글자수 20자" maxLength="20" onChange={(event)=>{setTitle(event.target.value)}}/>
          </div>
          <div className="registInput" style={{marginBottom:"2px"}}>
            <div className="item1"><span>*</span> 전시회 설명</div>
            <textarea id="exhibitDescription" placeholder="최대 글자수 255자" maxLength="255" onChange={(event)=>{setDescription(event.target.value)}}/>
          </div>
          <div style={{textAlign:'right', fontSize:"12px", marginBottom:"5px"}}>{description.length}/255</div>
          <div className="registInput"><div className="item1"><span>*</span> 전시회 기간</div>
            <div className="item2" style={{flexDirection: "column"}}>

              <div style={{width:"100%", display:"flex", alignItems: "flex-start", flexDirection: "column"}}>
                {/* 시작일 */}
                <div className="periodSetting" style={{display:"flex"}}>
                  <div>시작일</div>
                  <input type="number" value={exhibitY} style={{textAlign:"center"}} onChange={(event)=>{
                    const y = event.target.value
                    if (y.length == 4 && y < curY) { alert('입력할 수 없는 년도입니다.'); setExhibitY(curY) }
                    else { setExhibitY(y.slice(0, 4)) }
                  }}/>
                  <div>/</div>
                  <input type="number" value={exhibitM} style={{textAlign:"center", width:"20px"}} onChange={(event)=>{
                    const m = event.target.value
                    if (m > 12 || m < 0 || (exhibitY === curY && m < curM && m.length)) { alert('입력할 수 없는 달 입니다.'); setExhibitM(curM) }
                    else { setExhibitM(m.slice(0, 2)) }
                  }}/>
                  <div>/ 1</div>
                </div>
                {/* 종료일 */}
                <div className="periodSetting" style={{display:"flex"}}>
                  <div>종료일</div>
                  <div style={{width:"110px"}}>{exhibitY.length === 4?exhibitY:curY} / {exhibitM?exhibitM:curM} / {exhibitEndD}</div>
                  <input type="checkbox" id="endCheck" style={{margin:0, marginRight:"5px", padding:0}} onClick={()=>{ setIsEnd(!isEnd) }}/>
                  <label for="endCheck" style={{fontSize:"14px"}}>종료일 후 전시</label>
                  <span className="tooltipToggle" ariaLabel="전시 기간 종료 후 전시 여부를 체크해주세요." tabindex="0">
                    <img className="checkTooltip" src="../../asset/tooltip.png" width={20} height={20}/>
                  </span>
                </div>

              </div>
            </div>
          </div>
          <div className="registInput" style={{marginBottom:"2px"}}>
            <div className="item1"><span>*</span> 도슨트 일정</div>
            <div className="item2" style={{flexDirection: "column"}}>
              <div className="item4">
                <div>{`${exhibitY.length === 4?exhibitY:curY} / ${exhibitM?exhibitM:curM} / `}</div>
                <div><input type="number" value={docentDate} style={{textAlign:"center", width:"20px"}} onChange={(event)=>{
                  const d = event.target.value
                  if (d > exhibitEndD) {

                  }
                  setDocentDate(d.slice(0, 2))
                  }}/>
                </div>
                {/* <div>{ampm==="am"?docentHour:docentHour+12}</div>
                <div>{docentHour}</div> */}
                <select value={ampm} style={{marginLeft:"15px", marginRight:"10px"}} onChange={(event)=>setAmpm(event.target.value)}>
                  <option value={"am"}>오전</option>
                  <option value={"pm"}>오후</option>
                </select>
                <div><input type="number" value={docentHour} style={{textAlign:"center", width:"20px"}} onChange={(event)=>{
                  const h = event.target.value
                  if ((h.slice(0, 2) > 12 || h.slice(0, 2) < 1)) {
                    alert("1 ~ 12 사이의 숫자를 입력해주세요.")
                    setDocentHour(10)
                  } else {
                    setDocentHour(h.slice(0, 2))
                  }
                  }}/> :
                </div>
                <div><input type="number" value={docentMinute} style={{textAlign:"center", width:"20px"}} onChange={(event)=>{
                  const m = event.target.value
                  if ((m.slice(0, 2) > 59 || m.slice(0, 2) < 0)) {
                    alert("0 ~ 59 사이의 숫자를 입력해주세요.")
                    setDocentMinute(0)
                  } else {
                    setDocentMinute(m.slice(0, 2))
                  }
                  }}/>
                </div>
              </div>

            </div>
          </div>

          {/* <select>
            <option>2024</option>
          </select> */}
          {/* <Calendar/> */}


          {/* 캐러셀 작품 선택 최소 1개 - 최대 10개 */}
        </div>
      </div>
    </div>
  )
}