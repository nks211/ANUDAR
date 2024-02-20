import { useContext, useState } from 'react'
import { DocentContext } from '../../docent/DocentPage'
import './DocentTab.css'

export default function DocentTab() {
  const { menu, setMenu } = useContext(DocentContext);

  return(
    <div className="docentTab">
      <div><img src="../../asset/logo_white.png" style={{width:"90%"}} onClick={()=>{
        setMenu("close")
        // content 화면 감추기 ... ?
      }}></img></div>
      <hr style={{width:"75%", margin:0}}/>

      {menu==="work"?
      <div className="reverseTab"><img src="../../asset/tab_work_reverse.png"></img></div>:
      <div onClick={()=>{setMenu("work")}}><img src={"../../asset/tab_work.png"}></img></div>}

      {menu==="chat"?
      <div className="reverseTab"><img src="../../asset/tab_chat_reverse.png"></img></div>:
      <div onClick={()=>{setMenu("chat")}}><img src={"../../asset/tab_chat.png"}></img></div>}

      {/* {menu==="visitor"?
      <div className="reverseTab"><img src="../../asset/tab_visitor_reverse.png"></img></div>:
      <div onClick={()=>{setMenu("visitor")}}><img src={"../../asset/tab_visitor.png"}></img></div>} */}

      {/* {menu==="record"?
      <div className="reverseTab"><img src="../../asset/tab_record_reverse.png"></img></div>:
      <div onClick={()=>{setMenu("record")}}><img src={"../../asset/tab_record.png"}></img></div>} */}
    </div>
  )
}