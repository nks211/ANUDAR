import { React, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import Slider from "react-slick";
import "./home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ExhibitionItem from "../components/work/exhibitionitem";
import WorkItem from "../components/work/workitem";
import Exhibit from "../components/exhibit/Exhibit";
import Work from "../components/work/Work";
import { getCurExhibitList, getWorks } from "../API";

const homecarousel = [
  "../asset/carousel1.png",
  "../asset/carousel2.png",
  "../asset/carousel3.png",
  "../asset/carousel4.png",
];

const setting = {
  // dots: true,
  dots: false,
  dotsClass: "slidedots",
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

export default function Home() {

  const navigate = useNavigate();
  const { setPathName } = useContext(AppContext);
  const [exhibitionnow, setExhibitNow] = useState([]);
  const [worksnow, setWorksNow] = useState([]);


  const exhibitresult = async () => { return await getCurExhibitList() };
  const worksresult = async () => { return await getWorks() };
  useEffect(() => {
    exhibitresult().then((value) => {
      const homeresult = value && value.length > 3 ? value.slice(undefined, 3) : value;
      setExhibitNow(homeresult);
    });
    worksresult().then((value) => {
      const homeresult = value && value.length > 6 ? value.slice(undefined, 6) : value;
      setWorksNow(homeresult);
    })
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", width: "100vw" }}>
        <div className="container">
          <Slider {...setting}>
            <div>
              <img src={homecarousel[0]} />
              {/* <div style={{backgroundColor:"#967E76", width:"100%", height:"100%"}}></div> */}
            </div>
            <div><img src={homecarousel[1]} /></div>
            <div><img src={homecarousel[2]} /></div>
            <div><img src={homecarousel[3]} /></div>
          </Slider>
        </div>
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          <div style={{ width: "1050px", display: "flex", justifyContent: "space-between", marginTop:"60px" }}>
            <div className="nowadays">진행 중인 전시</div>
            <div onClick={() => { navigate("/exhibit"); localStorage.setItem("currenttab", "전시회"); setPathName(window.location.pathname); window.scrollTo(0, 0) }} className="nowdetails">더보기 &gt;</div>
          </div>
          <div style={{ width: "1050px" }}>
            <div style={{ display: "flex", flexDirection: "row wrap" }}>
              {Object.values(exhibitionnow).map((value) => { return <Exhibit exhibitType={2} exhibit={value} /> })}
            </div>
          </div>

          <div style={{ width: "1050px", display: "flex", justifyContent: "space-between", marginTop:"60px" }}>
            <div className="nowadays">이달의 작품</div>
            <div onClick={() => { navigate("/work"); localStorage.setItem("currenttab", "작품"); setPathName(window.location.pathname); window.scrollTo(0, 0) }} className="nowdetails">더보기 &gt;</div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "960px" }}>
              <div style={{ display: "flex", flexFlow: "row wrap" }}>
                {Object.values(worksnow).map((value) => { return <Work className="Work" workType={2} work={value} /> })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}