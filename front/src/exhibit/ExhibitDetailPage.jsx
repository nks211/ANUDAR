import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Exhibit from "../components/exhibit/Exhibit";
import Review from "../components/exhibit/Review";
import dummy from "../db/data.json"
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

  let reviews = null;

  function createReview() {
    const today = new Date();
    const newToday = today.getFullYear() + "-" + String(today.getMonth()+1).padStart(2,'0') + "-" + String(today.getDate()).padStart(2,'0')
    const newReview = <Review userName={userName+(comments.length+1)} todayDate={newToday} content={comment} />
    setComments([...comments, newReview])
  }
  
  return (
    <div style={{width:"750px"}}>
      <div className="bodyCenter">
        {/* 캐러셀 */}
        <div style={{width:"100%", height:"500px", color: "white", fontSize:"20px", backgroundColor:"#848484", borderRadius:"0.5rem", marginBottom:"30px"}}>
          캐러셀
        </div>

        {/* 테스트 */}
        {/* <div style={{
          backgroundColor:"#000000",
          width: "1020px",
          height: "500px",
          marginBottom : "30px"
        }}></div> */}

        {/* 전시회 포스터, 설명 */}
        <div>
          <Exhibit exhibitType={2} exhibit={exhibit}/>
        {/* <div className="exhibitInfo"> */}
          {/* <img src={"../../"+exhibit.image} width={450} height={600}></img> */}
          <div style={{marginBottom:"30px"}}>
            <span className="boldFont">{exhibit.artist}</span>님의 전시회에 온 것을 환영합니다!<br/>
            아래 링크를 통해 <span className="boldFont">{exhibit.artist}</span>님의 예술 작품을 감상하고<br/>
            <span className="boldFont">{exhibit.artist}</span>로부터 직접 듣는 도슨트 서비스를 체험해보세요
          </div>
        </div>

        {/* 전시회 입장, 도슨트 입장 버튼 */}
        <div className="exhibitButtons">
          {/* *수정* : 전시회 입장 주소 .. */}
          <button onClick={()=>{navigate(`/exhibit/${exhibitId}/2`)}}>전시회 입장</button>
          {/* *수정* : API 연결 -> 도슨트ID로 입장! */}
          <button onClick={()=>{navigate(`/docent/${exhibitId}`)}}>도슨트 입장</button>
        </div>

        {/* 방명록 */}
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
        {/* <Review userName="작성자명" todayDate="2024-01-01" content="작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글"/> */}
        
      </div>

    </div>
  )
}