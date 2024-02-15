import { useState } from 'react'
import './Search.css'

export default function Search(props) {

  return (
    <div className="search">
      <input id="searchValue" type="text" 
        value={props.searchValue}
        onChange={event=>{ props.setSearchValue(event.target.value) }}
        onKeyDown={(event)=>{ if (event.keyCode === 13) { props.updateValues(props.searchValue); props.setSearchValue("") }}}
        />
      <button style={{fontFamily: "SUIT-Regular", borderRadius: "0.7rem"}}
        onClick={()=>{props.updateValues(props.searchValue); props.setSearchValue("")}}>
        검색
      </button>
    </div>
  )
}
