import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef, React } from "react";
import { AppContext } from "../../App";
import './Exhibit.css';

export default function Exhibit(props) {
  const [enterOpacity, setEnterOpacity] = useState(0);
  const [sYear, sMonth, sDay] = props.exhibit.start_time.split("T")[0].split("-");
  const [eYear, eMonth, eDay] = props.exhibit.end_time.split("T")[0].split("-");

  let period = "";
  if (sYear == eYear) {
    period = `${sYear}.${sMonth}.${sDay} - ${eMonth}.${eDay}`
  } else {
    period = `${sYear}.${sMonth}.${sDay} - ${eYear}.${eMonth}.${eDay}`
  }

  const navigate = useNavigate();
  const {setPathName} = useContext(AppContext);

  // const bannerxy = useRef(null);

  // const updateScroll = () => {
  //   setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  // };
  
  // useEffect(() => {
  //   window.addEventListener('scroll', updateScroll);
  //   return () => {
  //     window.removeEventListener('scroll', updateScroll);
  //   };
  // }, []);

  // useEffect(()=>{
  //   console.log('Exhibit')
  // }, [])

  
  switch (props.exhibitType) {
    case 1:  // 전시회 목록
      return (
        <div>
          <div className="exhibitCard1">
            <div className="exhibitImageCard1"
              onMouseOver={()=>{setEnterOpacity(1)}}
              onMouseOut={()=>{setEnterOpacity(0)}}
            >
              <img className="exhibitImage1" src={props.exhibit.image}></img>
              <div className="exhibitEnter1" style={{opacity : enterOpacity}} onClick={()=>{
                navigate(`/exhibit/${props.exhibit.id}`)
                setPathName(window.location.pathname)
                window.scrollTo(0, 0)
              }}>
                <div>입장하기</div>
              </div>
            </div>
            <div className="exhibitName1">{props.exhibit.name}</div>
            <div className="exhibitArtist1">{props.exhibit.author}</div>
            <div className="exhibitPeriod1">기간 | {period}</div>
            <div>
            </div>
          </div>
        </div>
      )

    case 2:  // 전시회 상세
      // console.log(bannerxy)
      return (
        <></>
      //   <div>
      //     <div className="exhibitCard2">
      //       <div className="exhibitImageCard2"
      //         onMouseOver={()=>{setEnterOpacity(1)}}
      //         onMouseOut={()=>{setEnterOpacity(0)}}
      //       >
      //         <img className="exhibitImage2" style={{width:375, height:500}} src={"../../"+props.exhibit.image}></img>
      //       </div>
      //       <div className="exhibitName2">{props.exhibit.name}</div>
      //       <div className="exhibitArtist2">{props.exhibit.author}</div>
      //       <div className="exhibitPeriod2">기간 | {period}</div>
      //       <div>
      //       </div>
      //     </div>
      // </div>


        // <div ref={bannerxy} style={{width:"100vw", height:"500px", display:"flex", margin:"40px 0"}}>
        // <div style={{width:"100vw", height:"500px", display:"flex", margin:"40px 0"}}>
        //   <div id="exhibitDetailBanner">
        //     <div style={{textAlign:"right"}}>
        //       <div style={{fontSize:"45px", fontWeight:"900"}}>{props.exhibit.name}</div>
        //       <div style={{fontSize:"25px", fontWeight:"600"}}>{props.exhibit.author}</div>
        //     </div>
        //   </div>
        //   <div style={{width:"30vw"}}>
        //     {/* <img className="exhibitImage2" style={{width:375, height:500, margin:"0 25px 0 40px"}} src={"../../"+props.exhibit.image}></img> */}
        //     <img className={scrollPosition>=50?"exhibitImage2":""} style={{width:375, height:500, margin:"0 25px 0 40px"}} src={"../../"+props.exhibit.image}></img>
        //   </div>
        //   <div style={{width:"35vw", backgroundColor:"gray"}}>
        //     <div style={{width:"25vw", height:"90%", marginLeft:"20px", display:"flex", alignItems:"flex=end"}}>{props.exhibit.detail}</div>
        //   </div>
        // </div>
      )
      
    case 3: // 전시회 등록
      return (
        <div>
          <div className="exhibitCard3">
            <div className="exhibitImageCard3">
              {props.exhibit.image}
            </div>
            <div className="exhibitName3">{props.exhibit.name}</div>
            <div className="exhibitArtist3">{props.exhibit.author}</div>
            <div className="exhibitPeriod3">기간 | {period}</div>
            <div>
            </div>
          </div>
        </div>
      )

    default:
      return(<></>)
      break;
  }
}