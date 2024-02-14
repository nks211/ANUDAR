import { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import Exhibit from './Exhibit';
import ToolTip from './ToolTip';
import './ExhibitRegist.css'
import { mainstate } from '../../StateManagement';
import { uploadExhibitImg, registExhibit } from '../../API';
import { ExhibitRegistContext } from '../../exhibit/ExhibitRegistPage';

export default function ExhibitRegist() {
  const { works, setWorks } = useContext(ExhibitRegistContext);
  const loginUser = mainstate((state) => (state.loginuser));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(<div className="previewImg"></div>);
  const [poster, setPoster] = useState("");
  const [fileName, setFileName] = useState("");
  
  const navigate = useNavigate();

  let [curY, curM] = [0, 0];

  const curDate = new Date();
  curY = curDate.getFullYear();
  curM = curDate.getMonth()+1;
  
  const [exhibitY, setExhibitY] = useState(curY);
  const [exhibitM, setExhibitM] = useState(curM+1);
  const [exhibitEndD, setExhibitEndD] = useState(getEndDate(exhibitY, exhibitM));
  const [isEnd, setIsEnd] = useState(true);

  const [docentDate, setDocentDate] = useState(1);
  const [docentHour, setDocentHour] = useState(10);
  const [docentMinute, setDocentMinute] = useState("00");

  const [lastSat, setLastSat] = useState();
  const [ampm, setAmpm] = useState("am");

  function calcYM() {
    let curYear = [1,2,3,4,5,6,7,8,9,10,11,12].slice(curM, 12);
    let nextYear = [1,2,3,4,5,6,7,8,9,10,11,12].slice(0, curM);

    let curYM = curYear.map(function(m) { return [curY, m] })
    let nextYM = nextYear.map(function(m) { return [curY+1, m] })

    let selectYM = curYM.concat(nextYM)
    
    return Object.values(selectYM).map((ym) => {return(<option value={ym}>{`${ym[0]}년 ${ym[1]}월`}</option>)})
  }

  function getEndDate(year, month) {
    return(new Date(year, month, 0).getDate())
  }

  function getLastSat() {
    setExhibitEndD(new Date(exhibitY, exhibitM, 0).getDate())
    var lastDay = new Date(exhibitY, exhibitM-1, exhibitEndD).getDay() + 1
    if (lastDay < 7) {
      setLastSat(exhibitEndD - lastDay)
    } else {
      setLastSat(exhibitEndD)
    }
  }

  useEffect(()=>{
    getLastSat()
  })
  
  const logintoken = mainstate((state) => (state.logintoken))
  useEffect(()=>{
    console.log(logintoken)
  }, [])
  

  const upload = async (event) => {
    const file = event.target.files[0];
    if (!file) { return; }  // 파일 선택 후 취소 선택시 오류 나지 않도록

    const imageurl = await uploadExhibitImg(file, logintoken);
    setFileName(file.name)

    if (imageurl != "") {
      setPreview(<img style={{width:270, height:360, objectFit: "cover"}} src={imageurl} />)
      setPoster(imageurl)
    } else {
      alert('이미지를 찾을 수 없습니다.')
    }
  }

  function checkInput(event, inputType) {
    if (inputType === "docentDate") {
        const d = event.target.value
        if (d > exhibitEndD) { console.log('gg') }
        else { setDocentDate(d.slice(0, 2)) }
    } else if (inputType === "docentHour") {
        const h = event.target.value
        if ((h.slice(0, 2) > 12 || h.slice(0, 2) < 1)) { alert("1 ~ 12 사이의 숫자를 입력해주세요."); setDocentHour(10) }
        else { setDocentHour(h.slice(0, 2)) }
    } else if (inputType === "docentMinute") {
        const m = event.target.value
        if ((m.slice(0, 2) > 59 || m.slice(0, 2) < 0)) { alert("0 ~ 59 사이의 숫자를 입력해주세요."); setDocentMinute(0) }
        else { setDocentMinute(m.slice(0, 2)) }
    }
  }

  const exhibitForm = async (event) => {
    event.preventDefault()

    if (!title || !description || !exhibitY || !exhibitM || !docentDate || !docentHour || !docentMinute || !poster ) {
      alert('모든 정보를 입력해주세요')
      return
      //  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 5개로 수정 !!
    // } else if (works.length < 5) {
    } else if (works.length < 2) {
      alert('작품 최소 등록 개수는 5개입니다.')
      return
    }

    const m = String(exhibitM).padStart(2, '0')  // 전시회 달
    const d = String(exhibitEndD).padStart(2, '0')  // 전시회 종료일
    const dd = String(docentDate).padStart(2, '0')  // 도슨트 일
    const h = String((ampm==="am")?docentHour:docentHour+12).padStart(2, '0')  // 도슨트 시작시간
    const eh = String(Number(h)+2).padStart(2, '0')  // 도슨트 종료시간
    const dm = String(docentMinute).padStart(2, '0')

    const data = {
      "name": title, 
      "detail": description, 
      "start_time": `${exhibitY}-${m}-01 00:00:00`,
      "end_time": `${exhibitY}-${m}-${d} 23:59:59`,
      "docent_start": `${exhibitY}-${m}-${dd} ${h}:${dm}:00`,
      "docent_end": `${exhibitY}-${m}-${(eh>24?dd+1:dd)} ${eh>24?eh-24:eh}:${dm}:00`,
      "image": poster,
      "works": works
    }

    const res = await registExhibit(data, logintoken)
    console.log(res)
    console.log(data)
    console.log(works)
    // console.log(res)
    // console.log(res.id)
    // navigate(`/exhibit/${res.id}`)

    // navigate(`/exhibit/${res?.id}`)
    navigate(`/exhibit`)
  }

  return (
    <div className="exhibitRegist">
      <div id="exhibitRegistHeader">
        <div>전시회 등록하기</div>
        <button onClick={exhibitForm
          // 모달창 .. -> 정보 맞는지 확인
        }>최종 등록</button>
      </div>
      <hr style={{ width: "100%", border: "1px solid #EEE3CB", margin: "20px 0" }} />
      <div className="registColumn">
        {/* 대표 이미지 */}
        <div className="registPoster">
          <div className="registTitle">대표 이미지</div>
          <div className="registDescription">전시회 목록에서 보여질 이미지입니다.</div>
          {/* *수정* : artist = username */}
          <Exhibit exhibitType={3} exhibit={{ "name": (title ? title : "전시회 이름"), "author": loginUser.name, "start_time": `${exhibitY}-${String(exhibitM).padStart(2, '0')}-01`, "end_time": `${exhibitY}-${String(exhibitM).padStart(2, '0')}-${String(exhibitEndD).padStart(2, '0')}`, "image": preview }} />
        </div>
        {/* 전시회 정보 */}
        <div className="registInfo">
          <div className="registTitle">전시회 정보</div>
          <div className="registDescription"><span>*</span>는 필수 입력사항입니다.</div>

          {/* 전시회 이름 */}
          <div className="registInput">
            <div className="item1"><span>*</span> 전시회 이름</div>
            <input id="exhibitTitle" placeholder="최대 글자수 20자" maxLength="20" onChange={(event) => { setTitle(event.target.value) }} />
          </div>

          {/* 전시회 설명 */}
          <div className="registInput" style={{ marginBottom: "2px" }}>
            <div className="item1"><span>*</span> 전시회 설명</div>
            <textarea id="exhibitDescription" placeholder="최대 글자수 255자" maxLength="255" onChange={(event) => { setDescription(event.target.value) }} />
          </div>
          <div style={{ textAlign: 'right', fontSize: "12px", marginBottom: "15px" }}>{description.length}/255</div>

          {/* 전시회 기간 */}
          <div className="registInput">
            <div className="item1"><span>*</span> 전시회 기간</div>
            <div className="item2">
              {/* 시작일 */}
              <div className="periodSetting" style={{ marginBottom: "5px" }}>
                <span>시작일</span>
                <select onChange={event => { const [y, m] = event.target.value.split(','); setExhibitY(Number(y)); setExhibitM(Number(m)) }}>{calcYM()}</select>
                <span>1일</span>
              </div>
              {/* 종료일 */}
              <div className="periodSetting">
                종료일 {exhibitY}년 {exhibitM}월 {exhibitEndD}일
                <input type="checkbox" onClick={() => { setIsEnd(!isEnd) }} />
                <label for="endCheck" style={{ fontSize: "14px" }}>종료일 후 전시</label>
                <ToolTip size={17} img="tooltip.png" ariaLabel="전시 기간 종료 후 전시 여부를 체크해주세요" />
              </div>
            </div>
          </div>


          <div className="registInput">
            <div className="item1"><span>*</span> 도슨트 일정</div>
            <div className="item2">
              <div className="docentSetting">
                <div>{`${exhibitY} / ${exhibitM} / `}</div>
                <input type="number" value={docentDate} onChange={event => checkInput(event, "docentDate")} />
                <select value={ampm} style={{ marginLeft: "15px" }} onChange={event => setAmpm(event.target.value)}>
                  <option value={"am"}>오전</option>
                  <option value={"pm"}>오후</option>
                </select>
                <input type="number" value={docentHour} onChange={event => checkInput(event, "docentHour")} /><span>:</span>
                <input type="number" value={docentMinute} onChange={event => checkInput(event, "docentMinute")} />
                {/* <div>{ampm==="am"?docentHour:docentHour+12}</div>
                    <div>{docentHour}</div> */}
                {/* </div> */}
              </div>
              <div className="docentSetting">
                <span className="registGuide">경매일({(exhibitY && exhibitM) ? lastSat : ""}일) 이전으로 설정해주세요.</span>
                <ToolTip size={17} img="tooltip.png" ariaLabel="경매는 매월 마지막주 토요일에 진행됩니다" />
              </div>
            </div>
          </div>
          
          <div className="registInput" style={{ marginBottom: "2px" }}>
            <div className="item1"><span>*</span> 대표 이미지</div>
            <div className="item3">
              <div style={{display:"flex"}}>
                <span><div>{fileName&&fileName.length>22?fileName.slice(0, 25)+"...":fileName}</div>{fileName ? <img src='../asset/delete_button.png' onClick={() => { setPreview(<div className="previewImg"></div>); setFileName(""); setPoster("") }}></img> : ""}</span>
                <label className="uploadBtn" for="poster">선택</label>
                <input type="file" id="poster" accept="image/*" onChange={event => { upload(event); event.target.value = ''; }} style={{ display: "none" }} />
              </div>
              <div className="registGuide">권장이미지 375px * 500px 이상</div>
            </div>
          </div>

          {/* 캐러셀 작품 선택 최소 5개 - 최대 10개 */}
        </div>
      </div>
      <hr style={{ width: "100%", border: "1px solid #EEE3CB", margin: "20px 0" }} />
    </div>
  )
}