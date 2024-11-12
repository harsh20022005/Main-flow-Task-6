import React from 'react';
import './Image.css';

const Image = ({ src, caption, onClick }) => {
  return (
    <div className="image-container" onClick={onClick}>
      <img className="image" src={src} alt={caption} loading="lazy" />
      <div className="caption">{caption}</div>
    </div>
  );
};

export default Image;
