import React from 'react';
import './ImageListItem.css';

export default function ImageListItem({ image }) {
  return (
    <img
      className='ImageList__item-img'
      src={image.urls.regular}
      alt={image.description}
    />
  );
}
