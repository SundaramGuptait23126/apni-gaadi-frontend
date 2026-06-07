import React from 'react';
import { FiSearch, FiHeart, FiUser, FiMapPin } from 'react-icons/fi';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="container header-top-container">
          <div className="logo-container">
            {/* Dummy logo resembling Cardekho */}
            <div className="logo-icon"></div>
            <h1 className="logo-text">ApniGaadiDekho<span>.com</span></h1>
          </div>
          
          <div className="search-bar-container">
            <select className="search-category">
              <option>All</option>
              <option>New Cars</option>
              <option>Used Cars</option>
            </select>
            <div className="search-input-wrapper">
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Search or Ask a Question" className="search-input" />
            </div>
          </div>

          <div className="header-actions">
            <div className="action-item language-select">
              <span>English</span>
              <span className="dropdown-arrow">▾</span>
            </div>
            <div className="action-item">
              <FiHeart size={20} />
            </div>
            <div className="action-item login-register">
              <FiUser size={20} />
              <span>Login / Register</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="header-bottom">
        <div className="container header-bottom-container">
          <nav className="main-nav">
            <ul>
              <li>NEW CARS ▾</li>
              <li>USED CARS ▾</li>
              <li>NEWS & REVIEWS ▾</li>
              <li>VIDEOS ▾</li>
            </ul>
          </nav>
          <div className="city-select">
            <FiMapPin />
            <span>Select City</span>
            <span className="dropdown-arrow">▾</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
