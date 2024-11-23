import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Players from './pages/Players.jsx';
import Teams from './pages/Teams.jsx';
import PlayersForm from './forms/playerForm.jsx'

function App() {
  return (
    <div className="main-container">
      <Navbar />
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/players' element={<Players />} />
        <Route path='/teams' element={<Teams />} />
        <Route path='/playersForm' element={<PlayersForm />} />
      </Routes>
    </div>
    </div>
  )
}

export default App
