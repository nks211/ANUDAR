import { useNavigate } from "react-router-dom";
import { React, useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import dummy from "../db/data.json"
import Exhibit from "../components/exhibit/Exhibit";
import Search from "../components/search/Search";
import '../index.css'
import './ExhibitPage.css'
import { mainstate } from "../StateManagement";
import { getAllExhibitList, getCurExhibitList } from "../API";
import Loading from "../components/loading/Loading";

import { getAllExhibitList, getCurExhibitList } from "../API";

export default function ExhibitPage() {
  const {pathname, setPathName} = useContext(AppContext);
  const [allExhibits, setAllExhibits] = useState([]);  // 전체 전시 저장
  const [curExhibits, setCurExhibits] = useState([]);  // 진행 중 전시 저장
<<<<<<< HEAD
  const [exhibitList, setExhibitList] = useState(curExhibits);  // 선택한 전시
=======
  const [exhibitList, setExhibitList] = useState([]);  // 선택한 전시

  const isLogin = mainstate((state)=>state.isLogin)
>>>>>>> 2acb543b3c566420704cd2956737a869d1617245

  const [selectBtn, setSelectBtn] = useState("cur");
  const navigate = useNavigate();

  async function getData() {
    try {
      await getAllExhibitList()
      .then(res => setAllExhibits(res))
      .catch(err=>console.log(err))

      await getCurExhibitList()
      .then(res=> {setCurExhibits(res); setExhibitList(res)})
      .catch(err=>console.log(err))

    } catch (err) {
      console.log(err)
    } 
  }

  useEffect(()=>{
<<<<<<< HEAD
    console.log('ExhibitPage')
    console.log(localStorage)
=======
    // console.log('ExhibitPage')
    // console.log(localStorage)
>>>>>>> 2acb543b3c566420704cd2956737a869d1617245
    getData()
  }, [])

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
            let exhibits = selectBtn==="cur"?curExhibits:allExhibits
            const filterExhibits = exhibits.filter(exhibit => exhibit.name.includes(searchExhibit))
            setExhibitList(filterExhibits)
          }}/>
<<<<<<< HEAD
          <div className="exhibitRegistBtn" onClick={()=>{
            navigate(`/exhibit/regist`); setPathName(window.location.pathname); window.scrollTo(0, 0)}}>전시회 등록
          </div>
        </div>
      </div>
      <div className="exhibitList">
        {exhibitList.map(exhibit=>( <Exhibit exhibitType={1} exhibit={exhibit}/> ))}
=======
          {isLogin?
          <div className="exhibitRegistBtn" onClick={()=>{
            navigate(`/exhibit/regist`); setPathName(window.location.pathname); window.scrollTo(0, 0)}}>전시회 등록
          </div>:<></>}
          
        </div>
      </div>
      <div className="exhibitList">
      {/* <Loading loadingType={"exhibitList"} />
      {exhibitList.map(exhibit=>( <Exhibit exhibitType={1} exhibit={exhibit}/> ))} */}
        {exhibitList.length?
          exhibitList.map(exhibit=>( <Exhibit exhibitType={1} exhibit={exhibit}/> ))
          :<Loading loadingType={"exhibitList"} />
        }
>>>>>>> 2acb543b3c566420704cd2956737a869d1617245
      </div>
    </div> 
  );
}
