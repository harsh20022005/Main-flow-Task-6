import React, { useState, useEffect } from 'react';
import Image from './Image';
import Modal from './Modal';
import UploadImage from './UploadImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faUpload } from '@fortawesome/free-solid-svg-icons';
import './ImageGallery.css';

const initialImages = [
  { src: 'https://img.freepik.com/free-photo/beautiful-rainbow-nature_23-2151498278.jpg?semt=ais_user', caption: 'Rainbow Nature', category: 'Nature', rating: 4 },
  { src: 'https://img.freepik.com/free-photo/digital-art-isolated-house_23-2151041305.jpg?semt=ais_user', caption: 'Isolated House', category: 'Nature', rating: 4 },
  { src: 'https://img.freepik.com/free-photo/aerial-view-glen-etive-winter-near-glencoe-argyll-region-highlands-scotland-s_1258-165479.jpg?semt=ais_user', caption: 'Snow Mountains', category: 'Nature', rating: 4 },
  { src: 'https://img.freepik.com/free-photo/san-francisco-city-skyline-with-urban-architectures-night_649448-2675.jpg?semt=ais_user', caption: 'SanFransico night', category: 'City', rating: 5 },
  { src: 'https://img.freepik.com/free-photo/urban-traffic-with-cityscape_1359-366.jpg?semt=ais_user', caption: 'Morning At city', category: 'City', rating: 5 },
  { src: 'https://media.istockphoto.com/id/860528756/photo/the-bandraworli-sea-link-mumbai-india.jpg?s=612x612&w=0&k=20&c=xT9TK7oYkP6TP62lHqP0H-9mfz9cWva4OcYEnt06cjc=', caption: 'Mumbai City', category: 'City', rating: 5 },
  { src: 'https://www.thoughtco.com/thmb/rip9NU8E4ERKbO7hBjwPc98UtfM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/lion-805084_1920-c62a5582169c4bae82553d9a21c1a0bb.jpg', caption: 'Lion', category: 'Animals', rating: 3 },
  { src: 'https://www.noupe.com/wp-content/uploads/2022/02/keith-markilie-jBjQA3LU9Dc-unsplash.jpg', caption: 'Rhino', category: 'Animals', rating: 3 },
  { src: 'https://hips.hearstapps.com/hmg-prod/images/baby-animal-photos-65f9bc47971de.jpg?crop=0.668xw:1.00xh;0.167xw,0&resize=640:*', caption: 'dog', category: 'Animals', rating: 3 },
  // Add more image objects here
];

const ImageGallery = () => {
  const [images, setImages] = useState(initialImages);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const openModal = (index) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleImageUpload = (newImage) => {
    setImages([...images, newImage]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex !== null) {
        if (e.key === 'ArrowRight') {
          nextImage();
        } else if (e.key === 'ArrowLeft') {
          prevImage();
        } else if (e.key === 'Escape') {
          closeModal();
        } else if (e.key === 'f') {
          document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImageIndex]);

  const filteredImages = images.filter((image) => {
    return (
      image.caption.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterCategory === '' || image.category === filterCategory)
    );
  });

  return (
    <div className="image-gallery">
      <div className="controls">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <select value={filterCategory} onChange={handleFilter}>
          <option value="">All Categories</option>
          <option value="Nature">Nature</option>
          <option value="City">City</option>
          <option value="Animals">Animals</option>
          {/* Add more categories here */}
        </select>
        <UploadImage onUpload={handleImageUpload} />
      </div>
      <div className="image-grid">
        {filteredImages.map((image, index) => (
          <Image key={index} src={image.src} caption={image.caption} onClick={() => openModal(index)} />
        ))}
      </div>
      {selectedImageIndex !== null && (
        <Modal
          image={filteredImages[selectedImageIndex]}
          onClose={closeModal}
          onNext={nextImage}
          onPrev={prevImage}
          images={filteredImages}
          selectedImageIndex={selectedImageIndex}
          setSelectedImageIndex={setSelectedImageIndex}
        />
      )}
    </div>
  );
};

export default ImageGallery;
