import { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { AuctionLiveContext } from '../../auctionlive/AuctionLivePage'
import './AuctionButton.css'

export default function AuctionButton() {
  const { mic, setMic, cam, setCam } = useContext(AuctionLiveContext);
  const navigate = useNavigate();

  return(
    <div id="auctionButton">
      <div onClick={()=>{setCam(!cam)}}>{cam?<img src="../../asset/cam_off.png"></img>:<img src="../../asset/cam_on.png"></img>}</div>
      <div onClick={()=>{setMic(!mic)}}>{mic?<img src="../../asset/mic_off.png"></img>:<img src="../../asset/mic_on.png"></img>}</div>
      <img onClick={()=>{if (window.confirm('도슨트를 종료하시겠습니까?') === true) { navigate(-1) }}} src="../../asset/leave.png"></img>
    </div>
  )
}