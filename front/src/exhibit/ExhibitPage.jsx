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

export default function ExhibitPage() {
  const {pathname, setPathName} = useContext(AppContext);
  const [isConnectAll, setIsConnectAll] = useState(false);  // API 연결 확인
  const [isConnectCur, setIsConnectCur] = useState(false);  // API 연결 확인
  const [allExhibits, setAllExhibits] = useState([]);  // 전체 전시 저장
  const [curExhibits, setCurExhibits] = useState([]);  // 진행 중 전시 저장
  const [searchV, setSearchV] = useState("")  // 검색 값
  const [showExhibits, setShowExhibits] = useState([]);  // 선택한 전시

  const isLogin = mainstate((state)=>state.isLogin)

  const [selectBtn, setSelectBtn] = useState("cur");
  const navigate = useNavigate();

  async function getData() {
    try {
      await getAllExhibitList()
      .then(res => {setAllExhibits(res); setIsConnectAll(true)})
      .catch(err=>console.log(err))

      await getCurExhibitList()
      .then(res=> {setCurExhibits(res); setShowExhibits(res); setIsConnectCur(true)})
      .catch(err=>console.log(err))

    } catch (err) {
      console.log(err)
    } 
  }

  useEffect(()=>{
    getData()
  }, [])

  return (
    <div>
      <div className="exhibitHeader">
        <div className="exhibitToggle">
          {/* 전체 */}
          <div className={"toggleBtn"+(selectBtn==="all"?" clickToggleBtn":"")} style={{width:65}} onClick={()=>{
            setSelectBtn("all"); setShowExhibits(allExhibits)
          }}>전체</div>

          {/* 진행 중인 전시 */}
          <div className={"toggleBtn"+(selectBtn==="cur"?" clickToggleBtn":"")} style={{width:140}} onClick={()=>{
            setSelectBtn("cur"); setShowExhibits(curExhibits)
          }}>진행 중인 전시</div>
        </div>

        <div className="exhibitHeaderRight">
          <Search 
            searchValue={searchV}
            setSearchValue={(search)=>setSearchV(search)}
            updateValues={(searchExhibit) => {
              let exhibits = selectBtn==="cur"?curExhibits:allExhibits
              const filterExhibits = exhibits.filter(exhibit => exhibit.name.includes(searchExhibit))
              if (!filterExhibits.length) {alert('일치하는 전시회가 없습니다.'); setShowExhibits(exhibits); return}
              setShowExhibits(filterExhibits)
          }}/>
          {isLogin?
          <div className="exhibitRegistBtn" onClick={()=>{
            navigate(`/exhibit/regist`); setPathName(window.location.pathname); window.scrollTo(0, 0)}}>전시회 등록
          </div>:<></>}
          
        </div>
      </div>
      <div className="exhibitList">
        {isConnectAll&&isConnectCur?
          // 1-1) all, cur 모두 api 연결 됐다면
          (showExhibits.length?
            // 2-1) exhibitList가 빈 배열이 아니라면
            showExhibits.map(exhibit=>( <Exhibit exhibitType={1} exhibit={exhibit}/> ))
            // 2-2) exhibitList가 빈 배열이라면
            :<div style={{width:"100%", textAlign:"center", paddingTop: "50px"}}>
              {selectBtn==="cur"?
              // 3-1) 진행중 버튼 클릭했을 때
              "진행 중인 전시회가 없습니다."
              // 3-2) 전체 버튼 클릭했을 때
              :"등록된 전시회가 없습니다."}
            </div>)
          // 1-2) all, cur 하나라도 api 연결 안 됐다면
          :<Loading loadingType={"exhibitList"} />
        }
      </div>
    </div> 
  );
}
