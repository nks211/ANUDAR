import { useState } from 'react'
import './Like.css'
import { followAuthor, likeWork, unfollowAuthor } from '../../API';
import { mainstate } from '../../StateManagement';

export default function Like(props) {
  const [isOn, setIsOn] = useState(false);
  const logintoken = mainstate((state)=> state.logintoken)

  async function changeLike() {
    try {
      const res = await likeWork(props.id, logintoken)
      console.log(logintoken)
      console.log(res)
    } catch(err) {
      console.log(err)
    }
  }

  async function follow() {
    try {
      const res = await followAuthor(props.id, logintoken)  // props.id : 작가 아이디(username)
      console.log(res)
    } catch(err) {
      console.log(err)
    }
  }

  async function unfollow() {
    try {
      const res = await unfollowAuthor(props.id, logintoken)  // props.id : 작가 아이디(username)
      console.log(res)
    } catch(err) {
      console.log(err)
    }
  }
  

  return (
    <>
      <div className={props.isLike?"cancelButton":"likeButton cursorPointer"} 
        onClick={()=>{
          switch (props.likeType) {
            case "artist":  // 작가 팔로우
              if (props.isLike) {
                unfollow()
              } else {
                follow()
              }
              props.onChangeLike(!props.isLike)
              break;
            
            case "work":  // 작품 찜하기
              changeLike()
              props.onChangeLike(!props.isLike)
              break;

            default:
              break;
          }
        }}
        onMouseOver={()=>{setIsOn(true)}}
        onMouseOut={()=>{setIsOn(false)}}>
        <img src={isOn||props.isLike? "../../../"+props.icon+"_reverse.png" : "../../../"+props.icon+".png"} width={25} height={25}></img>
        {/* <img src={props.isLike? "../../../"+props.icon+".png" : "../../../"+props.icon+"_reverse.png"} width={25} height={25}></img> */}
        <div style={{width:"10px"}}></div>
        <div>{props.name}</div>
      </div>
    </>
  )
}