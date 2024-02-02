import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Like from "../components/like/Like";
import Work from "../components/work/Work";
import dummy from "../db/data.json"
import './WorkPage.css'

export default function WorkDetailPage() {
  const workId = useLocation().pathname.split('/').pop();
  // const workId = Number(useLocation().pathname.split('/').pop());

  const works = [];
  // *수정* : 찜하기 구현 -> user 정보 받아와서 ..
  const [isLike, setIsLike] = useState()

  let workInfo = dummy.works[workId]
  let [title, artist, description, image, price, startDate] = [workInfo.title, workInfo.artist, workInfo.description, workInfo.image, workInfo.price.toLocaleString(), workInfo.startDate];

  for (let i=0; i<dummy.works.length; i++) {
    if (i !== Number(workId) && artist === dummy.works[i].artist) {
      works.push(JSON.stringify(dummy.works[i]))
    }
  }
  
  let content = <div></div>
  if (works.length > 0) {
    const workList = JSON.parse(`[${works}]`);
    content = <div className="workList">
                {workList.map(work=>(
                  <Work className="Work" workType={3} workId={work.id} workName={work.title} workArtist={work.artist} image={"../../"+work.image} workAuctionDate={work.startDate} workAuctionPrice={work.price}/>
                ))}
              </div>
  }

  return (
    <div>
      <div className="workArea">
        <img src={"../../"+image} width={450} height={450}></img>
        <div className="workInfo">
          <div className="workHeader"> {/* 제목, 찜하기 버튼 */}
            <div className="workTitle boldFont">{title}</div>
            <Like icon="asset/heart" name="찜하기" />
          </div>
          <div style={{paddingLeft:"10px"}}>
          <div className="workArtist boldFont">{artist}</div> {/* 작가명 */}
          <div className="workDescriptionArea"> {/* 작품 소개 */}
            {/* <div className="workDescription">{description}</div> */}
            <div className="workDescription">{description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} {description} </div>
          </div>
          <hr className="workLine"/> {/* 선 */}
          <div className="workPrice"><span className="boldFont">시작가</span><span>KRW {price}</span></div>
          <div className="workDate"><span className="boldFont">경매일</span><span>{startDate}</span></div>
          </div>
        </div>
      </div>
      
      <div className="otherWorks boldFont">작가의 다른 작품</div>
      <div className="otherWorkList">
        {content}
        {/* <div className="workList">
          {workList.map(work=>(
            <Work className="Work" workType={3} workId={work.id} workName={work.title} workArtist={work.artist} image={"../../"+work.image} workAuctionDate={work.startDate} workAuctionPrice={work.price}/>
          ))}
        </div> */}
      </div>
    </div>
  )
}