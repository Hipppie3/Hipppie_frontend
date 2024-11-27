import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Players from './pages/Players.jsx';
import Teams from './pages/Teams.jsx';
import TeamsForm from './forms/TeamForm.jsx';
import PlayersForm from './forms/PlayerForm.jsx'
import PlayersPage from './pages/PlayersPage.jsx'

function App() {
  return (
    <div className="main-container">
      <Navbar />
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/players' element={<Players />} />
        <Route path='/teams' element={<Teams />} />
        <Route path='/teamsForm' element={<TeamsForm />} />
        <Route path='/playersForm' element={<PlayersForm />} />
        <Route path='/players/:id' element={<PlayersPage />} />
      </Routes>
    </div>
    </div>
  )
}

export default App
