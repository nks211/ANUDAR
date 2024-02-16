import { createContext, useEffect, useState } from 'react';
import { mainstate } from '../../StateManagement';
import Review from "./Review"
import { readReview, createReview } from '../../API';
import Loading from '../loading/Loading';

export const ReviewsContext = createContext();
export default function Reviews(props) {
  const logintoken = mainstate((state) => (state.logintoken))
  const exhibitId = props.exhibitId

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showRv, setShowRv] = useState();

  async function createRv(data) {
    try {
      const res = await createReview(exhibitId, data, logintoken)
      readRv()
      console.log(res)
      
    } catch (err) {
      console.log(err)
    }
  }

  async function readRv() {
    try {
      const res = await readReview(exhibitId)
      console.log(res.length)
      setComments(res)
      setShowRv(res.map(comment=><Review comment={comment}/>))
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(()=> {
    readRv()
  }, [])


  return (
    <>
    <ReviewsContext.Provider value={{readRv}}>
      <div style={{ width: "750px" }}>
        <div style={{ fontSize: "20px", fontWeight: 900, textAlign: "Left", width: "100%" }}>방명록 남기기</div>
        <div className="reviewArea">
          <textarea
            value={comment} 
            maxLength={255}
            placeholder="전시회에 대한 후기나 소감을 남겨주세요! 최대 255자 작성 가능합니다."
            onChange={(event) => {
              setComment(event.target.value)
            }}>
          </textarea>
          <div style={{display:"flex", alignItems: "flex-end"}}>

            <span>{comment.length}/255</span>
            <button onClick={(event) => {
              event.preventDefault()
              createRv(comment)
              setComment("")
            }}>등록하기</button>
          </div>
        </div>
        <div style={{minHeight:"150px"}}>
          {showRv===undefined?
            <Loading loadingType={"dot"}/>
            :(comments.length?showRv:<div>작성된 댓글이 없습니다.</div>)
          }
        </div>
      </div>
    </ReviewsContext.Provider>
    </>
  )
}