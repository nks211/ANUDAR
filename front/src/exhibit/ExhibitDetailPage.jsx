import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ExhibitDetail from "../components/exhibit/ExhibitDetail";
import Reviews from '../components/exhibit/Reviews';
import Like from '../components/like/Like';
import { getExhibitDetail, getLikeExhibit } from '../API';
import { mainstate } from '../StateManagement';
import './ExhibitPage.css'
import '../index.css'

export default function ExhibitDetailPage() {
  const exhibitId = useLocation().pathname.split('/').pop();
  const [exhibit, setExhibit] = useState({})
  const [works, setWorks] = useState([])
  const logintoken = mainstate((state) => (state.logintoken))
  const loginuser = mainstate((state) => (state.loginuser))
  const isLogin = mainstate((state) => state.isLogin)

  const [isLike, setIsLike] = useState(false)
  const [likeButton, setLikeButton] = useState(<></>);

  const changeLike = (value) => {
    setIsLike(value)
  }

  // 전시 상세 정보 조회
  async function getData() {
    try {
      const res = await getExhibitDetail(exhibitId)
      setExhibit(res)
      setWorks(res.workList.filter(work => (work.is_carousel === true)))
      if (res.author?.username !== loginuser.username) {
        setLikeButton(<Like id={exhibitId} icon="asset/btn_like" likeType="exhibit" isLike={isLike} name={isLike ? "찜취소" : "찜하기"} onChangeLike={changeLike} />)
      }
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

  useEffect(() => {
    getData()
    getLike()
  }, [])

  useEffect(() => {
    if (exhibit.author?.username !== loginuser.username) {
      setLikeButton(<Like id={exhibitId} icon="asset/btn_like" likeType="exhibit" isLike={isLike} name={isLike ? "찜취소" : "찜하기"} onChangeLike={changeLike} />)
    }
  }, [isLike])

  const navigate = useNavigate();
  const { setPathName } = useContext(AppContext);

  // 캐러셀
  const setting = {
    dots: true,
    dotsClass: "slidedots",
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div style={{ width: "100%", display: "block", overflowX: "visible" }}>
      <div className="exhibitDetailCarousel" style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ transform: "translateX(2.5%)", height: "550px" }} className="exhibitContainer">
          <Slider {...setting}>
            {Object.values(works).map((work) => {
              return (
                <div style={{ position: "relative" }}>
                  <img style={{ width: "750px" }} src="../asset/exhibit_carousel2.png" /><img />
                  <div className="carousels"><img className="carouselImg" style={{ width: "240px", height: "240px" }} src={work.image} /></div>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>

      {/* 전시회 포스터, 설명 */}
      <div style={{overflowX: "visible"}}>
        <ExhibitDetail exhibit={exhibit} />
        {/* 이 부분은 수정해야함 .. */}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop:"50px" }}>
        {/* 방명록 */}
        {logintoken ?
          <Reviews exhibitId={exhibitId} />
          : <div style={{ width: "750px", height: "200px" }}>
            <div style={{ fontSize: "20px", fontWeight: 900, textAlign: "Left", width: "100%" }}>방명록 남기기</div>
            <div style={{ width: "100%", height: "100%", display: "flex", "align-items": "center", "justify-content": "center" }}>로그인 후 이용해주세요</div>
          </div>
        }

        {/* 전시회 입장, 도슨트 입장 버튼 */}
        <div className="detailPageBtns">
          <div onClick={() => { navigate(`/exhibit/${exhibitId}/2`); setPathName(window.location.pathname); window.scrollTo(0, 0) }}><img src="../../asset/btn_enter_exhibit.png"></img>전시회 입장</div>
          <div onClick={() => {
            if (!isLogin) { alert('로그인 후 이용해주세요'); return }
            navigate(`/docent/${exhibitId}`); setPathName(window.location.pathname); window.scrollTo(0, 0)
          }}>
            <img src="../../asset/btn_enter_docent.png" />
            도슨트 입장
          </div>
          {likeButton}
        </div>
      </div>
    </div>
  )
}