import { React, useContext, useState } from "react";
import Modal from "react-modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./auction.css";
import "../components/myinfo/myhistory/myhistory.css";
import { works } from "../components/myinfo/myhistory/myhistory";
import ExhibitionItem from "../components/work/exhibitionitem";
import WorkItem from "../components/work/workitem";
import ModalPopup from "../components/modal/modalpopup";
import { AppContext } from "../App";

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

const sample = <div style={{ height: "150px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
    <input type="text" placeholder="아이디" />
    <input type="password" placeholder="비밀번호"/>
</div>;

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

    const [popupopen, setPopupOpen] = useState(false);
    const { modalsetting } = useContext(AppContext);

    return (
        <div>
            <Modal isOpen={popupopen} style={modalsetting} onRequestClose={() => { setPopupOpen(false); }}>
                <ModalPopup title="이것은 모달창 제목입니다" detail="이것은 모달창 세부 설명입니다" content={<div style={{ height: "100px", border: "1px solid" }}>이것은 모달창 콘텐츠 공간입니다</div>} okfunction={() => { setPopupOpen(false); }} okbutton={true} okbuttonlabel="확인" cancelbutton={false} cancelbuttonlabel="취소"/>
            </Modal>
            <img onClick={() => { setPopupOpen(true); }} style={{ cursor: "pointer" }} src="../asset/auction_entrance.png" />
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