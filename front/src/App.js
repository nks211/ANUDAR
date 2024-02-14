import './App.css';
import axios from 'axios';
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
import Signup from './signup/signup'
import Mypage from './mypage/mypage';
import { mainstate } from './StateManagement';
import { createContext, useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './navbar/navbar';
import Pay from './mypage/Pay.jsx';


export const AppContext = createContext();
export default function App() {
  const isLogin = mainstate((state) => state.isLogin)
  const logintoken = mainstate((state) => state.logintoken)
  // console.log(localStorage)
  useEffect(()=> {
    console.log(logintoken)
  }, [logintoken])
  // }, [isLogin])

  // useEffect(()=>{

  // }, [])
  // const { isLogin }  = mainstate((state) => ({ isLogin: state.isLogin }));
  // const isLogin = mainstate((state) => state.isLogin);

  // let token;
  // const { 
  //   isLogin,
  //   // setIsLogin,
  //   // loginidinput, 
  //   // loginpasswordinput, 
  //   // setloginidinput, 
  //   // setloginpasswordinput,
  //   loginuser,
  //   // setloginuser,
  //   logintoken,
  //   // setlogintoken,
  // } 
  // = mainstate((state) => ({
  //   isLogin: state.isLogin,
  //   // setIsLogin: state.setIsLogin,
  //   // loginidinput: state.idinput,
  //   // loginpasswordinput: state.passwordinput,
  //   // setloginidinput: state.setloginidinput,
  //   // setloginpasswordinput: state.setloginpasswordinput,
  //   loginuser: state.loginuser,
  //   // setloginuser: state.setloginuser,
  //   logintoken: state.logintoken,
  //   // setlogintoken: state.setlogintoken,
  // }));

  // useEffect(()=>{

  //   if (isLogin === true) {
  //     console.log('로그인')
  //   } else {
  //     // console.log(localStorage)
  //     console.log('로그아웃')
  //   }

  //   console.log(loginuser)
  //   console.log(logintoken)
  // },[isLogin])


  console.log(localStorage)
  const handleApprove  = async (pgToken, tid) => {
    const token = localStorage.getItem("token")

    // const tid = localStorage.getItem("tid");
    if (!pgToken || !tid) {
        alert('결제 승인 정보가 누락되었습니다.');
        return;
    }

    console.log(token)

    const form = {
      "cid": 'TC0ONETIME',
      "partner_user_id": '테스트1',
      "partner_order_id": '주문1',
      "tid": tid,
      "pg_token" : pgToken
    }

    console.log(form)

    await axios.post(
      // 'http://localhost:8080/api/payment/kakaoPayApprove',
      '/api/payment/kakaoPayApprove',
      form, 
      {
        headers: {
            "Content-Type": `application/json`,
            Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
          console.log(response);
          localStorage.setItem("tid", "")
          alert('결제가 완료되었습니다.');
      })
      .catch(error => {
          console.log(error)
          console.error('결제 승인 중 에러 발생:', error);
          alert('결제 승인 중 오류가 발생했습니다.');
      })

}
  

  const [pathName, setPathName] = useState(window.location.pathname);
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(()=>{

  //   console.log(location)
  //   if (location.pathname === "/PaymentApproval") {
  //     const pgToken = location.search.split("?pg_token=")[1]
  //     localStorage.setItem("pgToken", pgToken)
  //     // const tid = localStorage.getItem("tid")
  //     // navigate("/user/info", { state: { myVariable: 'value' } })
  //     // if (window.confirm("결제하시겠습니까?")) {
  //       // PaymentApproval()
  //       // <PaymentApproval/>
  //       // handleApprove(pgToken, tid)
  //     // } else {
  //     //   alert("취소되었스비다. ")
  //     // }
  //   }
  // }, [location])
//   useEffect(()=>{
// // PaymentApproval?
//   }, [])

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