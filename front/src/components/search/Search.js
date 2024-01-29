import { useState } from 'react'
import './Search.css'

export default function Search(props) {
  const [searchValue, setSearchValue] = useState("");
<<<<<<< HEAD

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
=======
  return (
    <div className="search">
      {/* <div className="searchArea"> */}


      <input id="searchValue" type="text" onChange={event=>{
        setSearchValue(event.target.value)
        // console.log(event.target.value)
        // console.log(searchValue)
        }}/>
      {/* <input type="submit" value="검색"/> */}
      <button onClick={()=>{
        // console.log(searchValue)
        props.updateWorks(searchValue)
        }}>검색</button>

      {/* </div> */}
    </div>

    // <div className="search">
    //   <input type="text" />
    //   <label>Name</label>
    //   <span></span>
    // </div>
>>>>>>> bfd35c47c90d9bc47c2862f72097a7fdf15000db
  )
}