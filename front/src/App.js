import './App.css';
import Home from './home/home'
import Exhibit from './exhibit/exhibit'
import WorkPage from './work/WorkPage'
import WorkDetailPage from './work/WorkDetailPage'
import Artist from './artist/artist'
import Auction from './auction/auction'
import Signup from './signup/signup'
import Mypage from './mypage/mypage';
import { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './navbar/navbar';

export const AppContext = createContext();

function App() {

  const [login, setLogin] = useState(false);
  const [notice, setNotice] = useState(true);

  return (
    <>
      <AppContext.Provider value={{ login, setLogin, notice, setNotice }}>
        <NavBar />
        <div style={{ display: "flex", justifyContent: "center" }} className="App">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/exhibit" element={<Exhibit />}></Route>
            <Route exact path="/work" element={<WorkPage />}></Route>
            <Route exact path="/work/:id" element={<WorkDetailPage/>}></Route>
            <Route exact path="/artist" element={<Artist />}></Route>
            <Route exact path="/auction" element={<Auction />}></Route>
            <Route exact path="/user/info" element={<Mypage/>}></Route>
            <Route exact path="/user/join" element={<Signup />}></Route>
          </Routes>
        </div>
      </AppContext.Provider>
    </>

  );
}

export default App;
