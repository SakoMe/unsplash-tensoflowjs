import React, { useContext, useRef, useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import './Image.css';

import { UnsplashContext } from '../../contexts/UnsplashProvider';
import Loader from '../loader/Loader';
import { capitalize, roundNumber } from '../../utils';

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
            <h1>Photo Description</h1>
            <h4 className='Image__container-description_h4'>
              {capitalize(unsplashState.image.alt_description)}
            </h4>
            <button className='Image__container-button' onClick={predict}>
              Run AI
            </button>
            <hr className='Image__container-hr' />
            {predictions.length > 0 && (
              <div>
                <h2>TensorFlow</h2>
                <div>
                  {predictions.map((prediction, idx) => (
                    <div key={idx}>
                      <h5>Prediction: {capitalize(prediction.className)}.</h5>
                      <h5>
                        Probablility: {roundNumber(prediction.probability)}
                      </h5>
                      <hr />
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
