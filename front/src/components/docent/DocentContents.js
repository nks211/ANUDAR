import { useContext, useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { DocentContext } from '../../docent/DocentPage'
import Chatting from './Chatting'
import './DocentContents.css'
import { getExhibitDetail } from '../../API'

function DocentContent() {
  const { menu, setMenu } = useContext(DocentContext);
  const [selectWork, setSelectWork] = useState(null);
  const [works, setWorks] = useState([]);
  const exhibitId = useLocation().pathname.split('/').pop();
  const dcntWorkTopRef = useRef(null);

  useEffect(() => {
    getExhibitDetail(exhibitId).then(data => {
      setWorks(data.workList);
      console.log(data)
      console.log(data.workList)
      if (data.workList && data.workList.length > 0) {
        setSelectWork(data.workList[0]);
      }
    })
    .catch(error => console.log(error));
  }, [])


  switch (menu) {
    case "work":

      // const dcntWorkTop = document.getElementById('docentWork')
    
      return (
        <>
          <div className="contentHeader">
            <h2>작품</h2>
            <hr/>
          </div>
          <div id="docentWork" ref={dcntWorkTopRef}>
            {selectWork && ( // selectWork가 존재할 때만 작품 정보를 렌더링합니다.
              <div style={{ marginBottom: "8vh" }}>
                <img style={{ width: "300px", height: "auto" }} src={selectWork.image}></img>
                <h3>{selectWork.title}</h3>
                <div>{selectWork.detail}</div>
              </div>
            )}
            <div id="docentWorks">
              {works.map(work => (
                <img key={work.id} className="dcntWorkImg" src={work.image} onClick={() => {
                  setSelectWork(work);
                  dcntWorkTopRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}></img>
              ))}
            </div>
          </div>
        </>
      )

    case "chat":
      return (
        <>
          <div className="contentHeader">
            <h2>채팅</h2>
            <hr/>
          </div>
          <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%"}}>
            <div id="chatting">
              <Chatting/>
            </div>
            {/* <div id="chatInput">
              <input placeholder="채팅을 입력하세요"></input>
              <button onClick={()=>{
                // *수정* API 연결
              }}>입력</button>
            </div> */}
          </div>
        </>
      )
    
    case "visitor":
      return (
        <>
          <div className="contentHeader">
            <h2>참여자</h2>
            <hr/>
          </div>
        </>
      )
    
    // case "record":
    //   return (
    //     <>
    //       <div className="contentHeader">
    //         <h2>녹화</h2>
    //         <hr/>
    //       </div>
    //     </>
    //   )

    case "close":
      return (
        <>
        <div onClick={()=>setMenu("")} style={{cursor:"pointer"}}>{"<"}</div>
        </>
      )
  
    default:
      return (<div></div>)
  }
}

export default function DocentContents() {

  return (
    <div className="docentContent">
      <div className="contentBox"><DocentContent/></div>
    </div>
  )
}