import { React, useState, useRef, useContext, useEffect } from "react";
import "./myhistory.css";
import ExhibitionItem from "../../work/exhibitionitem";
import WorkItem from "../../work/workitem";
import { MypageContext } from "../../../mypage/mypage";
import { mainstate, mypagestate, popupstate } from "../../../StateManagement";
import { favoriteexhibitions, favoriteworks, getFollowing, mybidworks, myexhibitions, myworks } from "../../../API";
import { AppContext } from "../../../App";
import Modal from "react-modal";
import logo from "../../../loading.gif";


const toggleswitch = (toggle) => { return toggle ? <img src="../../asset/list_unwrapped.png" /> : <img src="../../asset/list_wrapped.png" />; }
const filterswitch = (toggle, index) => { return (!toggle && index >= 3) ? "none" : "flex"; }

function MyHistory() {

    const [exhibitionswitch, setExhibitionSwitch] = useState(false);
    const [workswitch, setWorkSwitch] = useState(false);
    const [followswitch, setFollowSwitch] = useState(false);
    const [auctionswitch, setAuctionSwitch] = useState(false);
    const [myexhibitionswitch, setMyExhibitionSwitch] = useState(false);
    const [myworkswitch, setMyWorkSwitch] = useState(false);

    const myfavorites = mypagestate((state) => state.myfavorites);
    const setmyfavorites = mypagestate((state) => state.setmyfavorites);
    const loginuser = mainstate((state) => state.loginuser);
    const { loadingpopup, setloadingpopup } = popupstate((state) => ({
        loadingpopup: state.loadingpopup,
        setloadingpopup: state.setloadingpopup,
    }));

    const logintoken = mainstate((state) => state.logintoken);
    const { scrollref } = useContext(MypageContext);
    const { modalsetting } = useContext(AppContext);

    const getmyhistory = async () => {
        const likeexhibitionsresult = await favoriteexhibitions(logintoken);
        const likekworksresult = await favoriteworks(logintoken);
        const myfollowing = await getFollowing(logintoken);
        const myexhibitionsresult = await myexhibitions(loginuser.username, logintoken); 
        const myworksresult = await myworks(loginuser.username, logintoken);
        const myauctionsresult = await mybidworks(logintoken);
        return {
            likeexhibitions: likeexhibitionsresult,
            likeworks: likekworksresult,
            followingartist: myfollowing,
            myexhibitions: myexhibitionsresult,
            myworks : myworksresult,
            myauctions: myauctionsresult,
        };
    }
    useEffect(() => {
        getmyhistory().then((value) => {
            setmyfavorites(value);
            console.log(value);
            setloadingpopup(false);
        })
    },);

    return (
        <>
            <div style={{ display: loadingpopup? "none" : "block" }}>
                <div className="myfavorites">FAVORITES</div>
                <div className="historytitle" ref={(spot) => (scrollref.current[0] = spot)}>
                    <div>찜한 전시회</div>
                    <div className="dataarea">
                        {myfavorites.likeexhibitions && myfavorites.likeexhibitions.length > 0? Object.values(myfavorites.likeexhibitions).map((value, i) => (<div style={{ display: filterswitch(exhibitionswitch, i) }}><ExhibitionItem key={i} width="330px" height="480px" exhibition={value} /></div>)) 
                        : <div style={{ width: "100%", height: "200px", margin: "20px 0px", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "400" }}>찜한 전시회가 없습니다.</div>}
                    </div>
                    <div style={{ cursor: "pointer" }} onClick={() => { setExhibitionSwitch(!exhibitionswitch); }}>{toggleswitch(exhibitionswitch)}</div>
                </div>
                <div className="historytitle" ref={(spot) => (scrollref.current[1] = spot)}>
                    <div>찜한 작품</div>
                    <div className="dataarea">
                        {myfavorites.likeworks && myfavorites.likeworks.length > 0? Object.values(myfavorites.likeworks).map((value, i) => (<div style={{ display: filterswitch(workswitch, i) }}><WorkItem key={i} width="250px" height="250px" work={value} /></div>)) 
                        : <div style={{ width: "100%", height: "200px", margin: "20px 0px", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "400" }}>찜한 작품이 없습니다.</div>}
                    </div>
                    <div style={{ cursor: "pointer" }} onClick={() => { setWorkSwitch(!workswitch); }}>{toggleswitch(workswitch)}</div>
                </div>
                <div className="historytitle" ref={(spot) => (scrollref.current[2] = spot)}>
                    <div>팔로우한 작가</div>
                    <div className="dataarea">
                        {myfavorites.followingartist && myfavorites.followingartist.length > 0? Object.values(myfavorites.followingartist).map((value, i) => (<div style={{ display: filterswitch(followswitch, i) }}>
                            <img style={{ width: "250px", height: "250px", objectFit: "cover", borderRadius: "100%", margin: "20px" }} src={value.image}></img>
                        </div>)) : <div style={{ width: "100%", height: "200px", margin: "20px 0px", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "400" }}>팔로우한 작가가 없습니다.</div> }
                        {/* <div style={{ display: filterswitch(followswitch, 0) }}><WorkItem width="250px" height="250px" work={{ url: "../../asset/artist1.png", title: "클로드 모네", }} /></div>
                        <div style={{ display: filterswitch(followswitch, 1) }}><WorkItem width="250px" height="250px" work={{ url: "../../asset/artist2.png", title: "잭슨 폴록", }} /></div>
                        <div style={{ display: filterswitch(followswitch, 2) }}><WorkItem width="250px" height="250px" work={{ url: "../../asset/artist3.png", title: "프리다 칼로", }} /></div>
                        <div style={{ display: filterswitch(followswitch, 3) }}><WorkItem width="250px" height="250px" work={{ url: "../../asset/artist1.png", title: "클로드 모네", }} /></div>
                        <div style={{ display: filterswitch(followswitch, 4) }}><WorkItem width="250px" height="250px" work={{ url: "../../asset/artist2.png", title: "잭슨 폴록", }} /></div>
                        <div style={{ display: filterswitch(followswitch, 5) }}><WorkItem width="250px" height="250px" work={{ url: "../../asset/artist3.png", title: "프리다 칼로", }} /></div> */}
                    </div>
                    <div style={{ cursor: "pointer" }} onClick={() => { setFollowSwitch(!followswitch); }}>{toggleswitch(followswitch)}</div>
                </div>
            </div>
            <div style={{ display: loadingpopup? "none" : "block" }}>
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
                                {myfavorites.myauctions && myfavorites.myauctions.length > 0? Object.values(myfavorites.myauctions).map((auction, i) => {
                                    return <tr style={{ textAlign: "center", display: filterswitch(auctionswitch, i), justifyContent: "center", alignItems: "center", height: "80px" }}>
                                        <td className="auctionimage">{<img width="50px" height="50px" src={auction.image} />}</td>
                                        <td className="auctionname">{auction.title}</td>
                                        <td className="auctionartist">{auction.author}</td>
                                        <td className="auctionmoney">{auction.price}</td>
                                    </tr>
                                }) : <div style={{ width: "100%", height: "200px", margin: "20px 0px", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "400" }}>경매에서 낙찰된 작품이 없습니다.</div> }
                            </tbody>
                        </table>
                    </div>
                    <div style={{ cursor: "pointer" }} onClick={() => { setAuctionSwitch(!auctionswitch); }}>{toggleswitch(auctionswitch)}</div>
                </div>
            </div>
            <div style={{ display: loadingpopup? "none" : "block" }}>
                <div className="myartist">ARTIST</div>
                <div className="historytitle" ref={(spot) => (scrollref.current[4] = spot)}>
                    <div>내 전시회</div>
                    <div className="dataarea">
                        {myfavorites.myexhibitions && myfavorites.myexhibitions.length > 0? Object.values(myfavorites.myexhibitions).map((value, i) => (<div style={{ display: filterswitch(myexhibitionswitch, i) }}><ExhibitionItem key={i} width="270px" height="360px" exhibition={value} /></div>)) 
                        : <div style={{ width: "100%", height: "200px", objectFit: "cover", margin: "20px 0px", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "400" }}>등록한 전시회가 없습니다.</div>}
                    </div>
                    <div style={{ cursor: "pointer" }} onClick={() => { setMyExhibitionSwitch(!myexhibitionswitch); }}>{toggleswitch(myexhibitionswitch)}</div>
                </div>
                <div className="historytitle" ref={(spot) => (scrollref.current[5] = spot)}>
                    <div>내 작품</div>
                    <div className="dataarea">
                        {myfavorites.myworks && myfavorites.myworks.length > 0? Object.values(myfavorites.myworks).map((value, i) => (<div style={{ display: filterswitch(myworkswitch, i) }}><WorkItem key={i} width="250px" height="250px" work={value} /></div>)) 
                        : <div style={{ width: "100%", height: "200px", objectFit: "cover", margin: "20px 0px", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "400" }}>등록한 작품이 없습니다.</div> }
                    </div>
                    <div style={{ cursor: "pointer" }} onClick={() => { setMyWorkSwitch(!myworkswitch); }}>{toggleswitch(myworkswitch)}</div>
                </div>
            </div>
            <Modal isOpen={loadingpopup} style={modalsetting}><img src={logo} style={{ width: "20%", height: "30%" }} /></Modal>
        </>
    );

}

export default MyHistory;