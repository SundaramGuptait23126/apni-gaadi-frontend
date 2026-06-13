"use client";
import React, { useState } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './CarImageGallery.css';

const CarImageGallery = ({ car }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('exterior');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback to legacy 'images' if exterior/interior are not available
  const exteriorImages = car.exteriorImages && car.exteriorImages.length > 0 ? car.exteriorImages : car.images || [];
  const interiorImages = car.interiorImages && car.interiorImages.length > 0 ? car.interiorImages : [];

  const getActiveImages = () => {
    return activeTab === 'exterior' ? exteriorImages : interiorImages;
  };

  const handleOpenModal = (tab = 'exterior') => {
    setActiveTab(tab);
    setCurrentIndex(0);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleNext = () => {
    const images = getActiveImages();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    const images = getActiveImages();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  const activeImages = getActiveImages();
  const totalPhotos = exteriorImages.length + interiorImages.length;

  return (
    <>
      <div className="car-image-section">
        <img 
          src={car.imageUrl} 
          alt={car.name} 
          className="main-car-image" 
          onClick={() => handleOpenModal('exterior')} 
          style={{ cursor: 'pointer' }}
        />
        
        {car.images && car.images.length > 1 && (
          <div className="thumbnail-gallery">
            {car.images.slice(0, 4).map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${car.name} - ${index + 1}`} 
                className="thumbnail-image" 
                onClick={() => handleOpenModal('exterior')}
              />
            ))}
          </div>
        )}

        <div className="image-tags">
          <span className="tag" onClick={() => handleOpenModal('exterior')} style={{ cursor: 'pointer' }}>
            📷 {totalPhotos || 1} Photos
          </span>
          <span className="tag">🎥 Shorts</span>
          <span className="tag">🎨 6 Colors</span>
        </div>
      </div>

      {isModalOpen && (
        <div className="gallery-modal-overlay">
          <div className="gallery-modal-header">
            <button className="close-modal-btn" onClick={handleCloseModal}>
              <FiX size={24} />
            </button>
            <h2 className="gallery-car-title">{car.name}</h2>
            
            <div className="gallery-tabs">
              <button 
                className={`gallery-tab ${activeTab === 'exterior' ? 'active' : ''}`}
                onClick={() => handleTabChange('exterior')}
              >
                Exterior ({exteriorImages.length})
              </button>
              <button 
                className={`gallery-tab ${activeTab === 'interior' ? 'active' : ''}`}
                onClick={() => handleTabChange('interior')}
              >
                Interior ({interiorImages.length})
              </button>
            </div>
          </div>

          <div className="gallery-modal-content">
            {activeImages.length > 0 ? (
              <div className="gallery-main-view">
                <button className="gallery-nav-btn prev" onClick={handlePrev}><FiChevronLeft size={36} /></button>
                <img src={activeImages[currentIndex]} alt={`${activeTab} view ${currentIndex + 1}`} className="gallery-main-img" />
                <button className="gallery-nav-btn next" onClick={handleNext}><FiChevronRight size={36} /></button>
                <div className="gallery-counter">
                  {currentIndex + 1}/{activeImages.length} {car.name} {activeTab === 'exterior' ? 'Exterior' : 'Interior'} View
                </div>
              </div>
            ) : (
              <div className="gallery-no-images">
                <p>No {activeTab} images available for this car.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CarImageGallery;
