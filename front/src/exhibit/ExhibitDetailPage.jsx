import { useLocation, useNavigate } from 'react-router-dom';
import { useContext , useEffect, useState } from 'react';
import { AppContext } from '../App';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ExhibitDetail from "../components/exhibit/ExhibitDetail";
import Exhibit from "../components/exhibit/Exhibit";
import Reviews from '../components/exhibit/Reviews';
import dummy from "../db/data.json"
import './ExhibitPage.css'
import '../index.css'
<<<<<<< HEAD
import { getExhibitDetail } from '../API';
import { mainstate } from '../StateManagement';
=======
import { getExhibitDetail, getLikeExhibit } from '../API';
import { mainstate } from '../StateManagement';
import Like from '../components/like/Like';
>>>>>>> 2acb543b3c566420704cd2956737a869d1617245

export default function ExhibitDetailPage() {
  const exhibitId = useLocation().pathname.split('/').pop();
  const [exhibit, setExhibit] = useState({})
  const [works, setWorks] = useState([])
<<<<<<< HEAD
  const loginuser = mainstate(state => state.loginuser);

  async function getData() {
    try {
      const res = await getExhibitDetail(exhibitId)
      setExhibit(res)
      setWorks(res.workList)
      // console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    getData()
  }, [])

  const userName = loginuser.nickname
  
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [selectValue, setSelectValue] = useState("earliest");

  const navigate = useNavigate();
  const {setPathName} = useContext(AppContext);

  let reviews = null;

=======
  const logintoken = mainstate((state) => (state.logintoken))

  const [isLike, setIsLike] = useState(false)

  const changeLike = (value) => {
    setIsLike(value)
  }

  // 전시 상세 정보 조회
  async function getData() {
    try {
      const res = await getExhibitDetail(exhibitId)
      setExhibit(res)
      setWorks(res.workList)
    } catch (err) {
      console.log(err)
    }
  }

  // 전시 찜 목록 조회
  async function getLike() {
    try {
      const res = await getLikeExhibit(logintoken)
      const findExhibit = res.filter(exhibit => exhibit.id === Number(exhibitId))
      if (findExhibit.length) { setIsLike(true); return }
      setIsLike(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    getData()
    getLike()
  }, [])

  const navigate = useNavigate();
  const {setPathName} = useContext(AppContext);

>>>>>>> 2acb543b3c566420704cd2956737a869d1617245
  // const works = exhibit.workList

  // 캐러셀
  const setting = {
    dots: false,
    dotsClass: "slidedots",
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
<<<<<<< HEAD

  function createReview() {
    const today = new Date();
    const newToday = today.getFullYear() + "-" + String(today.getMonth()+1).padStart(2,'0') + "-" + String(today.getDate()).padStart(2,'0')
    const newReview = <Review userName={userName} todayDate={newToday} content={comment} />
    setComments([...comments, newReview])
  }
=======
>>>>>>> 2acb543b3c566420704cd2956737a869d1617245
  
  return (
    <div>
      <div className="bodyCenter">
        <div style={{ transform: "translateX(2.5%)", height:"550px" }} className="exhibitContainer">
          <Slider {...setting}>
            {Object.values(works).map((work) => { 
              return (
                <div style={{position:"relative"}}>
                <img style={{width:"750px"}} src="../asset/exhibit_carousel2.png"/><img/>
                <div className="carousels"><img className="carouselImg" style={{width:"240px", height:"240px"}} src={work.image}/></div>
                </div>
              )})}
          </Slider>
        </div>

        {/* 전시회 포스터, 설명 */}
        <div>
          {/* <Exhibit exhibitType={2} exhibit={exhibit}/> */}
          <ExhibitDetail exhibitType={2} exhibit={exhibit}/>
        </div>

<<<<<<< HEAD
        {/* 전시회 입장, 도슨트 입장 버튼 */}
        <div className="exhibitButtons">
          {/* *수정* : 전시회 입장 주소 .. */}
          <button onClick={()=>{navigate(`/exhibit/${exhibitId}/2`); setPathName(window.location.pathname); window.scrollTo(0, 0)}}>전시회 입장</button>
          <button onClick={()=>{navigate(`/docent/${exhibitId}`); setPathName(window.location.pathname); window.scrollTo(0, 0)}}>도슨트 입장</button>
        </div>

=======
>>>>>>> 2acb543b3c566420704cd2956737a869d1617245
        {/* 방명록 */}
        <Reviews exhibitId={exhibitId} />

        {/* 전시회 입장, 도슨트 입장 버튼 */}
        <div className="detailPageBtns">
          <div onClick={()=>{navigate(`/exhibit/${exhibitId}/2`); setPathName(window.location.pathname); window.scrollTo(0, 0)}}><img src="../../asset/btn_enter_exhibit.png"></img>전시회 입장</div>
          <div onClick={()=>{navigate(`/docent/${exhibitId}`); setPathName(window.location.pathname); window.scrollTo(0, 0)}}><img src="../../asset/btn_enter_docent.png"></img>도슨트 입장</div>
          <Like id={exhibitId} icon="asset/btn_like" likeType="exhibit" isLike={isLike} name={isLike?"찜취소":"찜하기"} onChangeLike={changeLike} />
        </div>
      </div>


    </div>
  )
}