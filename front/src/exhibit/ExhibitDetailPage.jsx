import { useLocation } from 'react-router-dom';
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

  let reviews = null;

  function createReview() {
    const today = new Date();
    const newToday = today.getFullYear() + "-" + String(today.getMonth()+1).padStart(2,'0') + "-" + String(today.getDate()).padStart(2,'0')
    const newReview = <Review userName="01524" todayDate={newToday} content={comment} />
    setComments([...comments, newReview])
  }
  
  return (
    <div>
      <div className="bodyCenter">
        {/* 전시회 포스터 */}
        <Exhibit exhibitType={2} exhibit={exhibit}/>
        <div style={{marginBottom:"30px"}}>
          <span className="boldFont">{exhibit.artist}</span>님의 전시회에 온 것을 환영합니다!<br/>
          아래 링크를 통해 <span className="boldFont">{exhibit.artist}</span>님의 예술 작품을 감상하고<br/>
          <span className="boldFont">{exhibit.artist}</span>로부터 직접 듣는 도슨트 서비스를 체험해보세요
        </div>

        {/* 전시회 설명 */}
        <div style={{width:"100%", height:"500px", color: "white", fontSize:"20px", backgroundColor:"#848484", borderRadius:"0.5rem", marginBottom:"30px"}}>
          전시회 설명
        </div>

        {/* 방명록 */}
        <div style={{fontSize:"20px", textAlign:"Left", width:"100%"}}>방명록 남기기</div>
        <div className="reviewArea">
          {/* <form onSubmit={(event)=>{
              event.preventDefault()
              createReview(comment)
              setComment("")
            }}> */}
            <textarea value={comment} placeholder="여기에 전시회에 대한 후기나 소감을 남길 수 있습니다. 최대 1000자 이내로 작성 가능합니다."
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
        {comments}
        <Review userName="작성자명" todayDate="2024-01-01" content="작성자가 적은 방명록 댓글"/>
        {/* <Review userName="작성자명" todayDate="2024-01-01" content="작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글 작성자가 적은 방명록 댓글"/> */}
        
      </div>

    </div>
  )
}