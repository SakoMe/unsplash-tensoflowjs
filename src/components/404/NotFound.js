import React from 'react';
import './NotFound.css';
import notFound from '../../images/404.jpg';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='NotFound'>
      <h1 className='NotFound__header'>Page Not Found</h1>
      <Link className='NotFound__link' to='/'>
        Back to Home
      </Link>
      <img className='NotFound__image' src={notFound} alt='page not found' />
    </div>
  );
}
