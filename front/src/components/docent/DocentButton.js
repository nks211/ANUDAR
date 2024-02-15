import { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { DocentContext } from '../../docent/DocentPage'
import './DocentButton.css'

export default function DocentButton() {
  const { mic, setMic, cam, setCam } = useContext(DocentContext);
  const navigate = useNavigate();

  return(
    <div id="docentButton">
      <div onClick={()=>{setCam(!cam)}}>{cam?<img src="../../asset/cam_off.png"></img>:<img src="../../asset/cam_on.png"></img>}</div>
      <div onClick={()=>{setMic(!mic)}}>{mic?<img src="../../asset/mic_off.png"></img>:<img src="../../asset/mic_on.png"></img>}</div>
      <img onClick={()=>{if (window.confirm('도슨트를 종료하시겠습니까?') === true) { navigate(-1) }}} src="../../asset/leave.png"></img>
    </div>
  )
}