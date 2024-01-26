import { useState } from 'react'
import './Search.css'

export default function Search(props) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="search">
      <input id="searchValue" type="text" onChange={event=>{
        setSearchValue(event.target.value)
        }}
        onKeyDown={(event)=>{
          if (event.keyCode === 13) {
            props.updateValues(searchValue)
          }}}
        />
      <button 
      onClick={()=>{props.updateValues(searchValue)}}
      >검색</button>
    </div>
  )
}