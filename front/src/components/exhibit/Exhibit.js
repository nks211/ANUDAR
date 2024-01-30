import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './Exhibit.css';

export default function Exhibit(props) {
  const [enterOpacity, setEnterOpacity] = useState(0);
  const [sYear, sMonth, sDay] = props.exhibit.start.split(" ")[0].split("-");
  const [eYear, eMonth, eDay] = props.exhibit.end.split(" ")[0].split("-");

  let period = "";
  if (sYear == eYear) {
    period = `${sYear}.${sMonth}.${sDay} - ${eMonth}.${eDay}`
  } else {
    period = `${sYear}.${sMonth}.${sDay} - ${eYear}.${eMonth}.${eDay}`
  }

  // const [isOnGoing, setIsOnGoing] = useState(false);
  // var startDate = new Date(props.exhibit.start);
  // var endDate = new Date(props.exhibit.end);
  // var currentDate = new Date();
  
  const navigate = useNavigate();

  // useEffect(()=>{
  //   if (currentDate >= startDate && currentDate <= endDate) {
  //     setIsOnGoing(true)
  //     // props.onGoing(true)
  //   }
  // }, [])
  


  // 전시회 목록
  if (props.exhibitType === 1) {
    return (
      <div>
        <div className="exhibitCard1">
          <div className="exhibitImageCard1"
            onMouseOver={()=>{setEnterOpacity(1)}}
            onMouseOut={()=>{setEnterOpacity(0)}}
          >
            <img className="exhibitImage1" style={{width:240, height:320}} src={"../../"+props.exhibit.image}></img>
            <div className="exhibitEnter1" style={{opacity : enterOpacity}} onClick={()=>{
              navigate(`/exhibit/${props.exhibit.id}`)
            }}>
              <div>입장하기</div>
            </div>
          </div>
          <p className="exhibitName1">{props.exhibit.title}</p>
          <p className="exhibitArtist1">{props.exhibit.artist}</p>
          <p className="exhibitPeriod1">기간 | {period}</p>
          <div>
          </div>
        </div>
      </div>
    )

  // 전시회 상세
  } else if (props.exhibitType === 2) {
    return (
      <div>
        <div className="exhibitCard2">
          <div className="exhibitImageCard2"
            onMouseOver={()=>{setEnterOpacity(1)}}
            onMouseOut={()=>{setEnterOpacity(0)}}
          >
            <img className="exhibitImage2" style={{width:375, height:500}} src={"../../"+props.exhibit.image}></img>
          </div>
          <p className="exhibitName2">{props.exhibit.title}</p>
          <p className="exhibitArtist2">{props.exhibit.artist}</p>
          <p className="exhibitPeriod2">기간 | {period}</p>
          <div>
          </div>
        </div>
      </div>
    )

  // 전시회 등록
  } else if (props.exhibitType === 3) {
    return (
      <div>
        <div className="exhibitCard3">
          <div className="exhibitImageCard3">
            {props.exhibit.image}
            {/* <img className="exhibitImage3" style={{width:300, height:400}} src={"../../"+props.exhibit.image}></img> */}
          </div>
          <p className="exhibitName3">{props.exhibit.title}</p>
          <p className="exhibitArtist3">{props.exhibit.artist}</p>
          <p className="exhibitPeriod3">기간 | {period}</p>
          <div>
          </div>
        </div>
      </div>
    )
  }
}