import { useState } from 'react'
import './Like.css'
<<<<<<< HEAD
import { followAuthor, likeWork, unfollowAuthor } from '../../API';
=======
import { followAuthor, unfollowAuthor, likeWork, likeExhibit } from '../../API';
>>>>>>> 2acb543b3c566420704cd2956737a869d1617245
import { mainstate } from '../../StateManagement';

export default function Like(props) {
  const [isOn, setIsOn] = useState(false);
<<<<<<< HEAD
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
              if (props.isLike) { unfollow() } 
              else { follow() }
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
        {props.likeType==="work"?<img src={isOn||props.isLike? "../../../"+props.icon+"_reverse.png" : "../../../"+props.icon+".png"} width={25} height={25}/>:<></>}
        {/* <img src={props.isLike? "../../../"+props.icon+".png" : "../../../"+props.icon+"_reverse.png"} width={25} height={25}></img> */}
        <div style={{width:"10px"}}></div>
        <div>{props.name}</div>
      </div>
    </>
  )
=======
  const isLogin = mainstate((state)=> state.isLogin)
  const logintoken = mainstate((state)=> state.logintoken)

  // 작품 찜
  async function changeWorkLike() {
    try {
      const res = await likeWork(props.id, logintoken)
      console.log(logintoken)
      console.log(res)
    } catch(err) {
      console.log(err)
    }
  }

  // 작가 팔로우
  async function follow() {
    try {
      const res = await followAuthor(props.id, logintoken)  // props.id : 작가 아이디(username)
    } catch(err) {
      console.log(err)
    }
  }

  // 작가 언팔로우
  async function unfollow() {
    try {
      const res = await unfollowAuthor(props.id, logintoken)  // props.id : 작가 아이디(username)
    } catch(err) {
      console.log(err)
    }
  }

  // 전시 찜
  async function changeExhibitLike() {
    try {
      const res = await likeExhibit(props.id, logintoken)
      console.log(logintoken)
      console.log(res)
    } catch(err) {
      console.log(err)
    }
  } 

  function checkLogin() {
    if (!isLogin) {alert('로그인 후 이용해주세요'); return}
  }
  
  if (props.likeType === "exhibit") {
    return (
      <>
        <div onClick={()=>{
          checkLogin()
          changeExhibitLike()
          props.onChangeLike(!props.isLike)
        }}>
          <img src={"../../../"+props.icon+(props.isLike?"_cancel":"")+".png"} />
          {props.name}
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className={props.isLike?"cancelButton":"likeButton cursorPointer"} 
          onClick={()=>{
            checkLogin()
            switch (props.likeType) {
              case "artist":  // 작가 팔로우
                if (props.isLike) { unfollow() } 
                else { follow() }
                props.onChangeLike(!props.isLike)
                break;
              
              case "work":  // 작품 찜하기
                changeWorkLike()
                props.onChangeLike(!props.isLike)
                break;

              default:
                break;
            }
          }}
          onMouseOver={()=>{setIsOn(true)}}
          onMouseOut={()=>{setIsOn(false)}}>
          {props.likeType==="work"?<img src={isOn||props.isLike? "../../../"+props.icon+"_reverse.png" : "../../../"+props.icon+".png"} width={25} height={25}/>:<></>}
          {/* <img src={props.isLike? "../../../"+props.icon+".png" : "../../../"+props.icon+"_reverse.png"} width={25} height={25}></img> */}
          <div style={{width:"10px"}}></div>
          <div>{props.name}</div>
        </div>
      </>
    )
  }
>>>>>>> 2acb543b3c566420704cd2956737a869d1617245
}