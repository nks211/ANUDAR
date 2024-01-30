import { React, useState } from "react";
import dummy from "../db/data.json"
import Work from "../components/work/Work";
import Search from "../components/search/Search";
import '../index.css'

export default function WorkPage() {
  const workList = [];

  for (let i=0; i<dummy.works.length; i++) {
    workList.push(dummy.works[i])
  }

  const [works, setWorks] = useState(workList);

  let content = <div className="workList">
                  {works.map(work=>(
                    // <Work className="Work" workType={1} workId={work.id} workName={work.title} workArtist={work.artist} image={"../../"+work.image} workAuctionDate={work.startDate} workAuctionPrice={work.price}/>
                    <Work className="Work" workType={1} 
                    work={work}
                    workId={work.id} workName={work.title} workArtist={work.artist} image={"../../"+work.image} workAuctionDate={work.startDate} workAuctionPrice={work.price}/>
                  ))}
                </div>


  return (
    <div>
      <Search updateValues={(searchWork) => {
        const newWorks = []
        for (let i=0; i<dummy.works.length; i++) {
          // *수정* : title (API 연결 후) 변경
          if (dummy.works[i].title.includes(searchWork)) {
            // 뒤에서부터 넣기 !!!!!!!
            newWorks.push(dummy.works[i])
            console.log(newWorks)
          }
        }
        setWorks(newWorks)
        // content = <div className="WorkList">
        //             {works.map(work=>(
        //               <Work className="Work" workType={1} workName={work.title} workArtist={work.artist} image={"../../"+work.image} workAuctionDate={work.startDate} workAuctionPrice={work.price}/>
        //             ))}
        //           </div>

      }}/>
      {/* // </div> */}
      {/* <div>{searchWork}</div> */}
      {content}
      {/* <div className="WorkList">
        {works.map(work=>(
          <Work className="Work" workType={1} workName={work.title} workArtist={work.artist} image={"../../"+work.image} workAuctionDate={work.startDate} workAuctionPrice={work.price}/>
        ))}
      </div> */}
    </div>
  );
};