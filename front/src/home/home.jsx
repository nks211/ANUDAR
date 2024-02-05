import { React } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ExhibitionItem from "../components/work/exhibitionitem";
import WorkItem from "../components/work/workitem";

const homecarousel = [
    "../asset/carousel_1.png",
    "../asset/carousel_2.png",
    "../asset/carousel_3.png",
    "../asset/carousel_4.png",
    "../asset/carousel_5.png",
];

// const test = [
//     1,
//     22,
//     333,
//     4444,
//     55555,
//     6666,
//     777,
//     88,
//     9,
//     1000000000000
// ];

const setting = {
    dots: true,
    dotsClass: "slidedots",
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

// const customsetting = {
//     dots: true,
//     infinite: true,
//     speed: 300,
//     slidesToShow: 1,
//     slidesToScroll: 1,
// }

const exhibitionNow = [
    {
        url: "../../asset/pic1.png",
    },
    {
        url: "../../asset/pic2.png",
    },
    {
        url: "../../asset/pic3.png",
    },
];

const worksthisweek = [
    {
        url: "../../asset/work1.jpg",
    },
    {
        url: "../../asset/work3.jpg",
    },
    {
        url: "../../asset/work5.jpg",
    },
    {
        url: "../../asset/work2.jpg",
    },
    {
        url: "../../asset/work6.jpg",
    },
    {
        url: "../../asset/work8.jpg",
    }
]

function Home() {

    const navigate = useNavigate();

    return (
        <div>
            <div style={{ transform: "translateX(2.5%)" }} className="container">
                <Slider {...setting}>
                    <div><img src={homecarousel[0]} /></div>
                    <div><img src={homecarousel[1]} /></div>
                    <div><img src={homecarousel[2]} /></div>
                    <div><img src={homecarousel[3]} /></div>
                    <div><img src={homecarousel[4]} /></div>
                </Slider>
            </div>

            {/* <div style={{ width: "600px", height: "300px", backgroundColor: "#0000fd" }}>
                <Slider {...customsetting}>
                    {Object.values(test).map((value, i) => { return <div><div style={{ width: "100%", height: "300px", display: "flex", justifyContent: "center", alignItems: "center", }}><div style={{ width: "200px", height: "200px", color: "#000000", fontSize: "20px", display: "flex", justifyContent: "center", alignItems: "center", border: "3px #ffffff solid" }}>{value}     {i}</div></div></div>; })}
                </Slider>
            </div> */}

            <div style={{ margin: "40px 80px", }}>
                <div className="nowadays">진행 중인 전시회</div>
                <div onClick={() => { navigate("/exhibit"); window.scrollTo(0, 0) }} className="nowdetails">더보기 &gt;</div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", }}>
                    {Object.values(exhibitionNow).map((value) => { return <ExhibitionItem width="330px" height="450px" exhibition={value} /> })}
                </div>
            </div>
            <div style={{ margin: "40px 80px", }}>
                <div className="nowadays">금주의 작품</div>
                <div onClick={() => { navigate("/work"); window.scrollTo(0, 0) }} className="nowdetails">더보기 &gt;</div>
                <div style={{ display: "flex", justifyContent: "center" }}>

                    <div style={{ width: "1000px", }}>
                        <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-between", }}>
                            {Object.values(worksthisweek).map((value) => { return <WorkItem width="300px" height="300px" work={value} /> })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;