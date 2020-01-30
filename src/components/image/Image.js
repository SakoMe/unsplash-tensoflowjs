import React, { useContext, useRef, useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import './Image.css';

import { UnsplashContext } from '../../contexts/UnsplashProvider';
import Loader from '../loader/Loader';
import { capitalize } from '../../utils';

export default function Image() {
  const { unsplashState } = useContext(UnsplashContext);
  const [predictions, setPredictions] = useState([]);
  const imgRef = useRef(null);

  const predict = async () => {
    const img = imgRef.current;
    const model = await mobilenet.load();
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
          <aside className='Image__container-description'>
            <h1>Photo Details - Unsplash</h1>
            {unsplashState.image.description && (
              <p>Description: {capitalize(unsplashState.image.description)}</p>
            )}
            <p>
              Alt Description: {capitalize(unsplashState.image.alt_description)}
            </p>
            <button onClick={predict}>Run AI</button>
            <hr />
            {predictions.length > 0 && (
              <div>
                <h2>Tensorflow Predictions</h2>
                <div>
                  {predictions.map((prediction, idx) => (
                    <div key={idx}>
                      <p>Prediction: {capitalize(prediction.className)}.</p>
                      <p>Probablility: {prediction.probability}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      );
    }
    return <h1 className='Image__default'>Search For Images</h1>;
  };
  return <div className='Image'>{renderImage()}</div>;
}
