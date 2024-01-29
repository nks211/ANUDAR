import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Like from "../components/like/Like";
import Work from "../components/work/Work";
import dummy from "../db/data.json"
import './WorkPage.css'

export default function WorkDetailPage() {
  const workId = useLocation().pathname.slice(-1);
  const works = [];
  // *수정* : 찜하기 구현 -> user 정보 받아와서 ..
  const [isLike, setIsLike] = useState()

  let workInfo = {};
  let [title, artist, description, image, price, startDate] = ''
  
  for (let i=0; i<dummy.works.length; i++) {
    if (i === Number(workId)) {
      workInfo = dummy.works[i]
      artist = workInfo.artist
      title = workInfo.title
      description = workInfo.description
      image = workInfo.image
      price = workInfo.price.toLocaleString()
      startDate = workInfo.startDate
    }
  }

  for (let i=0; i<dummy.works.length; i++) {
    if (i !== Number(workId) && artist === dummy.works[i].artist) {
      works.push(dummy.works[i])
    }
  }

  return (
    <div>
      <div className="workArea">
        <img src={"../../"+image} width={450} height={450}></img>
        <div className="workInfo">
          <div className="workHeader"> {/* 제목, 찜하기 버튼 */}
            <div className="workTitle fontWeightStrong">{title}</div>
            {/* <div>찜하기</div> */}
            <Like icon="asset/heart" name="찜하기" />
          </div>
          <div style={{paddingLeft:"10px"}}>
          <div className="workArtist fontWeightStrong">{artist}</div> {/* 작가명 */}
          <div className="workDescriptionArea"> {/* 작품 소개 */}
            {/* <div className="workDescription">{description}</div> */}
            <div className="workDescription">{description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} </div>
          </div>
          <hr className="workLine"/> {/* 선 */}
          <div className="workPrice"><span className="fontWeightStrong">시작가</span><span>KRW {price}</span></div>
          <div className="workDate"><span className="fontWeightStrong">경매일</span><span>{startDate}</span></div>
          </div>
        </div>
      </div>

      <div className="otherWorks fontWeightStrong">작가의 다른 작품</div>
      <div className="otherWorkList">
        <div className="WorkList">
          {works.map(work=>(
            <Work className="Work" workType={3} workId={work.id} workName={work.title} workArtist={work.artist} image={"../../"+work.image} workAuctionDate={work.startDate} workAuctionPrice={work.price}/>
          ))}
        </div>
      </div>
    </div>
  )
}