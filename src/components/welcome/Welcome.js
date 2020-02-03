import React from 'react';
import './Welcome.css';

export default function Welcome() {
  return (
    <section className='Welcome'>
      <h1 className='Welcome__heading'>Welcome</h1>
      <h4 className='Welcome__subheading'>
        Search for images and then run them through the TensorFlow.js MobileNet
        model to measure its prediction accuracy
      </h4>
    </section>
  );
}
