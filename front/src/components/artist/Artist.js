import { useNavigate } from "react-router-dom";
import './Artist.css'

export default function Artist(props) {
  const navigate = useNavigate();
  
  return (
    <div className="artistCard">
      <div className="artistImage cursorPointer" onClick={()=>
        navigate(`/artist/${props.artistId}`)
        }>
        <img style={{width:300, height:300, "object-fit": "cover"}} src={props.image}></img>
      </div>
      <div className="artistInfo">
        <div className="artistName boldFont cursorPointer" onClick={()=>
        navigate(`/artist/${props.artistId}`)
        }>{props.artistName}</div>
        <div className="artistExhibit"><span className="boldFont">대표전시</span> | {props.artistExhibit.join(", ")}</div>
        <div className="artistWork"><span className="boldFont">대표작품</span> | {props.artistWork.join(", ")}</div>
      </div>
    </div>
  )
}