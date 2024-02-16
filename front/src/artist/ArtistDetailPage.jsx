import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Like from "../components/like/Like";
import Work from "../components/work/Work";
import Exhibit from "../components/exhibit/Exhibit";
import './ArtistPage.css'
import { getAuthor, getAuthorWorks, getAuthorExhibits, getFollowing } from "../API";
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

      // *수정* : filter ?
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
      const res = await getAuthorWorks(artistName)
      setWorks(res)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  // 작가 전시 조회
  async function getExhibits() {
    try {
      const res = await getAuthorExhibits(artistName)
      setExhibits(res.length>6?res.slice(0,6):res)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    getData()
    getFollow()
    getWorks()
    getExhibits()
  }, [])

  useEffect(()=>{
    if (artistInfo.username !== loginuser.username) {
      setLikeButton(<Like id={artistName} icon="asset/follow" likeType="artist" isLike={isFollow} name={isFollow?"Unfollow":"Follow"} onChangeLike={changeFollow} />)
    }
  }, [isFollow])

  const changeFollow = (value) => {
    setIsFollow(value)
  }

  console.log(exhibits)
  console.log(works)
  
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
            <div className="artistDescription boldFont">CONTACT</div>  {/* 소개: 제목 */}
            <div className="artistIntroArea"> {/* 작가 소개 */}
              <div className="artistIntro"><img src="../../asset/icon_mail.png" width={20} height={20} />{artistInfo.email}</div>
              <div className="artistIntro"><img src="../../asset/icon_phone.png" width={20} height={20} />{artistInfo.phone}</div>
            </div>
            <div className="artistDescription boldFont">HISTORY</div>{/* HISTORY: 제목 */}
            <div className="artistHistoryArea"> {/* 작가 HISTORY */}
              <div className="artistHistory">
                <div style={{fontWeight:900, marginLeft:"10px"}}>전시</div>
                <ul style={{textAlign:"left", color:"#787878"}}>
                  <li>{exhibits[0]?.name}</li>
                  <li>{exhibits[1]?.name}</li>
                </ul>
                <div style={{fontWeight:900, marginLeft:"10px"}}>작품</div>
                <ul style={{textAlign:"left", color:"#787878"}}>
                  <li>{works[0]?.title}</li>
                  <li>{works[1]?.title}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="artistExhibits">전시회</div>
      <div className="artistExhibitList">
        <div className="exhibitList">
          {exhibits.map(exhibit=>(
            <Exhibit exhibitType={1} exhibit={exhibit}/>
            ))}
        </div>
      </div>

      <div className="artistWorks">작품</div>
      <div className="artistWorkList">
        <div className="workList">
          {works.map(work=>( <Work className="Work" workType={3} work={work} /> ))}
        </div>
      </div>
      
    </div>
  )
}