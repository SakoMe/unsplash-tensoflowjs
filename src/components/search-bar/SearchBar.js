import React, { useContext } from 'react';
import search from '../../icons/search.svg';
import './SearchBar.css';

import history from '../../history';

import { AuthContext } from '../../contexts/AuthProvider';
import { useForm } from '../../hooks/useForm';
import { UnsplashContext } from '../../contexts/UnsplashProvider';

export default function SearchBar() {
  const { authState } = useContext(AuthContext);
  const { unsplashActions } = useContext(UnsplashContext);
  const { values, handleChange, reset } = useForm({ searchTerm: '' });

  const handleSubmit = ev => {
    ev.preventDefault();
    unsplashActions.handleSearch(values.searchTerm);
    reset();
    history.goBack();
  };

  if (authState.isSignedIn) {
    return (
      <form className='Search' onSubmit={handleSubmit}>
        <input
          className='Search__input'
          type='text'
          name='searchTerm'
          value={values.searchTerm}
          onChange={handleChange}
        />
        <img
          className='Search__icon'
          src={search}
          alt='search icon'
          onClick={handleSubmit}
        />
      </form>
    );
  }
  return null;
}
