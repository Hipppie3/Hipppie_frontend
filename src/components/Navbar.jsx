import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to close the menu when a link is clicked
  const closeMenu = () => setMenuOpen(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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

      {/* Navigation Links */}
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

        {/* Dropdown for Forms */}
        <li className="dropdown" ref={dropdownRef}>
          <button
            className="dropdown-btn"
            onClick={toggleDropdown}
            aria-expanded={dropdownOpen}
          >
            FORM
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <NavLink to="/playersForm" onClick={closeMenu}>
                  Players Form
                </NavLink>
              </li>
              <li>
                <NavLink to="/teamsForm" onClick={closeMenu}>
                  Teams Form
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
