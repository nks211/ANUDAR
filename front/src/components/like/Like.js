import { useState } from 'react'
import './Like.css'

export default function Like(props) {
  const [isOn, setIsOn] = useState(false);
  return (
    <>
      <div className="likeButton cursorPointer" 
        onClick={()=>{

        }}
        onMouseOver={()=>{setIsOn(true)}}
        onMouseOut={()=>{setIsOn(false)}}>
        <img src={isOn? "../../../"+props.icon+"_reverse.png" : "../../../"+props.icon+".png"} width={25} height={25}></img>
        <div style={{width:"10px"}}></div>
        <div>{props.name}</div>
      </div>
    </>
  )
}