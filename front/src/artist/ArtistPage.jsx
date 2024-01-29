import { React, useState } from "react";
import Search from "../components/search/Search";
import Artist from "../components/artist/Artist";
import dummy from "../db/data.json"
import '../index.css'

export default function ArtistPage() {
  const artistList = [];
  for (let i=0; i<dummy.artists.length; i++) {
    artistList.push(dummy.artists[i])
  }

  const [artists, setArtists] = useState(artistList);

  // console.log(artists)

  let content = <div className="artistList">
                  {artists.map(artist=>(
                  <Artist artistId={artist.id} artistName={artist.name} image={"../"+artist.image+".png"} artistExhibit={artist.exhibits} artistWork={artist.works} />
                  ))}
                </div>

  return (
    <div>
      <Search updateValues={(searchArtist)=>{
        const newArtists = []
        for (let i=0; i<dummy.artists.length; i++) {
          if (dummy.artists[i].name.includes(searchArtist)) {
            newArtists.push(dummy.artists[i])
          }
        }
        setArtists(newArtists)
      }}/>
      {content}
    </div>
  );
}