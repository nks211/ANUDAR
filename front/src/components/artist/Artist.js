import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { useContext } from "react";
import './Artist.css'

export default function Artist(props) {
  const navigate = useNavigate();
  const {setPathName} = useContext(AppContext);
  
  return (
    <div className="artistCard">
      <div className="artistImage cursorPointer" onClick={()=>{
        navigate(`/artist/${props.artist.username}`)
        setPathName(window.location.pathname)
        window.scrollTo(0, 0)
        }}>
        <img style={{width:300, height:300, "object-fit": "cover"}} src={props.artist.image}></img>
      </div>
      <div className="artistInfo">
        <div className="artistName boldFont cursorPointer" onClick={()=> {
          navigate(`/artist/${props.artist.username}`)
          setPathName(window.location.pathname)
          window.scrollTo(0, 0)
        }
        }>{props.artist.name}</div>
        {/* <div className="artistExhibit"><span className="boldFont">대표전시</span> | {props.artistExhibit.join(", ")}</div>
        <div className="artistWork"><span className="boldFont">대표작품</span> | {props.artistWork.join(", ")}</div> */}
      </div>
    </div>
  )
}