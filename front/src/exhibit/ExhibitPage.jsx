import { useNavigate } from "react-router-dom";
import { React, useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import dummy from "../db/data.json"
import Exhibit from "../components/exhibit/Exhibit";
import Search from "../components/search/Search";
import '../index.css'
import './ExhibitPage.css'

import { getAllExhibitList, getCurExhibitList } from "../API";

export default function ExhibitPage() {
  const {pathname, setPathName} = useContext(AppContext);
  const [allExhibits, setAllExhibits] = useState([]);  // 전체 전시 저장
  const [curExhibits, setCurExhibits] = useState([]);  // 진행 중 전시 저장
  const [exhibitList, setExhibitList] = useState(curExhibits);  // 선택한 전시

  const [selectBtn, setSelectBtn] = useState("cur");
  const navigate = useNavigate();

  async function onMounted() {
    try {
      await getAllExhibitList()
      .then(res => {setAllExhibits(res); console.log(allExhibits)})
      .catch(err=>console.log(err))

      await getCurExhibitList()
      .then(res=> {setCurExhibits(res); console.log(curExhibits)})
      .catch(err=>console.log(err))

    } catch (err) {
      console.log(err)
    } 
  }

  // async function getAllData() {
  //   try {
  //     const res = await getAllExhibitList()
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  useEffect(()=>{
    console.log('ExhibitPage')
    console.log(localStorage)
    onMounted()
    setExhibitList(curExhibits) 
  }, [localStorage.getItem("currenttab")])


  return (
    <div>
      <div className="exhibitHeader">
        <div className="exhibitToggle">
          {/* 전체 */}
          <div className={"toggleBtn"+(selectBtn==="all"?" clickToggleBtn":"")} style={{width:65}} onClick={()=>{
            setSelectBtn("all"); setExhibitList(allExhibits)
          }}>전체</div>

          {/* 진행 중인 전시 */}
          <div className={"toggleBtn"+(selectBtn==="cur"?" clickToggleBtn":"")} style={{width:140}} onClick={()=>{
            setSelectBtn("cur"); setExhibitList(curExhibits)
          }}>진행 중인 전시</div>
        </div>

        <div className="exhibitHeaderRight">
          <Search updateValues={(searchExhibit) => {
            const newExhibits = []
            for (let i=1; i<=exhibitList.length; i++) {
              if (exhibitList[i]?.name.includes(searchExhibit)) { newExhibits.push(exhibitList[i]) }
            }
            setExhibitList(newExhibits)
          }}/>
          <div className="exhibitRegistBtn" onClick={()=>{
            navigate(`/exhibit/regist`); setPathName(window.location.pathname); window.scrollTo(0, 0)}}>전시회 등록
          </div>
        </div>
      </div>
      <div className="exhibitList">
        {exhibitList.map(exhibit=>( <Exhibit exhibitType={1} exhibit={exhibit}/> ))}
      </div>
    </div> 
  );
}
