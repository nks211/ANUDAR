import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Like from "../components/like/Like";
import Work from "../components/work/Work";
import './WorkPage.css'
import { getLikeWorks, getWork, getAuthorWorks } from '../API';
import { mainstate } from '../StateManagement';

export default function WorkDetailPage() {
  const workId = useLocation().pathname.split('/').pop();

  const [work, setWork] = useState({})
  const [isLike, setIsLike] = useState(false)
  const logintoken = mainstate((state) => (state.logintoken))
  const [works, setWorks] = useState([]);  // 작가의 작품

  // 작품 정보 조회
  async function getData() {
    try {
      const res = await getWork(workId)
      console.log(res)
      setWork(res)
      getWorks(res)
    } catch (err) {
      console.log(err)
    }
  }
  
  // 작품 찜 목록 조회
  async function getLike() {
    try {
      let likes;
      const res = await getLikeWorks(logintoken)
      likes = res
      // console.log(likes)

      for (let i=0; i<likes.length; i++) {
        if (likes[i].id === Number(workId)) { setIsLike(true); return }
        setIsLike(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // 작가 작품 조회
  async function getWorks(work) {
    try {
      const res = await getAuthorWorks(work.author, logintoken)
      setWorks(res)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    getData()
    getLike()
  }, [])
  
  // useEffect(()=>{
  //   if (Object.keys(work).length) { getWorks() }
  // }, [work])

  const changeLike = (value) => {
    setIsLike(value)
  }



  // const works = [];
  // // *수정* : 찜하기 구현 -> user 정보 받아와서 ..

  // let workInfo = dummy.works[workId]
  // let [title, artist, description, image, price, startDate] = [workInfo.title, workInfo.artist, workInfo.description, workInfo.image, workInfo.price.toLocaleString(), workInfo.startDate];

  // for (let i=0; i<dummy.works.length; i++) {
  //   if (i !== Number(workId) && artist === dummy.works[i].artist) {
  //     works.push(JSON.stringify(dummy.works[i]))
  //   }
  // }
  
  // let content = <div></div>
  // if (works.length > 0) {
  //   const workList = JSON.parse(`[${works}]`);
  //   content = <div className="workList">
  //               {workList.map(work=>(
  //                 <Work className="Work" workType={3} workId={work.id} workName={work.title} workArtist={work.artist} image={"../../"+work.image} workAuctionDate={work.startDate} workAuctionPrice={work.price}/>
  //               ))}
  //             </div>
  // }

  return (
    <div>
      <div className="workArea">
        <img src={work.image} />
        <div className="workInfo">
          <div className="workHeader"> {/* 제목, 찜하기 버튼 */}
            <div className="workTitle boldFont">{work.title}</div>
            <Like id={workId} icon="asset/heart" likeType="work" isLike={isLike} name={isLike?"찜취소":"찜하기"} onChangeLike={changeLike} />
          </div>
          <div style={{paddingLeft:"10px"}}>
          <div className="workArtist boldFont">{work.author_name}</div> {/* 작가명 */}
          <div className="workDescriptionArea"> {/* 작품 소개 */}
            <div className="workDescription">{work.detail}</div>
          </div>
          <hr className="workLine"/> {/* 선 */}
          <div className="workPrice"><span className="boldFont">시작가</span><span>KRW {work.price}</span></div>
          {/* <div className="workDate"><span className="boldFont">경매일</span><span>{startDate}</span></div> */}
          </div>
        </div>
      </div>
      
      <div className="otherWorks boldFont">작가의 다른 작품</div>
      <div className="otherWorkList">
        <div className="workList">
          {works.map(work=>( <Work className="Work" workType={3} work={work} /> ))}
        </div>
        {/* {content} */}
        {/* <div className="workList">
          {workList.map(work=>(
            <Work className="Work" workType={3} workId={work.id} workName={work.title} workArtist={work.artist} image={"../../"+work.image} workAuctionDate={work.startDate} workAuctionPrice={work.price}/>
          ))}
        </div> */}
      </div>
    </div>
  )
}