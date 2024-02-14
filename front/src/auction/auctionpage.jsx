import { React, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import "./auctionpage.css";
import AuctionCam from '../components/auction/AuctionCam';

const test = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export default function AuctionPage() {

    const navigate = useNavigate();

    const {pathName, setPathName} = useContext(AppContext);
    const [mic, setMic] = useState(false);  // false: off / true: on
    const [cam, setCam] = useState(false);
    const [screen, setScreen] = useState(false);
    const [timer, setTimer] = useState(60);
    const [auctionvalue, setAuctionValue] = useState(100000);
    const [inputvalue, setInputValue] = useState("");
    const [username, setUsername] = useState(null);

    const timeset = () => {
        if (timer < 10) return `00:0${timer}`
        else if (timer < 60) return `00:${timer}`
        else return `01:00`
    }

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

    useEffect(() => {
        setUsername(JSON.parse(localStorage.getItem('userdata')).nickname);
        return () => {
            setPathName(window.location.pathname);
        }
    }, [username])

    return (
        <div style={{ display: "flex", width: "100%", height: "100vh", backgroundColor: "#5f5f5f" }}>
            <div style={{ zIndex: "10", backgroundColor: "#ffffff", borderRadius: "20px", width: "100%", margin: "20px" }}>
                <div className="auctiontitle" style={{ width: "300px", height: "50px", textAlign: "start", padding: "10px 20px", margin: "30px 20px", }}>
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
                                {/* 경매 진행자 화면... */}
                                {username && (<AuctionCam sessionId={'auction'} username={username}></AuctionCam>)}
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
                </div>
            </div>
        </div>
    );

}