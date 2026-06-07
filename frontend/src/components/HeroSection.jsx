import React, { useState } from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const [carType, setCarType] = useState('new'); // 'new' or 'used'
  const [searchBy, setSearchBy] = useState('budget'); // 'budget' or 'brand'

  return (
    <section className="hero-section">
      <div className="hero-background">
        <img 
          src="https://images.unsplash.com/photo-1503376713437-0d5b40d6cfa8?auto=format&fit=crop&q=80&w=2000" 
          alt="Premium Car" 
          className="hero-image"
        />
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
          <span className="featured-badge">LAUNCHED</span>
          <h1 className="featured-title">Stunning Dynamics</h1>
          <p className="featured-subtitle">The Brand's First EV For India</p>
          <button className="btn-outline hero-know-more">Know More</button>

          <div className="featured-nav">
            <div className="nav-item active">
              <span className="nav-text">Stunning Dynamics</span>
              <span className="nav-text-sub">Launched</span>
              <div className="nav-line"></div>
            </div>
            <div className="nav-item">
              <span className="nav-text">Aura Facelift</span>
              <span className="nav-text-sub">Launched</span>
              <div className="nav-line"></div>
            </div>
             <div className="nav-item">
              <span className="nav-text">Nexon EV</span>
              <span className="nav-text-sub">Launched</span>
              <div className="nav-line"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
