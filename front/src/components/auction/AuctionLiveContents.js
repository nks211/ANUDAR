import { useContext, useState } from 'react'
import { AuctionLiveContext } from '../../auctionlive/AuctionLivePage'
import Bidding from './Bidding'

function AuctionLiveContent() {
    return (
        <>
        <div className="contentHeader">
          <h2>채팅</h2>
          <hr/>
        </div>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%"}}>
         
          <div id="chatting"> 
          <Bidding/>
          </div>

        </div>
      </>   
    )
}

export default function AuctionLiveContents() {

  return (
    <div className="docentContent">
      <div className="contentBox"><AuctionLiveContent/></div>
    </div>
  )
}