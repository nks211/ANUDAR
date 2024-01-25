import './App.css';
import Home from './home/home'
import Exhibit from './exhibit/exhibit'
import WorkPage from './work/WorkPage'
import WorkDetailPage from './work/WorkDetailPage'
import Artist from './artist/artist'
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
          <Route exact path="/artist" element={<Artist />}></Route>
          <Route exact path="/auction" element={<Auction />}></Route>
          <Route exact path="/user/join" element={<Signup/>}></Route>
          <Route exact path="/work/:id" element={<WorkDetailPage/>}></Route>
        </Routes>
      </div>
    </>

  );
}