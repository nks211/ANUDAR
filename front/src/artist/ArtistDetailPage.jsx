import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Like from "../components/like/Like";
import Work from "../components/work/Work";
import Exhibit from "../components/exhibit/Exhibit";
import dummy from "../db/data.json"
import './ArtistPage.css'

export default function ArtistDetailPage() {
  const artistId = useLocation().pathname.split('/').pop();
  // const [workList, setWorkList] = useState([]);  // 작가의 작품
  const works = [];  // 작가의 작품
  const exhibits = [];  // 작가의 전시회
  // *수정* : 팔로우 버튼 구현
  const [isFollow, setIsFollow] = useState();

  let artistInfo = {};
  let [name, image, description, artistExhibits, artistWorks] = ''

  for (let i=0; i<dummy.artists.length; i++) {
    if (i === Number(artistId)) {
      artistInfo = dummy.artists[i]
      name = artistInfo.name
      image = artistInfo.image
      description = artistInfo.description
      artistExhibits = artistInfo.exhibits
      artistWorks = artistInfo.works
    }
  }

  for (let i=0; i<dummy.works.length; i++) {
    if (dummy.works[i].artist === name) {
      works.push(JSON.stringify(dummy.works[i]))
    }
  }

  for (let i=0; i<dummy.exhibits.length; i++) {
    if (dummy.exhibits[i].artist === name) {
      exhibits.push(JSON.stringify(dummy.exhibits[i]))
    }
  }

  let worksContent = <div></div>
  let exhibitsContent = <div></div>

  if (works.length > 0) {
    const workList = JSON.parse(`[${works}]`);
    worksContent = <div className="workList">
                    {workList.map(work=>(
                      // *수정* props 변경 ..
                      <Work className="Work" workType={3} workId={work.id} workName={work.title} workArtist={work.artist} image={"../../"+work.image} workAuctionDate={work.startDate} workAuctionPrice={work.price}/>
                    ))}
                  </div>
  }

  
  if (exhibits.length > 0) {
    const exhibitList = JSON.parse(`[${exhibits}]`);
    exhibitsContent = <div className="exhibitList">
                          {exhibitList.map(exhibit=>(
                            <Exhibit exhibitType={1} exhibit={exhibit}/>
                            ))}
                        </div>
  }
  
  return(
    <div>
      <div className="artistArea">
        <div style={{width:450}}>
        {/* <div> */}
          <img src={"../../"+image+".png"} style={{"object-fit": "cover"}} width={350} height={450}></img>
        </div>
        <div className="artistInfoArea">
          <div className="artistHeader">  {/* 작가명, 팔로우 버튼 */}
            <div className="artistTitle boldFont">{name}</div>
            <Like icon="asset/follow" name="팔로우" />
          </div>
          <div style={{paddingLeft:"10px"}}>
            <div className="artistDescription boldFont">소개</div>  {/* 소개: 제목 */}
            <div className="artistIntroArea"> {/* 작가 소개 */}
              <div className="artistIntro">{description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} </div>
            </div>
            <div className="artistDescription boldFont">HISTORY</div>{/* HISTORY: 제목 */}
            <div className="artistHistoryArea"> {/* 작가 HISTORY */}
              <div className="artistHistory">
                {/* *수정* API 받은 후 수정! 글자 길이 제한 방법 고민 .. */}
                <div>전시 : {artistExhibits.join(", ")}</div>
                <div>작품 : {artistWorks.join(", ")}</div>
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