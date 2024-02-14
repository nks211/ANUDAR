import { React, useEffect, useState } from "react";
import Search from "../components/search/Search";
import Artist from "../components/artist/Artist";
import dummy from "../db/data.json"
import '../index.css'
import { getAuthors } from "../API";
import Loading from "../components/loading/Loading";

export default function ArtistPage() {
  const [artists, setArtists] = useState([]);

  async function getData() {
    try {
      const res = await getAuthors()
      setArtists(res)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    getData()
  }, [])

  let content = <div className="artistList">
                  {artists.map(artist=>(
                  <Artist artist={artist} />
                  ))}
                </div>

  return (
    <div>
      <Search updateValues={(searchArtist)=>{
        // const newArtists = []
        // for (let i=0; i<dummy.artists.length; i++) {
        //   if (dummy.artists[i].name.includes(searchArtist)) {
        //     newArtists.push(dummy.artists[i])
        //   }
        // }
        // setArtists(newArtists)
      }}/>

      <div className="artistList">        
        {artists.length?
          artists.map(artist=>( <Artist artist={artist} /> ))
          :<Loading loadingType={"artistList"} />
        }
      </div>
    </div>
  );
}