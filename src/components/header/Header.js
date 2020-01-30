import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

import SearchBar from '../search-bar/SearchBar';

export default function Header() {
  return (
    <header className='Header'>
      <NavLink className='Header__logo' to='/'>
        Image AI
      </NavLink>
      <SearchBar />
    </header>
  );
}
