import { lazy, Suspense } from 'react'
import { Routes, Route } from "react-router-dom"

import Loading from './utils/lodding/Loading';

import HostingPage from './pages/hostingPage/HostingPage';
import './utils/index.css'
import PlayerListCreate from './pages/playerList/PlayerListCreate';
import Register from './pages/userCredentials/Register';
import Login from './pages/userCredentials/Login';
import LiveMatchData from './pages/liveMatches/LiveMatchData';
import GamblingPage from './pages/Gambling/GamblingPage';
import BalancePage from './pages/Balance/BalancePage';
import UpCommingMatch from './pages/upcomming/UpCommingMatch';
import Logout from './pages/userCredentials/Logout';



export const App = () => {


  return (
    <>
      <div className="main-Container">
        <Suspense fallback={<Loading />}>
          <Routes>
            
            <Route path="/:id" element={<HostingPage />} />
            <Route path="/playerlistcreate" element={<PlayerListCreate/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<LiveMatchData/>} />
            <Route path="/home-matchdelails/:id" element={<GamblingPage/>} />
            <Route path="/balance" element={<BalancePage/>} />
            <Route path="/upcomming" element={<UpCommingMatch/>} />
            <Route path="/logout" element={<Logout/>} />
          </Routes>
        </Suspense>
      </div>

    </>
  )
}

