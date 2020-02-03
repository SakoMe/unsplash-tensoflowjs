import React from 'react';
import './SideBar.css';
import { capitalize, roundNumber } from '../../utils';

export default function SideBar({ predictions, image, predict }) {
  return (
    <aside className='SideBar__container'>
      <h1>Photo Description</h1>
      <h4 className='SideNar__container-description'>
        {capitalize(image.alt_description)}
      </h4>
      <button className='SideBar__container-button' onClick={predict}>
        Run AI
      </button>
      <hr className='SideBar__container-hr' />
      {predictions.length > 0 && (
        <div>
          <h2>TensorFlow</h2>
          <div>
            {predictions.map((prediction, idx) => (
              <div key={idx}>
                <h5>Prediction: {capitalize(prediction.className)}.</h5>
                <h5>Probablility: {roundNumber(prediction.probability)}</h5>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
