import React, { useContext, useRef, useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import './Image.css';

import { UnsplashContext } from '../../contexts/UnsplashProvider';
import Loader from '../loader/Loader';

import SideBar from '../sidebar/SideBar';

export default function Image() {
  const { unsplashState } = useContext(UnsplashContext);
  const [predictions, setPredictions] = useState([]);
  const imgRef = useRef(null);

  const predict = async () => {
    const img = imgRef.current;
    const model = await mobilenet.load({ version: 2, alpha: 1.0 });
    const predictions = await model.classify(img);
    setPredictions(predictions);
  };

  const renderImage = () => {
    if (unsplashState.isLoading) return <Loader />;
    if (unsplashState.error) return <div>{unsplashState.error}</div>;
    if (unsplashState.image) {
      return (
        <div className='Image__container'>
          <img
            ref={imgRef}
            className='Image__container-img'
            crossOrigin='anonymous'
            src={unsplashState.image.urls.regular}
            alt={unsplashState.image.alt_description}
          />
          <SideBar
            predictions={predictions}
            image={unsplashState.image}
            predict={predict}
          />
        </div>
      );
    }
    return <h1 className='Image__default-text'>Search For Images...</h1>;
  };
  return <div className='Image'>{renderImage()}</div>;
}
