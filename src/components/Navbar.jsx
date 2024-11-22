import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to close the menu when a link is clicked
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <NavLink to="/" className="logo-link">
        HIPPPIE
      </NavLink>

      {/* Hamburger / X Button */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
      >
        {menuOpen ? '✖' : '☰'}
      </button>

      {/* Dropdown Menu */}
      <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
        <li>
          <NavLink to="/players" onClick={closeMenu}>
            PLAYERS
          </NavLink>
        </li>
        <li>
          <NavLink to="/teams" onClick={closeMenu}>
            TEAMS
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
