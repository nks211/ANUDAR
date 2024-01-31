import { useNavigate } from "react-router-dom";
import { React, useEffect, useState } from "react";
import dummy from "../db/data.json"
import Exhibit from "../components/exhibit/Exhibit";
import Search from "../components/search/Search";
import '../index.css'
import './ExhibitPage.css'

export default function ExhibitPage() {
  // *수정* API 연결 후 수정 - 작가 구분
  let isArtist = false;
  // let isArtist = true;
  let showRegistBtn = null;
  if (isArtist) {
    showRegistBtn = <div className="exhibitRegistBtn" onClick={()=>{
                      navigate(`/exhibit/regist`)
                    }}>전시회 등록</div>
  }

  const exhibitList = [];
  const [exhibits, setExhibits] = useState(exhibitList);

  const [allBtn, setAllBtn] = useState("toggleBtn");
  const [onGoingBtn, setOnGoingBtn] = useState("toggleBtn clickToggleBtn");

  const navigate = useNavigate();

  function allExhibits() {
    for (let i=0; i<dummy.exhibits.length; i++) {
      exhibitList.push(dummy.exhibits[i])
    }
  }

  function onGoingExhibits() {
    const newExhibits = []
    var currentDate = new Date();
  
    for (let i=0; i<dummy.exhibits.length; i++) {
      var startDate = new Date(dummy.exhibits[i].start);
      var endDate = new Date(dummy.exhibits[i].end);
      if (currentDate >= startDate && currentDate <= endDate) {
        newExhibits.push(dummy.exhibits[i])
      }
    }
    setExhibits(newExhibits)
  }

  useEffect(()=>{
    allExhibits()
    console.log('...')
  }, [exhibitList])
  
  useEffect(()=>{
    onGoingExhibits()
  }, [])


  let content = <div className="exhibitList">
                  {exhibits.map(exhibit=>(
                    <Exhibit exhibitType={1} exhibit={exhibit}/>
                  ))}
                </div>

  return (
    <div>
      <div className="exhibitHeader">
        <div className="exhibitToggle">
          {/* 전체 */}
          <div className={allBtn} style={{width:65}} onClick={()=>{
            setAllBtn("toggleBtn clickToggleBtn");
            setOnGoingBtn("toggleBtn");
            setExhibits(exhibitList)
          }}>전체</div>

          {/* 진행 중인 전시 */}
          <div className={onGoingBtn} style={{width:140}} onClick={()=>{
            setOnGoingBtn("toggleBtn clickToggleBtn");
            setAllBtn("toggleBtn");
            onGoingExhibits()
          }}>진행 중인 전시</div>
        </div>

        <div className="exhibitHeaderRight">
          <Search updateValues={(searchExhibit) => {
            const newExhibits = []
            for (let i=0; i<dummy.works.length; i++) {
              // *수정* : title (API 연결 후) 변경
              if (dummy.exhibits[i]?.title.includes(searchExhibit) && exhibits.includes(dummy.exhibits[i])) {
                newExhibits.push(dummy.exhibits[i])
              }
            }
            setExhibits(newExhibits)
          }}/>
          {showRegistBtn}
          {/* {{isArtist}? "a":"b"}
          <div className="exhibitRegistBtn" onClick={()=>{
            navigate(`/exhibit/regist`)
          }}>전시회 등록</div> */}
        </div>
      </div>
      
      {content}
    </div>
  );
}
