import { React } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./auction.css";
import "../components/myinfo/myhistory/myhistory.css";
import { works } from "../components/myinfo/myhistory/myhistory";
import ExhibitionItem from "../components/work/exhibitionitem";
import WorkItem from "../components/work/workitem";

const test = [
    {
        url: "../../asset/work3.jpg",
    },
    {
        url: "../../asset/work2.jpg",
    },
    {
        url: "../../asset/work4.jpg",
    },
    {
        url: "../../asset/work5.jpg",
    },
    {
        url: "../../asset/work7.jpg",
    },
    {
        url: "../../asset/work8.jpg",
    },
    {
        url: "../../asset/work9.jpg",
    },
    {
        url: "../../asset/work1.jpg",
    },
];

const auctionworksetting = {
    className: "slickwork",
    infinite: true,
    focusOnSelect: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    prevArrow: <img src="../asset/prev_arrow.png" />,
    nextArrow: <img src="../asset/next_arrow.png" />,
}

function Auction() {
    return (
        <div>
            <img onClick={() => {  }} style={{ cursor: "pointer" }} src="../asset/auction_entrance.png" />
            <div style={{ position: "relative", textAlign: "end", color: "#848484", }}>클릭하면 경매장으로 이동합니다.</div>
            <div className="auctionworkarea">
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Slider {...auctionworksetting}>
                        {Object.values(test).map((value) => { return <div><div style={{ width: "400px", height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}><WorkItem width="300px" height="300px" work={value} /></div></div>; })}
                    </Slider>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", position: "relative", top: "60px" }}>
                <div className="dataarea">
                    {Object.values(works).map((value) => { return <ExhibitionItem width="250px" height="250px" exhibition={value} /> })}
                </div>
            </div>
        </div>
    );
}

export default Auction;