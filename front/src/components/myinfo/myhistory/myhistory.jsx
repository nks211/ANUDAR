import { React, useState, useRef, useContext } from "react";
import "./myhistory.css";
import ExhibitionItem from "../../work/exhibitionitem";
import WorkItem from "../../work/workitem";
import { MypageContext } from "../../../mypage/mypage";

const exhibitions = [
    {
        url: "../../asset/pic1.png",
        title: "전시회 1",
        artist: "주최자 1",
        period: "2024.01",
    },
    {
        url: "../../asset/pic2.png",
        title: "전시회 2",
        artist: "주최자 2",
        period: "2024.01",
    },
    {
        url: "../../asset/pic3.png",
        title: "전시회 3",
        artist: "주최자 3",
        period: "2024.01",
    },
    {
        url: "../../asset/pic4.png",
        title: "전시회 4",
        artist: "주최자 4",
        period: "2024.01",
    },
    {
        url: "../../asset/pic5.png",
        title: "전시회 5",
        artist: "주최자 5",
        period: "2024.01",
    },
    {
        url: "../../asset/pic6.png",
        title: "전시회 6",
        artist: "주최자 6",
        period: "2024.01",
    },
];

const works = [
    {
        url: "../../asset/work3.jpg",
        title: "작품 1",
        artist: "작가 1",
    },
    {
        url: "../../asset/work6.jpg",
        title: "작품 2",
        artist: "작가 2",
    },
    {
        url: "../../asset/work9.jpg",
        title: "작품 3",
        artist: "작가 3",
    },
    {
        url: "../../asset/work3.jpg",
        title: "작품 1",
        artist: "작가 1",
    },
    {
        url: "../../asset/work6.jpg",
        title: "작품 2",
        artist: "작가 2",
    },
    {
        url: "../../asset/work9.jpg",
        title: "작품 3",
        artist: "작가 3",
    },
    {
        url: "../../asset/work3.jpg",
        title: "작품 1",
        artist: "작가 1",
    },
    {
        url: "../../asset/work6.jpg",
        title: "작품 2",
        artist: "작가 2",
    },
    {
        url: "../../asset/work9.jpg",
        title: "작품 3",
        artist: "작가 3",
    },
];

const auctions = [
    {
        url: "../../asset/work5.jpg",
        title: "수련",
        artist: "클로드 모네",
        auctionmoney: "KRW 2,000,000",
    },
    {
        url: "../../asset/work5.jpg",
        title: "수련",
        artist: "클로드 모네",
        auctionmoney: "KRW 2,000,000",
    },
    {
        url: "../../asset/work5.jpg",
        title: "수련",
        artist: "클로드 모네",
        auctionmoney: "KRW 2,000,000",
    },
    {
        url: "../../asset/work5.jpg",
        title: "수련",
        artist: "클로드 모네",
        auctionmoney: "KRW 2,000,000",
    },
    {
        url: "../../asset/work5.jpg",
        title: "수련",
        artist: "클로드 모네",
        auctionmoney: "KRW 2,000,000",
    },
];

const toggleswitch = (toggle) => { return toggle ? <img src="../../asset/list_unwrapped.png" /> : <img src="../../asset/list_wrapped.png" />; }
const filterswitch = (toggle, index) => { return (!toggle && index >= 3) ? "none" : "flex" }

