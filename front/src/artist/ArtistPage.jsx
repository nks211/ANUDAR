import { React, useEffect, useState } from "react";
import Search from "../components/search/Search";
import Artist from "../components/artist/Artist";
import '../index.css'
import { getAuthors } from "../API";
import Loading from "../components/loading/Loading";
import { useNavigate } from "react-router-dom";

export default function ArtistPage() {
  const [isConnect, setIsConnect] = useState(false);  // API 연결 확인
  const [artists, setArtists] = useState([]);
  const [searchV, setSearchV] = useState("")  // 검색 값
  const [showArtists, setShowArtists] = useState([]);

  const navigate = useNavigate();

  async function getData() {
    try {
      const res = await getAuthors()
      setArtists(res)
      setShowArtists(res)
      setIsConnect(true)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    getData()
  }, [])


  return (
    <div>
      <Search 
        searchValue={searchV}
        setSearchValue={(search)=>setSearchV(search)}
        updateValues={(searchArtist)=>{
          const filterArtists = artists.filter(artist => artist.name.includes(searchArtist))
          if (!filterArtists.length) {alert('일치하는 작가가 없습니다.'); setShowArtists(artists); return}
          setShowArtists(filterArtists)
      }}/>

      <div className="artistList">
        {isConnect?
          (showArtists.length?
            showArtists.map(artist=>( <Artist artist={artist} /> ))
            :<div style={{width:"100%"}}>
              <div>등록된 작가가 없습니다. 전시회를 등록해보세요!</div>
              {/* <button onClick={()=>navigate("/exhibit/regist")}>전시회 등록하러 가기</button> */}
            </div>
          )
          :<Loading loadingType={"artistList"} />
        }
      </div>
    </div>
  );
}