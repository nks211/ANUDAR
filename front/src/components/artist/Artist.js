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
<<<<<<< HEAD
=======
        {/* <img src="../../asset/icon_mail.png" width={22} height={22} /> */}
        <div className="artistExhibit"><img src="../../asset/icon_mail.png" width={15} height={15} /> {props.artist.email}</div>
        <div className="artistExhibit"><img src="../../asset/icon_phone.png" width={15} height={15} /> {props.artist.phone}</div>
        {/* <div className="artistExhibit"><span className="boldFont">대표전시</span> | {props.artist.email}</div> */}
>>>>>>> 2acb543b3c566420704cd2956737a869d1617245
        {/* <div className="artistExhibit"><span className="boldFont">대표전시</span> | {props.artistExhibit.join(", ")}</div>
        <div className="artistWork"><span className="boldFont">대표작품</span> | {props.artistWork.join(", ")}</div> */}
      </div>
    </div>
  )
}