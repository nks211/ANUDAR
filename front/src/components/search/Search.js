import { useState } from 'react'
import './Search.css'

export default function Search(props) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="search">
      <input id="searchValue" type="text" 
        value={props.searchValue}
        // onChange={event=>{ setSearchValue(event.target.value) }}
        onChange={event=>{ props.setSearchValue(event.target.value) }}
        // onKeyDown={(event)=>{ if (event.keyCode === 13) { props.updateValues(searchValue) }}}
        onKeyDown={(event)=>{ if (event.keyCode === 13) { props.updateValues(props.searchValue); props.setSearchValue("") }}}
        />
      <button style={{fontFamily: "SUIT-Regular", borderRadius: "0.7rem"}}
        // onClick={()=>{props.updateValues(searchValue)}}>
        onClick={()=>{props.updateValues(props.searchValue); props.setSearchValue("")}}>
        검색
      </button>
    </div>
  )
}
