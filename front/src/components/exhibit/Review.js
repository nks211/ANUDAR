import { deleteReview } from '../../API';
import { mainstate } from '../../StateManagement';
import './Review.css'

export default function Review(props) {
  const logintoken = mainstate((state) => (state.logintoken))

  async function deleteRv() {
    try {
      const reviewId = props.comment?.id
      const res = await deleteReview(reviewId, logintoken)
      console.log(res)
    } catch (err) {
      console.log(err)
    }


  }

  return (
    <div>
      <div className="reviewContainer">
        <div className="reviewBox">
          <div className="reviewCreate">
            <div className="reviewWriter">{props.comment?.user}</div>
            {/* <div className="reviewDate">{props.comment?.createdAt.slice(0, 10)}</div> */}
            <div className="reviewDate">{props.comment?.createdAt}</div>
          </div>
          <div className="reviewDelete" onClick={()=>{
              if (window.confirm("삭제하시겠습니까?")) {
                deleteRv()
              } else {
                alert("취소되었습니다.")
              }
            }}>삭제</div>
        </div>
        <div className="reviewContent">{props.comment?.content}</div>
      </div>
    </div>
  )
}