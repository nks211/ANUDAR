import './App.css';
import Home from './home/home'
import Exhibit from './exhibit/exhibit'
import WorkPage from './work/WorkPage'
import WorkDetailPage from './work/WorkDetailPage'
import ArtistPage from './artist/ArtistPage'
import ArtistDetailPage from './artist/ArtistDetailPage'
import Auction from './auction/auction'
import Signup from './signup/signup'
import { Routes, Route } from 'react-router-dom';
import NavBar from './navbar/navbar';

export default function App() {
  return (
    <>
      <NavBar/>
      <div style={{ display: "flex", justifyContent: "center" }} className="App">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/exhibit" element={<Exhibit />}></Route>
          <Route exact path="/work" element={<WorkPage />}></Route>
          <Route exact path="/work/:id" element={<WorkDetailPage/>}></Route>
          <Route exact path="/artist" element={<ArtistPage />}></Route>
          <Route exact path="/artist/:id" element={<ArtistDetailPage/>}></Route>
          <Route exact path="/auction" element={<Auction />}></Route>
          <Route exact path="/user/join" element={<Signup/>}></Route>
        </Routes>
      </div>
    </>

  );
}