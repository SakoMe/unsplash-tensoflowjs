import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

import { AuthContext } from '../../contexts/AuthProvider';
import SearchBar from '../search-bar/SearchBar';

export default function Header() {
  const { authState, authActions } = useContext(AuthContext);

  const renderAuthButton = () => {
    if (authState.isSignedIn)
      return (
        <button
          className='Header__button-auth'
          onClick={authActions.handleSignOut}
        >
          Sign Out
        </button>
      );

    return (
      <button
        className='Header__button-auth'
        onClick={authActions.handleSignIn}
      >
        Sign in with Google
      </button>
    );
  };

  const renderUserProfile = () => {
    if (authState.isSignedIn && authState.userProfile) {
      return (
        <img
          className='Header__profile-avatar'
          src={authState.userProfile.getImageUrl()}
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
