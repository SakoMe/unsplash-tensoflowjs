import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

import { AuthContext } from '../../contexts/AuthProvider';
import SearchBar from '../search-bar/SearchBar';

export default function Header() {
  const {
    state: { isSignedIn, userProfile },
    actions: { handleSignOut, handleSignIn }
  } = useContext(AuthContext);

  const renderAuthButton = () => {
    if (isSignedIn)
      return (
        <button className='Header__button-auth' onClick={handleSignOut}>
          Sign Out
        </button>
      );

    return (
      <button className='Header__button-auth' onClick={handleSignIn}>
        Sign in with Google
      </button>
    );
  };

  const renderUserProfile = () => {
    if (isSignedIn && userProfile) {
      return (
        <img
          className='Header__profile-avatar'
          src={userProfile.getImageUrl()}
          alt='current user avatar'
        />
      );
    }
  };

  return (
    <header className='Header'>
      <NavLink className='Header__logo' to='/'>
        LOGO
      </NavLink>
      <SearchBar />
      {renderAuthButton()}
      {renderUserProfile()}
    </header>
  );
}
