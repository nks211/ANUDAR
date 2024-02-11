import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Like from "../components/like/Like";
import Work from "../components/work/Work";
import Exhibit from "../components/exhibit/Exhibit";
import dummy from "../db/data.json"
import './ArtistPage.css'
import { getAuthor, getFollowing } from "../API";
import { mainstate } from '../StateManagement';

export default function ArtistDetailPage() {
  const artistName = useLocation().pathname.split('/').pop();
  
  const [artistInfo, setArtistInfo] = useState({})
  const [works, setWorks] = useState([]);  // 작가의 작품
  const [exhibits, setExhibits] = useState([]);  // 작가의 전시회
  const logintoken = mainstate((state) => (state.logintoken))

  const [isFollow, setIsFollow] = useState(false);

  async function getData() {
    try {
      const res = await getAuthor(artistName)
      setArtistInfo(res)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

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

  useEffect(()=>{
    getData()
    getFollow()
  }, [])

  const changeFollow = (value) => {
    setIsFollow(value)
  }



  let worksContent = <div></div>
  let exhibitsContent = <div></div>

  // if (works.length > 0) {
  //   const workList = JSON.parse(`[${works}]`);
  //   worksContent = <div className="workList">
  //                   {workList.map(work=>(
  //                     // *수정* props 변경 ..
  //                     <Work className="Work" workType={3} workId={work.id} workName={work.title} workArtist={work.artist} image={"../../"+work.image} workAuctionDate={work.startDate} workAuctionPrice={work.price}/>
  //                   ))}
  //                 </div>
  // }

  
  // if (exhibits.length > 0) {
  //   const exhibitList = JSON.parse(`[${exhibits}]`);
  //   exhibitsContent = <div className="exhibitList">
  //                         {exhibitList.map(exhibit=>(
  //                           <Exhibit exhibitType={1} exhibit={exhibit}/>
  //                           ))}
  //                       </div>
  // }
  
  return(
    <div>
      <div className="artistArea">
        <div style={{width:450}}>
        {/* <div> */}
          <img src={artistInfo.image} style={{"object-fit": "cover"}} width={350} height={450}></img>
        </div>
        <div className="artistInfoArea">
          <div className="artistHeader">  {/* 작가명, 팔로우 버튼 */}
            <div className="artistTitle boldFont">{artistInfo.name}</div>
            <Like id={artistName} icon="asset/follow" likeType="artist" isLike={isFollow} name={isFollow?"Unfollow":"Follow"} onChangeLike={changeFollow} />
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
        {worksContent}
      </div>
      
      <div className="artistExhibits boldFont">전시회</div>
      <div className="artistExhibitList">
        {exhibitsContent}
      </div>

    </div>
  )
}