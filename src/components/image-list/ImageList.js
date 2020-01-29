import React, { useContext } from 'react';
import './ImageList.css';

import { UnsplashContext } from '../../contexts/UnsplashProvider';

import Loader from '../loader/Loader';
import ImageListItem from '../image-list-item/ImageListItem';

export default function ImageList() {
  const { unsplashState } = useContext(UnsplashContext);

  if (unsplashState.isLoading) return <Loader />;
  if (unsplashState.error) return <div>{unsplashState.error}</div>;

  return (
    <div className='ImageList'>
      {unsplashState.images.map(image => (
        <div className='ImageList__item' key={image.id}>
          <ImageListItem image={image} />
        </div>
      ))}
    </div>
  );
}
