import { React, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import "./auctionpage.css";
import Slider from "react-slick";

export default function AuctionPage() {

    const navigate = useNavigate();

    const { pathName, setPathName } = useContext(AppContext);
    const [inputopen, setInputOpen] = useState(false);
    const [cam, setCam] = useState(false);
    const [mic, setMic] = useState(false);
    const [screen, setScreen] = useState(false);
    const [timer, setTimer] = useState(60);
    const [inputvalue, setInputValue] = useState(100000);
    const [auctionvalue, setAuctionValue] = useState(inputvalue);
    
    const timeset = () => {
        if (timer < 10) return `00:0${timer}`
        else if (timer < 60) return `00:${timer}`
        else return `01:00`
    }

    const test = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]; // 테스트 작품 데이터
    const participant = ["id 1", "id 2", "id 3"]; // 최대 3명까지만 표시
    const chatlist = ["chat 1...", "chat 2...", "chat 3..."]; // 테스트 채팅 데이터

    // 관리자 계정인지 확인하는 함수
    const isadmin = () => {
        const userdata = JSON.parse(localStorage.getItem("userdata"));
        return userdata && userdata.username === "admin1234" ? true : false;
    };

    const bidchange = (price) => {
        if (price > auctionvalue) { setTimer(60); setAuctionValue(price); }
        else alert("현재 입찰 가격보다 높은 값을 입력하세요");
    };

    const bidcomplete = () => {

    }

    const setting = {
        dots: false,
        dotsClass: "slidedots",
        infinite: false,
        pauseOnHover: false,
        arrows: isadmin(),
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    useEffect(() => {
        const Timer = setInterval(() => {
            setTimer((count) => count - 1);
        }, 1000);
        if (timer === 0) clearInterval(Timer)
        return () => {
            setPathName(window.location.pathname);
            clearInterval(Timer);
        }
    }, [navigate, timer]);

    return (
        <div style={{ display: "flex", width: "100%", height: "100vh", backgroundColor: "#5f5f5f" }}>
            <div style={{ zIndex: "10", backgroundColor: "#ffffff", borderRadius: "20px", width: "100%", margin: "20px", padding: "20px", display: "flex", flex: "24" }}>
                <div style={{ display: "flex", flex: "7", backgroundColor: "rgb(200, 200, 192)", flexDirection: "column", padding: "30px", margin: "20px", borderRadius: "30px" }}>
                    <div style={{ zIndex: "20", position: "absolute", display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "45%", height: "150px", backgroundColor: "#ffffff80", borderRadius: "20px", padding: "10px", margin: "10px" }}>
                        <div style={{ width: "40%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-around", border: "1px solid" }}>
                            <div className="auctiontitle" style={{ display: "flex", justifyContent: "space-between", padding: "0px 20px", }}>
                                <div>경매 <span style={{ fontSize: "28px", color: "976E76", fontWeight: "700", textAlign: "start", }}>{10}</span>/{30} 진행중</div>
                                <div style={{ textAlign: "end", fontSize: "16px", margin: "10px" }}>남은 시간 :   {timeset()}</div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", margin: "0px 20px" }}>
                                <div>현재 입찰 가격</div> 
                                <div style={{ fontSize: "20px", color: "#ff0000" }}>{auctionvalue}원</div>
                            </div>
                        </div>
                        <div style={{ width: "30%", height: "100%", border: "1px solid", display: "flex", justifyContent: "flex-end", textAlign: "start", fontSize: "18px", flexFlow: "column wrap" }}>
                            {Object.values(chatlist).map((chat) => { return <div style={{ margin: "5px 0px" }}>{chat}</div>; })}
                        </div>
                        <div style={{ width: "20%", height: "100%", border: "1px solid" }}>
                            <div style={{ fontSize: "24px", marginBottom: "30px" }}>입찰자 명단</div>
                            {Object.values(participant).map((person) => { return <div style={{ fontSize: "20px" }}>{person}</div> })}
                        </div>
                    </div>

                    {/* 경매 진행자 웹캠 컴포넌트 부분 */}
                    <div style={{ width: "100%", height: "100%", border: "1px solid", display: "flex", justifyContent: "center", alignItems: "center" }}>경매 진행자 화면...</div>

                    <div style={{ zIndex: "20", display: inputopen ? "flex" : "none", justifyContent: "space-between", alignItems: "flex-end", width: "100%", height: "100px", padding: "10px 20px" }}>
                        <input type="number" style={{ width: "40%", height: "40px", border: "2px #976E76 solid", borderRadius: "20px", padding: "10px", fontSize: "20px" }} onChange={(e) => { setInputValue(e.target.value); }} placeholder="금액을 입력하세요" />
                        <div onClick={() => { bidchange(inputvalue); }} style={{ width: "200px", height: "60px", backgroundColor: "#976E76", display: "flex", justifyContent: "center", alignItems: "center", color: "#ffffff", borderRadius: "20px", margin: "0px 40px", cursor: "pointer" }}>입력</div>
                    </div>
                </div>
                <div style={{ display: "flex", flex: "5", flexDirection: "column", backgroundColor: "#B7C4CF", padding: "30px", margin: "20px", borderRadius: "30px" }}>
                    <div style={{ width: "800px", height: "800px", margin: "20px 0px", pointerEvents: isadmin() ? "auto" : "none" }}>
                        <Slider {...setting}>
                            {Object.values(test).map((item, i) => {
                                return <div>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "500px", height: "500px", border: "1px solid" }}>
                                            {item}
                                        </div>
                                    </div>
                                </div>
                            })}
                        </Slider>
                        <div>작품 목록...</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end" }}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "1", }}>
                            <div id="auctionButton" style={{ width: "400px", height: "100px", margin: "10px", backgroundColor: "#967E76", borderRadius: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div style={{ display: !isadmin() ? "block" : "none", }} onClick={() => { setInputOpen(!inputopen); }}><img src="../../asset/tab_chat.png"></img></div>
                                <div style={{ display: isadmin() ? "block" : "none", }} onClick={() => { setCam(!cam) }}>{cam ? <img src="../../asset/cam_off.png"></img> : <img src="../../asset/cam_on.png"></img>}</div>
                                <div style={{ display: isadmin() ? "block" : "none", }} onClick={() => { setMic(!mic) }}>{mic ? <img src="../../asset/mic_off.png"></img> : <img src="../../asset/mic_on.png"></img>}</div>
                                <div style={{ display: isadmin() ? "block" : "none", }} onClick={() => { setScreen(!screen) }}>{screen ? <img src="../../asset/screen_off.png"></img> : <img src="../../asset/screen_on.png"></img>}</div>
                                <img onClick={() => { if (window.confirm('경매 페이지를 종료하시겠습니까?') === true) { navigate(-1) } }} src="../../asset/leave.png"></img>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="auctiontitle" style={{ width: "300px", height: "50px", textAlign: "start", padding: "10px 20px", margin: "30px 20px", }}>
                    경매 <span style={{ fontSize: "28px", color: "976E76", fontWeight: "700" }}>{10}</span>/{30} 진행중
                </div>
                <div style={{ display: "flex", flexDirection: "column", flex: "25", height: "80vh", margin: "20px", }}>
                    <div style={{ display: "flex", flex: "24", padding: "1vw" }}>
                        <div style={{ display: "flex", flex: "8", margin: "0px 10px", padding: "40px", backgroundColor: "rgb(200, 200, 192)", borderRadius: "20px" }}>
                            경매 작품 목록...
                            <div>

                            </div>
                            <div></div>
                        </div>
                        <div style={{ display: "flex", flex: "12", flexDirection: "column", margin: "-15px 10px", padding: "20px", backgroundColor: "white", borderRadius: "20px" }}>
                            <div style={{ display: "flex", flex: "11", borderRadius: "20px", backgroundColor: "#5f5f5f", color: "#ffffff", padding: "20px", }}>
                                경매 진행자 화면...
                            </div>
                            <div style={{ display: "flex", flex: "1", justifyContent: "space-between", margin: "20px 0px" }}>
                                <div style={{ width: "50%", height: "120%", backgroundColor: "#B7C4CF", borderRadius: "20px", display: "flex", flexDirection: "row", overflow: "hidden" }}>
                                    
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                                    <div style={{ textAlign: "start", margin: "10px 0px" }}>남은 시간 <span style={{ fontSize: "30px" }}><b>{timeset()}</b></span></div>
                                    <input onChange={(e) => { setInputValue(e.target.value); }} style={{ width: "100%", height: "30px", border: "1px #976E76 solid", borderRadius: "10px", padding: "5px" }} placeholder="금액을 입력하세요" />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "end" }}>
                                    <div style={{ margin: "10px 0px" }}>경매가 <span style={{ color: "#ff0000", fontSize: "25px", fontWeight: "800" }}>{auctionvalue}</span> KRW</div>
                                    <div onClick={() => { setTimer(60); }} style={{ backgroundColor: "#976E76", color: "#ffffff", fontSize: "20px", width: "160px", height: "50px", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>입력</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "1", }}>
                        <div id="auctionButton" style={{ width: "400px", height: "100px", margin: "10px", backgroundColor: "#967E76", borderRadius: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div onClick={()=>{setCam(!cam)}}>{cam?<img src="../../asset/cam_off.png"></img>:<img src="../../asset/cam_on.png"></img>}</div>
                            <div onClick={()=>{setMic(!mic)}}>{mic?<img src="../../asset/mic_off.png"></img>:<img src="../../asset/mic_on.png"></img>}</div>
                            <div onClick={()=>{setScreen(!screen)}}>{screen?<img src="../../asset/screen_off.png"></img>:<img src="../../asset/screen_on.png"></img>}</div>
                            <img onClick={()=>{if (window.confirm('경매 페이지를 종료하시겠습니까?') === true) { navigate(-1) }}} src="../../asset/leave.png"></img>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );

}