import React, { useContext } from 'react';
import './ImageListItem.css';
import { UnsplashContext } from '../../contexts/UnsplashProvider';

export default function ImageListItem({ image }) {
  const { unsplashActions } = useContext(UnsplashContext);

  return (
    <img
      onClick={() => unsplashActions.getSingleImage(image.id)}
      className='ImageList__item-img'
      src={image.urls.regular}
      alt={image.description}
    />
  );
}
