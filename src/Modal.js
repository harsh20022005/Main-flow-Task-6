import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowLeft, faArrowRight, faExpand } from '@fortawesome/free-solid-svg-icons';
import './Modal.css';

const Modal = ({ image, onClose, onNext, onPrev, images, selectedImageIndex, setSelectedImageIndex }) => {
  const [zoom, setZoom] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [flip, setFlip] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const toggleZoom = () => setZoom(!zoom);
  const rotateImage = () => setRotate((prevRotate) => prevRotate + 90);
  const flipImage = () => setFlip(!flip);
  const openFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  const handleCommentChange = (e) => setNewComment(e.target.value);
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, newComment]);
    setNewComment('');
  };

  return (
    <div className="modal" onClick={onClose}>
      <span className="close" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </span>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="prev" onClick={onPrev}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
        <img
          src={image.src}
          alt={image.caption}
          className={`modal-image ${zoom ? 'zoom' : ''} ${flip ? 'flip' : ''}`}
          style={{ transform: `rotate(${rotate}deg)` }}
          onClick={toggleZoom}
        />
        <span className="next" onClick={onNext}>
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </div>
      <div className="modal-caption">{image.caption}</div>
      <div className="modal-controls">
        <button onClick={rotateImage}>Rotate</button>
        <button onClick={flipImage}>Flip</button>
        <button onClick={openFullscreen}>
          <FontAwesomeIcon icon={faExpand} />
        </button>
      </div>
      <div className="thumbnail-container">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={img.caption}
            className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
            onClick={() => setSelectedImageIndex(index)}
          />
        ))}
      </div>
      <div className="comments-section">
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Add a comment"
            value={newComment}
            onChange={handleCommentChange}
            required
          />
          <button type="submit">Comment</button>
        </form>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
