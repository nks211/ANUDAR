import { useLocation, useNavigate } from 'react-router-dom';
import { useContext , useState } from 'react';
import { AppContext } from '../App';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ExhibitDetail from "../components/exhibit/ExhibitDetail";
import Exhibit from "../components/exhibit/Exhibit";
import Review from "../components/exhibit/Review";
import dummy from "../db/data.json"
import './ExhibitPage.css'
import '../index.css'

export default function ExhibitDetailPage() {
  const exhibitId = useLocation().pathname.split('/').pop();
  const exhibit = dummy.exhibits[exhibitId]

  // *수정* : API 연결 -> 작성자명
  const userName = "작성자"
  
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [selectValue, setSelectValue] = useState("earliest");
  const navigate = useNavigate();
  const {setPathName} = useContext(AppContext);

  let reviews = null;

  const works = [];
  // for (let i=0; i<dummy.works.length; i++) {
  for (let i=0; i<10; i++) {
    works.push(dummy.works[i])
  }

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

  function createReview() {
    const today = new Date();
    const newToday = today.getFullYear() + "-" + String(today.getMonth()+1).padStart(2,'0') + "-" + String(today.getDate()).padStart(2,'0')
    const newReview = <Review userName={userName+(comments.length+1)} todayDate={newToday} content={comment} />
    setComments([...comments, newReview])
  }
  
  return (
    // <div style={{width:"750px"}}>
    <div>
      <div className="bodyCenter">
        <div style={{ transform: "translateX(2.5%)", height:"550px" }} className="exhibitContainer">
          <Slider {...setting}>
            {Object.values(works).map((work) => { 
              return (
                  // <img style={{width:"100%"}} src="../asset/exhibit_detail_carousel.png"/>
                <div style={{position:"relative"}}>
                  {/* <img src={}></img> */}
                  {/* <img style={{width:"1920px"}} src="../asset/exhibit_detail_carousel.png"/><img/> */}
                  <img style={{width:"750px"}} src="../asset/exhibit_carousel2.png"/><img/>
                  <div className="carousels"><img className="carouselImg" style={{width:"240px", height:"240px"}} src={"../"+work.image}/></div>
                </div>
              )})}
          </Slider>
        </div>

        {/* <div style={{width:"100vw", height:"50px", backgroundColor:"black"}}></div> */}

        {/* 전시회 포스터, 설명 */}
        <div>
          {/* <Exhibit exhibitType={2} exhibit={exhibit}/> */}
          <ExhibitDetail exhibitType={2} exhibit={exhibit}/>
        </div>

        {/* 전시회 입장, 도슨트 입장 버튼 */}
        <div className="exhibitButtons">
          {/* *수정* : 전시회 입장 주소 .. */}
          <button onClick={()=>{navigate(`/exhibit/${exhibitId}/2`); setPathName(window.location.pathname); window.scrollTo(0, 0)}}>전시회 입장</button>
          {/* *수정* : API 연결 -> 도슨트ID로 입장! */}
          <button onClick={()=>{navigate(`/docent/${exhibitId}`); setPathName(window.location.pathname); window.scrollTo(0, 0)}}>도슨트 입장</button>
        </div>

        {/* 방명록 */}
        <div style={{width:"750px"}}>
          <div style={{fontSize:"20px", textAlign:"Left", width:"100%"}}>방명록 남기기</div>
          <div className="reviewArea">
            {/* <form onSubmit={(event)=>{
                event.preventDefault()
                createReview(comment)
                setComment("")
              }}> */}
  
              {/* *수정* 댓글 등록 후 기존 내용 지우기 */}
              <textarea 
                // value={comment} 
                placeholder="여기에 전시회에 대한 후기나 소감을 남길 수 있습니다. 최대 1000자 이내로 작성 가능합니다."
                onChange={(event)=> {
                  setComment(event.target.value)
                }}>
              </textarea>
              <button onClick={(event)=>{
                event.preventDefault()
                createReview(comment)
                setComment("")
              }}>등록하기</button>
            {/* </form> */}
          </div>
          {/* *수정* 정렬 기능 구현 */}
          <div className="selectReviews">
            <select 
              // value={selectValue} 
              // onChange={(event)=>{
              //   if (selectValue !== event.target.value) {
              //     setComment(comments.reverse())
              //   }
              //   setSelectValue(event.target.value)}} 
              style={{width:"80px", padding:"2px 4px"}}>
              <option value="earliest">오래된 순</option>
              <option value="latest">최신 순</option>
            </select>
          </div>
          {comments}
          <Review userName="작성자명" todayDate="2024-01-01" content="작성자가 적은 방명록 댓글"/>
        </div>

        {/* 전시회 입장, 도슨트 입장 버튼 */}
        <div className="detailPageBtns">
          <div onClick={()=>{navigate(`/exhibit/${exhibitId}/2`); setPathName(window.location.pathname); window.scrollTo(0, 0)}}><img src="../../asset/btn_enter_exhibit.png"></img>전시회 입장</div>
          <div onClick={()=>{navigate(`/docent/${exhibitId}`); setPathName(window.location.pathname); window.scrollTo(0, 0)}}><img src="../../asset/btn_enter_docent.png"></img>도슨트 입장</div>
          <div><img src={"../../asset/btn_like"+(("찜한상태이면")?"_cancel":"")+".png"}></img>{"찜한상태이면"?"찜취소":"찜하기"}</div>
        </div>
      </div>


    </div>
  )
}