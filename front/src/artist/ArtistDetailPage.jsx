import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Like from "../components/like/Like";
import Work from "../components/work/Work";
import Exhibit from "../components/exhibit/Exhibit";
import './ArtistPage.css'
import { getAuthor, getAuthorWorks, getFollowing } from "../API";
import { mainstate } from '../StateManagement';

export default function ArtistDetailPage() {
  const artistName = useLocation().pathname.split('/').pop();
  
  const [artistInfo, setArtistInfo] = useState({})
  const [works, setWorks] = useState([]);  // 작가의 작품
  const [exhibits, setExhibits] = useState([]);  // 작가의 전시회
  const logintoken = mainstate((state) => (state.logintoken))
  const loginuser = mainstate((state) => (state.loginuser))

  const [isFollow, setIsFollow] = useState(false);
  const [likeButton, setLikeButton] = useState(<></>);

  // 작가 정보 조회
  async function getData() {
    try {
      const res = await getAuthor(artistName)
      setArtistInfo(res)
      if (res.username !== loginuser.username) {
        setLikeButton(<Like id={artistName} icon="asset/follow" likeType="artist" isLike={isFollow} name={isFollow?"Unfollow":"Follow"} onChangeLike={changeFollow} />)
      }
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  // 팔로잉 목록 조회
  async function getFollow() {
    try {
      let followList;  // 팔로잉 리스트
      const res = await getFollowing(logintoken)
      followList = res

      for (let i=0; i<followList.length; i++) {
        if (followList[i].username === artistName) { setIsFollow(true); return }
        setIsFollow(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // 작가 작품 조회
  async function getWorks() {
    try {
      const res = await getAuthorWorks(artistName, logintoken)
      setWorks(res)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    getData()
    getFollow()
    getWorks()
  }, [])

  const changeFollow = (value) => {
    setIsFollow(value)
  }

  let exhibitsContent = <div></div>
  
  return(
    <div style={{paddingTop:"40px"}}>
      <div className="artistArea">
        <div style={{width:450}}>
          <img src={artistInfo.image} style={{"object-fit": "cover", borderRadius:"0.3rem"}} width={350} height={450}/>
        </div>
        <div className="artistInfoArea">
          <div className="artistHeader">  {/* 작가명, 팔로우 버튼 */}
            <div className="artistTitle boldFont">{artistInfo.name}</div>
            {likeButton}
          </div>
          <div style={{paddingLeft:"10px"}}>
            <div className="artistDescription boldFont">소개</div>  {/* 소개: 제목 */}
            <div className="artistIntroArea"> {/* 작가 소개 */}
              {/* <div className="artistIntro">{description}</div> */}
              <div className="artistIntro">{artistInfo.email}</div>
              <div className="artistIntro">{artistInfo.phone}</div>
            </div>
            <div className="artistDescription boldFont">HISTORY</div>{/* HISTORY: 제목 */}
            <div className="artistHistoryArea"> {/* 작가 HISTORY */}
              <div className="artistHistory">
                {/* *수정* API 받은 후 수정! 글자 길이 제한 방법 고민 .. */}
                {/* <div>전시 : {artistExhibits.join(", ")}</div>
                <div>작품 : {artistWorks.join(", ")}</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="artistWorks boldFont">작품</div>
      <div className="artistWorkList">
        <div className="workList">
          {works.map(work=>( <Work className="Work" workType={3} work={work} /> ))}
        </div>
      </div>
      
      <div className="artistExhibits boldFont">전시회</div>
      <div className="artistExhibitList">
        {exhibitsContent}
      </div>
    </div>
  )
}