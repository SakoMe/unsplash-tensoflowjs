import React from 'react';
import './Loader.css';

export default function Loader() {
  return (
    <div className='Loader'>
      <div className='Loader__container'>
        <div className='Loader__container-ball ball-1' />
        <div className='Loader__container-ball ball-2' />
        <div className='Loader__container-ball ball-3' />
      </div>
    </div>
  );
}
