import { React, useState, useRef, useContext, useEffect } from "react";
import "./myhistory.css";
import ExhibitionItem from "../../work/exhibitionitem";
import WorkItem from "../../work/workitem";
import Exhibit from "../../exhibit/Exhibit";
import Work from "../../work/Work";
import { MypageContext } from "../../../mypage/mypage";
import { mainstate, mypagestate, popupstate } from "../../../StateManagement";
import { favoriteexhibitions, favoriteworks, getFollowing, mybidworks, myexhibitions, myworks } from "../../../API";
import { AppContext } from "../../../App";
import Modal from "react-modal";
import logo from "../../../loading.gif";


const toggleswitch = (toggle) => { return toggle ? <img src="../../asset/list_unwrapped.png" width={810} /> : <img src="../../asset/list_wrapped.png" width={810} />; }
const filterswitch = (toggle, index) => { return (!toggle && index >= 3) ? "none" : "flex"; }

export default function MyHistory() {

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
      myworks: myworksresult,
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
    <div className="myPageLike">
      <div style={{ display: loadingpopup ? "none" : "block" }}>
        <div className="myfavorites">FAVORITES</div>
        <div className="historytitle" ref={(spot) => (scrollref.current[0] = spot)}>
          <div>찜한 전시회</div>
          <div className="dataarea">
            {myfavorites.likeexhibitions && myfavorites.likeexhibitions.length > 0 ? Object.values(myfavorites.likeexhibitions).map((value, i) => (
              <div style={{ display: filterswitch(exhibitionswitch, i) }}>
                {/* <ExhibitionItem key={i} width="330px" height="480px" exhibition={value} /> */}
                <Exhibit exhibitType={1} exhibit={value} />
              </div>))
              : <span>찜한 전시회가 없습니다.</span>}
          </div>
          <div style={{ cursor: "pointer" }} onClick={() => { setExhibitionSwitch(!exhibitionswitch); }}>{toggleswitch(exhibitionswitch)}</div>
        </div>
        <div className="historytitle" ref={(spot) => (scrollref.current[1] = spot)}>
          <div>찜한 작품</div>
          <div className="dataarea">
            {myfavorites.likeworks && myfavorites.likeworks.length > 0 ? Object.values(myfavorites.likeworks).map((value, i) => (
              <div style={{ display: filterswitch(workswitch, i) }}>
                {/* <WorkItem key={i} width="250px" height="250px" work={value} /> */}
                <Work className="Work" workType={4} work={value} />
              </div>))
              : <span>찜한 작품이 없습니다.</span>}
          </div>
          <div style={{ cursor: "pointer" }} onClick={() => { setWorkSwitch(!workswitch); }}>{toggleswitch(workswitch)}</div>
        </div>
        <div className="historytitle" ref={(spot) => (scrollref.current[2] = spot)}>
          <div>팔로우한 작가</div>
          <div className="dataarea">
            {myfavorites.followingartist && myfavorites.followingartist.length > 0 ? Object.values(myfavorites.followingartist).map((value, i) => (<div style={{ display: filterswitch(followswitch, i) }}>
              <img style={{ width: "250px", height: "250px", objectFit: "cover", borderRadius: "100%", margin: "10px" }} src={value.image}></img>
            </div>)) : <span>팔로우한 작가가 없습니다.</span>}
          </div>
          <div style={{ cursor: "pointer" }} onClick={() => { setFollowSwitch(!followswitch); }}>{toggleswitch(followswitch)}</div>
        </div>
      </div>
      <div style={{ display: loadingpopup ? "none" : "block" }}>
        <div className="myauction">AUCTION</div>
        <div className="historytitle" ref={(spot) => (scrollref.current[3] = spot)}>
          <div>경매 내역</div>
          <div>
            <table>
              <thead>
              </thead>
              <tbody>
                <div>
                  <td className="auctionimage">작품</td>
                  <td className="auctionname">작품명</td>
                  <td className="auctionartist">작가</td>
                  <td className="auctionmoney">낙찰가</td>
                </div>

                {myfavorites.myauctions && myfavorites.myauctions.length > 0 ? Object.values(myfavorites.myauctions).map((myauction, i) => {
                  console.log(myauction.auction.finalPrice)
                  return <tr className="myAuctionWork" style={{ display: filterswitch(auctionswitch, i) }}>
                    <td className="auctionimage">{<img width="50px" height="50px" src={myauction.work.image} />}</td>
                    <td className="auctionname">{myauction.work.title}</td>
                    <td className="auctionartist">{myauction.work.author_name}</td>
                    <td className="auctionmoney">{myauction.finalPrice} Point</td>
                  </tr>
                }) : <span>경매에서 낙찰된 작품이 없습니다.</span>}
              </tbody>
            </table>
          </div>
          <div style={{ cursor: "pointer" }} onClick={() => { setAuctionSwitch(!auctionswitch); }}>{toggleswitch(auctionswitch)}</div>
        </div>
      </div>
      <div style={{ display: loadingpopup ? "none" : "block" }}>
        <div className="myartist">ARTIST</div>
        <div className="historytitle" ref={(spot) => (scrollref.current[4] = spot)}>
          <div>내 전시회</div>
          <div className="dataarea">
            {myfavorites.myexhibitions && myfavorites.myexhibitions.length > 0 ? Object.values(myfavorites.myexhibitions).map((value, i) => (
              <div style={{ display: filterswitch(myexhibitionswitch, i) }}>
                {/* <ExhibitionItem key={i} width="270px" height="360px" exhibition={value} /> */}
                <Exhibit exhibitType={1} exhibit={value} />
              </div>))
              : <span style={{ objectFit: "cover" }}>등록한 전시회가 없습니다.</span>}
          </div>
          <div style={{ cursor: "pointer" }} onClick={() => { setMyExhibitionSwitch(!myexhibitionswitch); }}>{toggleswitch(myexhibitionswitch)}</div>
        </div>
        <div className="historytitle" ref={(spot) => (scrollref.current[5] = spot)}>
          <div>내 작품</div>
          <div className="dataarea">
            {myfavorites.myworks && myfavorites.myworks.length > 0 ? Object.values(myfavorites.myworks).map((value, i) => (
              <div style={{ display: filterswitch(myworkswitch, i) }}>
                {/* <WorkItem key={i} width="250px" height="250px" work={value} /> */}
                <Work className="Work" workType={4} work={value} />
              </div>))
              : <span style={{ objectFit: "cover" }}>등록한 작품이 없습니다.</span>}
          </div>
          <div style={{ cursor: "pointer" }} onClick={() => { setMyWorkSwitch(!myworkswitch); }}>{toggleswitch(myworkswitch)}</div>
        </div>
      </div>
      <Modal isOpen={loadingpopup} style={modalsetting}><img src={logo} style={{ width: "20%", height: "30%", marginTop: "100px" }} /></Modal>
    </div>
  );
}