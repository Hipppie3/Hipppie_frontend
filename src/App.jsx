import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Players from './pages/Players.jsx';
import Teams from './pages/Teams.jsx';

function App() {
  return (
    <div>
      <Navbar />
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/players' element={<Players />} />
        <Route path='/teams' element={<Teams />} />
      </Routes>
    </div>
    </div>
  )
}

export default App