function MyHistory() {

    const [exhibitionswitch, setExhibitionSwitch] = useState(false);
    const [workswitch, setWorkSwitch] = useState(false);
    const [followswitch, setFollowSwitch] = useState(false);
    const [auctionswitch, setAuctionSwitch] = useState(false);
    const [myexhibitionswitch, setMyExhibitionSwitch] = useState(false);
    const [myworkswitch, setMyWorkSwitch] = useState(false);

    const { scrollref } = useContext(MypageContext);

    return (
        <>
            <div>
                <div className="myfavorites">FAVORITES</div>
                <div className="historytitle" ref={(spot) => (scrollref.current[0] = spot)}>
                    <div>찜한 전시회</div>
                    <div className="dataarea">
                        <div>{Object.values(exhibitions).map((value, i) => (<ExhibitionItem style={{ display: filterswitch(exhibitionswitch, i) }} key={i} exhibition={value} />))}</div>
                    </div>
                    <div onClick={() => { setExhibitionSwitch(!exhibitionswitch); }}>{toggleswitch(exhibitionswitch)}</div>
                </div>
                <div className="historytitle" ref={(spot) => (scrollref.current[1] = spot)}>
                    <div>찜한 작품</div>
                    <div className="dataarea">
                        <div>{Object.values(works).map((value, i) => (<WorkItem style={{ display: filterswitch(workswitch, i) }} key={i} work={value} />))}</div>
                    </div>
                    <div onClick={() => { setWorkSwitch(!workswitch); }}>{toggleswitch(workswitch)}</div>
                </div>
                <div className="historytitle" ref={(spot) => (scrollref.current[2] = spot)}>
                    <div>팔로우한 작가</div>
                    <div className="dataarea">
                        <div>
                            <WorkItem style={{ display: filterswitch(followswitch, 0) }} work={{ url: "../../asset/artist1.png", title: "클로드 모네", }} />
                            <WorkItem style={{ display: filterswitch(followswitch, 1) }} work={{ url: "../../asset/artist2.png", title: "잭슨 폴록", }} />
                            <WorkItem style={{ display: filterswitch(followswitch, 2) }} work={{ url: "../../asset/artist3.png", title: "프리다 칼로", }} />
                            <WorkItem style={{ display: filterswitch(followswitch, 3) }} work={{ url: "../../asset/artist1.png", title: "클로드 모네", }} />
                            <WorkItem style={{ display: filterswitch(followswitch, 4) }} work={{ url: "../../asset/artist2.png", title: "잭슨 폴록", }} />
                            <WorkItem style={{ display: filterswitch(followswitch, 5) }} work={{ url: "../../asset/artist3.png", title: "프리다 칼로", }} />
                        </div>
                    </div>
                    <div onClick={() => { setFollowSwitch(!followswitch); }}>{toggleswitch(followswitch)}</div>
                </div>
            </div>
            <div>
                <div className="myauction">AUCTION</div>
                <div className="historytitle" ref={(spot) => (scrollref.current[3] = spot)}>
                    <div>경매 내역</div>
                    <div>
                        <table>
                            <thead>
                            </thead>
                            <tbody>
                                <div style={{ backgroundColor: "#eee3cb", height: "60px", display: "flex", justifyContent: "center", alignItems: "center", }}>
                                    <td className="auctionimage">작품</td>
                                    <td className="auctionname">이름</td>
                                    <td className="auctionartist">작가</td>
                                    <td className="auctionmoney">입찰가</td>
                                </div>
                                {Object.values(auctions).map((auction, i) => {
                                    return <tr style={{ textAlign: "center", display: filterswitch(auctionswitch, i), alignItems: "center", height: "80px" }}>
                                        <td className="auctionimage">{<img width="50px" height="50px" src={auction.url} />}</td>
                                        <td className="auctionname">{auction.title}</td>
                                        <td className="auctionartist">{auction.artist}</td>
                                        <td className="auctionmoney">{auction.auctionmoney}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div onClick={() => { setAuctionSwitch(!auctionswitch); }}>{toggleswitch(auctionswitch)}</div>
                </div>
            </div>
            <div>
                <div className="myartist">ARTIST</div>
                <div className="historytitle" ref={(spot) => (scrollref.current[4] = spot)}>
                    <div>내 전시회</div>
                    <div className="dataarea">
                        <div>{Object.values(exhibitions).map((value, i) => (<ExhibitionItem style={{ display: filterswitch(myexhibitionswitch, i) }} key={i} exhibition={value} />))}</div>
                    </div>
                    <div onClick={() => { setMyExhibitionSwitch(!myexhibitionswitch); }}>{toggleswitch(myexhibitionswitch)}</div>
                </div>
                <div className="historytitle" ref={(spot) => (scrollref.current[5] = spot)}>
                    <div>내 작품</div>
                    <div className="dataarea">
                        <div>{Object.values(works).map((value, i) => (<WorkItem style={{ display: filterswitch(myworkswitch, i) }} key={i} work={value} />))}</div>
                    </div>
                    <div onClick={() => { setMyWorkSwitch(!myworkswitch); }}>{toggleswitch(myworkswitch)}</div>
                </div>
            </div>
        </>
    );

}

export default MyHistory;