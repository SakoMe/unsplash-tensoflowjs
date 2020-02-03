import React, { useContext } from 'react';
import './ImageList.css';

import { UnsplashContext } from '../../contexts/UnsplashProvider';

import Loader from '../loader/Loader';
import ImageListItem from '../image-list-item/ImageListItem';

export default function ImageList() {
  const { unsplashState } = useContext(UnsplashContext);

  const renderImgeList = () => {
    if (unsplashState.isLoading) return <Loader />;
    if (unsplashState.error) return <div>{unsplashState.error}</div>;
    if (unsplashState.images.length > 0) {
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
    return <h1 className='ImageList__default-text'>Search For Images...</h1>;
  };
  return <>{renderImgeList()}</>;
}
