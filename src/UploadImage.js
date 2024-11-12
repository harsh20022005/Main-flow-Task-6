import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import './UploadImage.css';

const UploadImage = ({ onUpload }) => {
  const [imageData, setImageData] = useState({ src: '', caption: '', category: '', rating: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setImageData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpload(imageData);
    setImageData({ src: '', caption: '', category: '', rating: 0 });
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="src"
        placeholder="Image URL"
        value={imageData.src}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="caption"
        placeholder="Caption"
        value={imageData.caption}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={imageData.category}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="rating"
        placeholder="Rating"
        value={imageData.rating}
        onChange={handleChange}
        required
        min="0"
        max="5"
      />
      <button type="submit">
        <FontAwesomeIcon icon={faUpload} /> Upload
      </button>
    </form>
  );
};

export default UploadImage;
