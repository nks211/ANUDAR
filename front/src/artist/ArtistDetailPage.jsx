import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Work from "../components/work/Work";
import Exhibition from "../components/exhibit/Exhibition";
import dummy from "../db/data.json"

export default function ArtistDetailPage() {
  const artistId = useLocation().pathname.slice(-1);
  // const [workList, setWorkList] = useState([]);  // 작가의 작품
  const works = [];  // 작가의 작품
  const exhibitions = [];  // 작가의 전시회
  // *수정* : 팔로우 버튼 구현
  const [isFollow, setIsFollow] = useState();

  let artistInfo = {};
  let [name, image, description, artistExhibitions, artistWorks] = ''

  for (let i=0; i<dummy.artists.length; i++) {
    if (i === Number(artistId)) {
      artistInfo = dummy.artists[i]
      name = artistInfo.name
      image = artistInfo.image
      description = artistInfo.description
      artistExhibitions = artistInfo.exhibitions
      artistWorks = artistInfo.works
    }
  }

  for (let i=0; i<dummy.works.length; i++) {
    if (dummy.works[i].artist === name) {
      works.push(JSON.stringify(dummy.works[i]))
    }
  }

  for (let i=0; i<dummy.exhibitions.length; i++) {
    if (dummy.exhibitions[i].artist === name) {
      exhibitions.push(JSON.stringify(dummy.exhibitions[i]))
    }
  }

  let worksContent = <div></div>
  let exhibitionsContent = <div></div>

  if (works.length > 0) {
    const workList = JSON.parse(`[${works}]`);
    worksContent = <div className="WorkList">
                    {workList.map(work=>(
                      <Work className="Work" workType={3} workId={work.id} workName={work.title} workArtist={work.artist} image={"../../"+work.image} workAuctionDate={work.startDate} workAuctionPrice={work.price}/>
                    ))}
                  </div>
  }

  
  if (exhibitions.length > 0) {
    const exhibitionList = JSON.parse(`[${exhibitions}]`);
    exhibitionsContent = <div className="exhibitionList">
                          {exhibitionList.map(exhibition=>(
                            <Exhibition exhibitionName={exhibition.title} exhibitionArtist={exhibition.artist} image={"../../"+exhibition.image} exhibitionPeriod={exhibition.period}/>
                            ))}
                        </div>
  }
  
  return(
    <div>
      <div className="artistArea">
        <img src={"../../"+image+"_detail.png"} style={{"object-fit": "cover"}} width={300} height={400}></img>
        <div className="artistInfo">
          <div className="artistHeader">
            
          </div>
        </div>
      </div>
      {worksContent}
      {exhibitionsContent}
    </div>
  )
}