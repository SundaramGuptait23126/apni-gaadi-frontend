"use client";
import React, { useState, useEffect } from 'react';
import './HeroSection.css';
import { optimizeCloudinaryUrl } from '../utils/imageUtils';

const HeroSection = ({ initialFeaturedCars }) => {
  const [carType, setCarType] = useState('new');
  const [searchBy, setSearchBy] = useState('budget');
  
  const [featuredCars, setFeaturedCars] = useState(initialFeaturedCars || []);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play logic
  useEffect(() => {
    if (featuredCars.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % featuredCars.length);
    }, 4000); // Change car every 4 seconds
    return () => clearInterval(interval);
  }, [featuredCars]);

  const activeCar = featuredCars[activeIndex] || null;

  return (
    <section className="hero-section">
      <div className="hero-background">
        {activeCar ? (
          <img 
            src={optimizeCloudinaryUrl(activeCar.imageUrl, 1200)} 
            alt={activeCar.name} 
            className="hero-image fade-in"
            fetchPriority="high"
            loading="eager"
          />
        ) : (
          <div className="hero-image-placeholder"></div>
        )}
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-container">
        <div className="search-widget">
          <h2 className="widget-title">Find your right car</h2>
          
          <div className="widget-tabs">
            <button 
              className={`tab-btn ${carType === 'new' ? 'active' : ''}`}
              onClick={() => setCarType('new')}
            >
              New Car
            </button>
            <button 
              className={`tab-btn ${carType === 'used' ? 'active' : ''}`}
              onClick={() => setCarType('used')}
            >
              Used Car
            </button>
          </div>

          <div className="widget-radio-group">
            <label className="radio-label">
              <input 
                type="radio" 
                name="searchBy" 
                checked={searchBy === 'budget'}
                onChange={() => setSearchBy('budget')}
              />
              <span className="radio-custom"></span>
              By Budget
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="searchBy" 
                checked={searchBy === 'brand'}
                onChange={() => setSearchBy('brand')}
              />
              <span className="radio-custom"></span>
              By Brand
            </label>
          </div>

          <div className="widget-selects">
            <select className="widget-select">
              <option>Select Budget</option>
              <option>Under 5 Lakh</option>
              <option>5 - 10 Lakh</option>
              <option>10 - 20 Lakh</option>
              <option>Over 20 Lakh</option>
            </select>
            <select className="widget-select">
              <option>All Vehicle Types</option>
              <option>SUV</option>
              <option>Hatchback</option>
              <option>Sedan</option>
            </select>
          </div>

          <button className="btn-primary widget-search-btn">Search</button>
          
          <div className="widget-footer">
            <a href="#" className="advanced-search-link">Advanced Search →</a>
          </div>
        </div>

        <div className="hero-featured">
          {activeCar ? (
            <>
              <span className="featured-badge">FEATURED</span>
              <h1 className="featured-title">{activeCar.name}</h1>
              <p className="featured-subtitle">{activeCar.tagline || activeCar.brand}</p>
              <button className="btn-outline hero-know-more">Know More</button>
            </>
          ) : (
            <>
              {(!initialFeaturedCars || initialFeaturedCars.length === 0) ? <p style={{color: 'white'}}>No cars available.</p> : null}
            </>
          )}

          {featuredCars.length > 0 && (
            <div className="featured-nav">
              {featuredCars.map((car, index) => (
                <div 
                  key={car._id} 
                  className={`nav-item ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="nav-text">{car.name}</span>
                  <span className="nav-text-sub">{car.budget ? `₹ ${car.budget}` : car.brand}</span>
                  <div className="nav-line"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
