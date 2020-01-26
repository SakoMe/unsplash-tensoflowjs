import React, { useContext } from 'react';
import search from '../../icons/search.svg';
import './SearchBar.css';
import { AuthContext } from '../../contexts/AuthProvider';

export default function SearchBar() {
  const {
    state: { isSignedIn }
  } = useContext(AuthContext);
  if (isSignedIn) {
    return (
      <form className='Search'>
        <input className='Search__input' type='text' />
        <img className='Search__icon' src={search} alt='search icon' />
      </form>
    );
  }
  return null;
}
