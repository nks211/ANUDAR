import './Review.css'

export default function Review(props) {
  return (
    <div>
      <div className="reviewContainer">
        <div className="reviewBox">
          <div className="reviewCreate">
            <div className="reviewWriter">{props.userName}</div>
            <div className="reviewDate">{props.todayDate}</div>
          </div>
          <div className="reviewDelete">삭제</div>
        </div>
        <div className="reviewContent">{props.content}</div>
      </div>
    </div>
  )
}