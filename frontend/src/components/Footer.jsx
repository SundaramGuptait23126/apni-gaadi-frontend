import React from 'react';
import { FiFacebook, FiTwitter, FiYoutube, FiInstagram, FiLinkedin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-highlights">
          <div className="highlight-item">
            <div className="highlight-icon">🏅</div>
            <div>
              <h4>India's #1</h4>
              <p>Largest Auto portal</p>
            </div>
          </div>
          <div className="highlight-item">
            <div className="highlight-icon">✨</div>
            <div>
              <h4>AI Expert</h4>
              <p>Simplify your car search</p>
            </div>
          </div>
          <div className="highlight-item">
            <div className="highlight-icon">🏷️</div>
            <div>
              <h4>Offers</h4>
              <p>Stay updated pay less</p>
            </div>
          </div>
          <div className="highlight-item">
            <div className="highlight-icon">🚗</div>
            <div>
              <h4>Compare</h4>
              <p>Decode the right car</p>
            </div>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-column">
            <h4>ABOUT CARDEKHO</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Careers With Us</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Corporate Policies</a></li>
              <li><a href="#">Investors</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>CONNECT WITH US</h4>
            <ul>
              <li><a href="#">Feedback</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Advertise with Us</a></li>
              <li><a href="#">Become Partner Dealer</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>OTHERS</h4>
            <ul>
              <li><a href="#">TrucksDekho</a></li>
              <li><a href="#">TyreDekho</a></li>
              <li><a href="#">TractorsDekho</a></li>
              <li><a href="#">Girnar Vision Fund</a></li>
              <li><a href="#">Emergency Response</a></li>
              <li><a href="#">Car Sales Trends</a></li>
            </ul>
          </div>

          <div className="footer-column app-links">
            <h4>EXPERIENCE CARDEKHO APP</h4>
            <div className="app-buttons">
              <button className="app-btn">
                <span className="icon">🍎</span>
                <div className="text">
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </div>
              </button>
              <button className="app-btn">
                <span className="icon">▶️</span>
                <div className="text">
                  <small>GET IT ON</small>
                  <strong>Google Play</strong>
                </div>
              </button>
            </div>

            <h4 className="mt-4">CARDEKHO GROUP VENTURES</h4>
            <div className="ventures-grid">
              <div className="venture-logo">BikeDekho</div>
              <div className="venture-logo">rupyy</div>
              <div className="venture-logo">ZIGWHEELS</div>
              <div className="venture-logo">InsuranceDekho</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Girnar Software Pvt. Ltd.</p>
          <div className="social-links">
            <span>Connect:</span>
            <a href="#"><FiFacebook /></a>
            <a href="#"><FiTwitter /></a>
            <a href="#"><FiYoutube /></a>
            <a href="#"><FiInstagram /></a>
            <a href="#"><FiLinkedin /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
