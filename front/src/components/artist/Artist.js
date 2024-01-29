import { useNavigate } from "react-router-dom";
import './Artist.css'

export default function Artist(props) {
  const navigate = useNavigate();
  
  return (
    <div className="artistCard">
      <div className="artistImage cursorPointer" onClick={()=>
        navigate(`/artist/${props.artistId}`)
        }>
        <img style={{width:300, height:300}} src={props.image}></img>
      </div>
      <div className="artistInfo">
        <div className="artistName fontWeightStrong cursorPointer" onClick={()=>
        navigate(`/artist/${props.artistId}`)
        }>{props.artistName}</div>
        <div className="artistExhibition"><span className="fontWeightStrong">대표전시</span> | {props.artistExhibition}</div>
        <div className="artistWork"><span className="fontWeightStrong">대표작품</span> | {props.artistWork}</div>
      </div>
    </div>
  )
}