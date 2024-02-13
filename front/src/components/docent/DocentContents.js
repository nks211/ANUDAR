import { useContext, useRef, useState } from 'react'
import { DocentContext } from '../../docent/DocentPage'
import Chatting from './Chatting'
import './DocentContents.css'
import dummy from '../../db/data.json'

function DocentContent() {
  const { menu, setMenu } = useContext(DocentContext);
  const [selectWork, setSelectWork] = useState(0);

  switch (menu) {
    case "work":
      const works = [];

      for (let i=0; i<dummy.works.length; i++) {
        works.push(dummy.works[i])
      }

      const dcntWorkTop = document.getElementById('docentWork')
    
      return (
        <>
          <div className="contentHeader">
            <h2>작품</h2>
            <hr/>
          </div>
          <div id="docentWork">
            <div style={{marginBottom:"8vh"}}>
              <img src={'../../'+dummy.works[selectWork].image}></img>
              <h3>{dummy.works[selectWork].title}</h3>
              <div>{dummy.works[selectWork].description}</div>
            </div>
            <div id="docentWorks">
              {works.map(work=>(
                <img className="dcntWorkImg" src={"../../"+work.image} onClick={()=>{
                  setSelectWork(work.id);
                  dcntWorkTop.scrollTo({top:0, left:0, behavior: 'smooth'})
                }}></img>
              ))}
            </div>
          </div>
        </>
      )

    case "chat":
      const chats = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 
                    // '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
                    // '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
                  ]
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