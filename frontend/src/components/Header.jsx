import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiHeart, FiUser, FiMapPin, FiShoppingBag, FiActivity, FiTruck, FiHome, FiSettings, FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-top">
        <div className="container header-top-container">
          <Link to="/" className="logo-container" style={{ textDecoration: 'none' }}>
            <div className="logo-icon"></div>
            <h1 className="logo-text">ApniGaadiDekho<span>.com</span></h1>
          </Link>
          
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
            {user ? (
              <div className="action-item login-register user-menu-container">
                <FiUser size={20} />
                <span>Hello {user.name}</span>
                <span className="dropdown-arrow">▾</span>
                
                <div className="user-dropdown">
                  <div className="dropdown-item"><FiShoppingBag /> My Orders</div>
                  <div className="dropdown-item"><FiHeart /> Shortlisted Vehicles</div>
                  <div className="dropdown-item"><FiActivity /> My Activity</div>
                  <div className="dropdown-item"><FiTruck /> My Vehicles</div>
                  <div className="dropdown-item"><FiHome /> My Garage</div>
                  <div className="dropdown-item"><FiSettings /> Manage Consents</div>
                  <div className="dropdown-item"><FiUser /> Profile Settings</div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item" onClick={logout}><FiLogOut /> Logout</div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="action-item login-register" style={{ textDecoration: 'none', color: 'inherit' }}>
                <FiUser size={20} />
                <span>Login / Register</span>
              </Link>
            )}
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
