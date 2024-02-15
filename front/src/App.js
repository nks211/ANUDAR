import './App.css';
import Home from './home/home'
import ExhibitPage from './exhibit/ExhibitPage'
import ExhibitDetailPage from './exhibit/ExhibitDetailPage'
import Exhibit3DPage from './exhibit/Exhibit3DPage'
import ExhibitRegistPage from './exhibit/ExhibitRegistPage'
import DocentPage from './docent/DocentPage'
import WorkPage from './work/WorkPage'
import WorkDetailPage from './work/WorkDetailPage'
import ArtistPage from './artist/ArtistPage'
import ArtistDetailPage from './artist/ArtistDetailPage'
import Auction from './auction/auction'
import AuctionPage from './auction/auctionpage';
import AuctionLivePage from './auctionlive/AuctionLivePage';
import Signup from './signup/signup'
import Mypage from './mypage/mypage';
import { mainstate } from './StateManagement';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './navbar/navbar';
import Pay from './mypage/Pay.jsx';
import { myinfo } from './API.jsx';


export const AppContext = createContext();
export default function App() {
  const isLogin = mainstate((state) => state.isLogin)
  const logintoken = mainstate((state) => state.logintoken)
  const [pathName, setPathName] = useState(window.location.pathname);
  const [myData, setMyData] = useState({});

  useEffect(()=> {
    console.log(logintoken)
  }, [logintoken])

  async function getMyInfo() {
    try {
      const res = await myinfo(logintoken)
      if (res !== myData) {localStorage.setItem("userdata", JSON.stringify(res))}
      setMyData(res)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    if (isLogin) {
      getMyInfo()
    }
  },[pathName])


  
  const modalsetting = {
    overlay: {
        position: "fixed",
        backgroundColor: "#00000040",
    },
    content: {
        position: "absolute",
        top: "80px",
        left: "35%",
        width: "30%",
        height: "40%",
        borderRadius: "20px",
        padding: "20px",
        border: "0",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
    }
  };

  return (
    <>
      <AppContext.Provider value={{ modalsetting, pathName, setPathName }}>
        <NavBar />
        <div style={{ display: "flex", justifyContent: "center", }} className={pathName.includes('docent') || pathName.includes('now') ? "DocentPage" : "App"}>
        {/* <div style={{ display: "flex", justifyContent: "center", }} className="App"> */}
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/exhibit" element={<ExhibitPage />}></Route>
            <Route exact path="/exhibit/:id" element={<ExhibitDetailPage />}></Route>
            {/* 임시 path */}
            <Route exact path="/exhibit/:id/2" element={<Exhibit3DPage />}></Route>
            <Route exact path="/exhibit/regist" element={<ExhibitRegistPage />}></Route>
            <Route exact path="/docent/:id" element={<DocentPage />}></Route>
            <Route exact path="/work" element={<WorkPage />}></Route>
            <Route exact path="/work/:id" element={<WorkDetailPage/>}></Route>
            <Route exact path="/artist" element={<ArtistPage />}></Route>
            <Route exact path="/artist/:id" element={<ArtistDetailPage/>}></Route>
            <Route exact path="/auction" element={<Auction />}></Route>
            {/* <Route exact path="/auction/now" element={<AuctionPage/>}></Route> */}
            {/* 테스트용 주소 */}
            <Route exact path="/auction/live" element={<AuctionLivePage />}></Route>
            <Route exact path="/user/info" element={<Mypage/>}></Route>
            <Route exact path="/user/join" element={<Signup />}></Route>
            {/* 실시간 경매 */}
            <Route exact path="/auction/now/:auction_id" element={<AuctionPage/>}></Route>

            <Route exact path="/pay" element={<Pay />}></Route>
          </Routes>
        </div>
      </AppContext.Provider>
    </>

  );
}