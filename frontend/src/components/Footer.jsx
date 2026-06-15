import React from 'react';
import { FiFacebook, FiTwitter, FiYoutube, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-[#2a2a2a] text-white pt-12 pb-6 mt-16 border-t-[6px] border-primary">
      <div className="container-custom">
        {/* Highlights Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10 border-b border-[#444] mb-10">
          <div className="flex items-center gap-4">
            <div className="text-3xl">🏅</div>
            <div>
              <h4 className="text-[15px] font-bold m-0 text-[#f0f0f0]">India's #1</h4>
              <p className="text-xs text-[#aaa] m-0 mt-1">Largest Auto portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-3xl">✨</div>
            <div>
              <h4 className="text-[15px] font-bold m-0 text-[#f0f0f0]">AI Expert</h4>
              <p className="text-xs text-[#aaa] m-0 mt-1">Simplify your car search</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-3xl">🏷️</div>
            <div>
              <h4 className="text-[15px] font-bold m-0 text-[#f0f0f0]">Offers</h4>
              <p className="text-xs text-[#aaa] m-0 mt-1">Stay updated pay less</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-3xl">🚗</div>
            <div>
              <h4 className="text-[15px] font-bold m-0 text-[#f0f0f0]">Compare</h4>
              <p className="text-xs text-[#aaa] m-0 mt-1">Decode the right car</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="text-[13px] text-[#ccc] font-bold mb-5 tracking-wider">ABOUT CARDEKHO</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#aaa] text-[13px] hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-[#aaa] text-[13px] hover:text-white transition-colors">Careers With Us</a></li>
              <li><a href="#" className="text-[#aaa] text-[13px] hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-[#aaa] text-[13px] hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-[#aaa] text-[13px] hover:text-white transition-colors">Corporate Policies</a></li>
              <li><a href="#" className="text-[#aaa] text-[13px] hover:text-white transition-colors">Investors</a></li>
              <li><a href="#" className="text-[#aaa] text-[13px] hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[13px] text-[#ccc] font-bold mb-5 tracking-wider">CONNECT WITH US</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#aaa] text-[13px] hover:text-white transition-colors">Feedback</a></li>
              <li><a href="#" className="text-[#aaa] text-[13px] hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-[#aaa] text-[13px] hover:text-white transition-colors">Advertise with Us</a></li>
              <li><a href="#" className="text-[#aaa] text-[13px] hover:text-white transition-colors">Become Partner Dealer</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] text-[#ccc] font-bold mb-5 tracking-wider">OTHERS</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#aaa] text-[13px] hover:text-white transition-colors">TrucksDekho</a></li>
              <li><a href="#" className="text-[#aaa] text-[13px] hover:text-white transition-colors">TyreDekho</a></li>
              <li><a href="#" className="text-[#aaa] text-[13px] hover:text-white transition-colors">TractorsDekho</a></li>
              <li><a href="#" className="text-[#aaa] text-[13px] hover:text-white transition-colors">Girnar Vision Fund</a></li>
              <li><a href="#" className="text-[#aaa] text-[13px] hover:text-white transition-colors">Emergency Response</a></li>
              <li><a href="#" className="text-[#aaa] text-[13px] hover:text-white transition-colors">Car Sales Trends</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] text-[#ccc] font-bold mb-5 tracking-wider">EXPERIENCE CARDEKHO APP</h4>
            <div className="flex flex-col gap-3 mb-8">
              <button className="flex items-center justify-center gap-3 bg-[#444] border-none text-white p-2.5 rounded hover:bg-[#555] transition-colors w-40">
                <span className="text-2xl leading-none">🍎</span>
                <div className="flex flex-col items-start leading-tight">
                  <small className="text-[10px] text-[#bbb]">Download on the</small>
                  <strong className="text-[13px]">App Store</strong>
                </div>
              </button>
              <button className="flex items-center justify-center gap-3 bg-[#444] border-none text-white p-2.5 rounded hover:bg-[#555] transition-colors w-40">
                <span className="text-2xl leading-none">▶️</span>
                <div className="flex flex-col items-start leading-tight">
                  <small className="text-[10px] text-[#bbb]">GET IT ON</small>
                  <strong className="text-[13px]">Google Play</strong>
                </div>
              </button>
            </div>

            <h4 className="text-[13px] text-[#ccc] font-bold mb-4 tracking-wider mt-4">CARDEKHO GROUP VENTURES</h4>
            <div className="flex flex-wrap gap-3">
              <div className="bg-[#444] px-2.5 py-1 rounded text-xs font-bold text-[#ddd]">BikeDekho</div>
              <div className="bg-[#444] px-2.5 py-1 rounded text-xs font-bold text-[#ddd]">rupyy</div>
              <div className="bg-[#444] px-2.5 py-1 rounded text-xs font-bold text-[#ddd]">ZIGWHEELS</div>
              <div className="bg-[#444] px-2.5 py-1 rounded text-xs font-bold text-[#ddd]">InsuranceDekho</div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-[#444] text-[#aaa] text-xs gap-4">
          <p className="m-0">© 2026 Girnar Software Pvt. Ltd.</p>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-sm mr-1">Connect:</span>
            <a href="#" className="text-white bg-[#444] w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary hover:-translate-y-0.5 transition-all shadow-md"><FiFacebook /></a>
            <a href="#" className="text-white bg-[#444] w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary hover:-translate-y-0.5 transition-all shadow-md"><FiTwitter /></a>
            <a href="#" className="text-white bg-[#444] w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary hover:-translate-y-0.5 transition-all shadow-md"><FiYoutube /></a>
            <a href="#" className="text-white bg-[#444] w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary hover:-translate-y-0.5 transition-all shadow-md"><FiInstagram /></a>
            <a href="#" className="text-white bg-[#444] w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary hover:-translate-y-0.5 transition-all shadow-md"><FiLinkedin /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
