import './App.css';
import Home from './home/home'
import Exhibit from './exhibit/exhibit'
import Work from './work/work'
import Artist from './artist/artist'
import Auction from './auction/auction'
import Signup from './signup/signup'
import { Routes, Route } from 'react-router-dom';
import NavBar from './navbar/navbar';

function App() {
  return (
    <>
      <NavBar/>
      <div style={{ display: "flex", justifyContent: "center" }} className="App">
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/exhibit" element={<Exhibit />}></Route>
          <Route exact path="/work" element={<Work />}></Route>
          <Route exact path="/artist" element={<Artist />}></Route>
          <Route exact path="/auction" element={<Auction />}></Route>
          <Route exact path="/user/join" element={<Signup/>}></Route>
        
        </Routes>
      </div>
    </>

  );
}

export default App;
