"use client";
import React, { useContext, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiSearch, FiHeart, FiUser, FiMapPin, FiShoppingBag, FiActivity, FiTruck, FiHome, FiSettings, FiLogOut, FiMenu, FiX, FiMic, FiBox, FiClock, FiFileText } from 'react-icons/fi';
import { IoCarOutline } from 'react-icons/io5';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);

  // Debounced Search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        setShowSearchDropdown(true);
        try {
          // Point to relative API route which gets proxied by next.config.mjs
          const res = await fetch(`/api/search?q=${searchQuery}`);
          if (res.ok) {
            const data = await res.json();
            setSearchResults(data.results || []);
          }
        } catch (error) {
          console.error("Search error", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowSearchDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white sticky top-0 z-50">
      {/* Top Header */}
      <div className="border-b border-gray-100 py-3 md:py-4">
        <div className="container-custom flex items-center justify-between gap-4">
          
          {/* Mobile Menu Button & Logo */}
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden text-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-[#eb512c] flex items-center justify-center text-white font-bold shadow-sm">
                A
              </div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 hidden sm:block">
                ApniGaadiDekho<span className="text-primary text-sm font-semibold">.com</span>
              </h1>
              {/* Mobile-only logo text */}
              <h1 className="text-lg font-bold tracking-tight text-gray-900 sm:hidden">
                ApniGaadiDekho<span className="text-primary text-xs font-semibold">.com</span>
              </h1>
            </Link>
          </div>
          
          {/* Search Bar - Desktop */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-2xl relative">
            <div className="flex w-full border border-gray-300 rounded-lg overflow-hidden bg-gray-50 focus-within:ring-2 focus-within:ring-primary/50 transition-all shadow-sm relative z-20">
              <select className="bg-white border-r border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 outline-none cursor-pointer">
                <option>All</option>
                <option>New Cars</option>
                <option>Used Cars</option>
              </select>
              <div className="flex-1 flex items-center bg-white px-3 relative">
                <FiSearch className="text-gray-400 mr-2" size={18} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => { if(searchQuery.length >= 2) setShowSearchDropdown(true); }}
                  placeholder="Search or Ask a Question" 
                  className="w-full py-2.5 outline-none text-sm bg-transparent placeholder-gray-400" 
                />
                {isSearching && <div className="absolute right-3 w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>}
              </div>
              <button className="bg-primary text-white px-6 font-medium text-sm">
                Search
              </button>
            </div>
            
            {/* Desktop Search Dropdown */}
            {showSearchDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((car) => (
                      <li key={car._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer">
                        <Link href={`/cars/${car._id}`} className="flex items-center px-4 py-3 gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0 overflow-hidden relative">
                            {/* Dummy Image for now, replace with car.image if available */}
                            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-xs text-gray-500">{car.brand?.[0]}</div>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800 text-sm">{car.brand} {car.model}</div>
                            <div className="text-xs text-gray-500">{car.variant} • ₹{car.price?.toLocaleString()}</div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-sm text-gray-500">
                    {!isSearching ? "No cars found for this query." : "Searching..."}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-gray-700">
            <div className="hidden lg:flex items-center cursor-pointer hover:text-primary transition-colors gap-1">
              <span>English</span>
              <span className="text-xs text-gray-400">▾</span>
            </div>
            <div className="hidden md:block cursor-pointer hover:text-primary transition-colors text-gray-600">
              <FiHeart size={22} />
            </div>
            
            {/* Mobile-only Location Icon */}
            <div className="md:hidden cursor-pointer text-gray-800">
              <FiMapPin size={22} />
            </div>

            {user ? (
              <div className="relative group cursor-pointer flex items-center gap-2 hover:text-primary transition-colors">
                <FiUser size={22} className="text-gray-800 group-hover:text-primary" />
                <span className="hidden sm:inline text-gray-800">Hello {user.name}</span>
                <span className="text-xs text-gray-400 hidden sm:inline">▾</span>
                
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                  <div className="bg-[#f4f6f9] p-5 flex flex-col items-center border-b border-gray-100">
                    <div className="w-14 h-14 bg-[#8ba4be] text-white rounded-full flex items-center justify-center text-xl mb-3 font-semibold uppercase">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{user.email || '9453028301'}</p>
                    <Link href="/profile" className="text-[#3a82f6] text-xs mt-2 hover:underline">
                      Link your e-mail or social account
                    </Link>
                  </div>
                  <div className="p-2 space-y-0.5">
                    <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"><FiBox className="text-lg" /> My Orders</Link>
                    <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"><FiHeart className="text-lg" /> Shortlisted Vehicles</Link>
                    <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"><FiClock className="text-lg" /> My Activity</Link>
                    <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"><FiFileText className="text-lg" /> My Vehicles</Link>
                    <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"><IoCarOutline className="text-lg" /> My Garage</Link>
                    <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"><FiSettings className="text-lg" /> Manage Consents</Link>
                    <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"><FiSettings className="text-lg" /> Profile Settings</Link>
                    <div className="border-t border-gray-100 my-1 pt-1">
                      <div className="flex items-center gap-3 px-3 py-2.5 text-gray-800 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium cursor-pointer w-full text-left" onClick={logout}><FiLogOut className="text-lg" /> Logout</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-2 text-gray-800">
                <FiUser size={22} />
                <span className="hidden sm:inline font-semibold">Login / Register</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Search - Exact Match */}
      <div className="md:hidden px-4 py-3 bg-white">
        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-primary/50 transition-all h-12">
          <select className="bg-transparent pl-4 pr-2 text-sm font-medium text-gray-700 outline-none h-full border-r border-gray-200 cursor-pointer">
            <option>All</option>
            <option>New</option>
            <option>Used</option>
          </select>
          <div className="flex-1 flex items-center px-3 h-full">
            <FiSearch className="text-gray-400 mr-2" size={18} />
            <input 
              type="text" 
              placeholder="Search or Ask a Question" 
              className="w-full h-full outline-none text-[15px] bg-transparent text-gray-700 placeholder-gray-400" 
            />
          </div>
          <div className="pr-4 pl-2 h-full flex items-center border-l border-gray-100">
             <FiMic className="text-gray-400" size={20} />
          </div>
        </div>
      </div>
      
      {/* Bottom Header Navigation */}
      <div className={`md:block border-b border-gray-200 ${mobileMenuOpen ? 'block absolute top-full left-0 right-0 bg-white shadow-lg border-b-0' : 'hidden'} md:static md:bg-transparent md:shadow-none`}>
        <div className="container-custom flex flex-col md:flex-row md:items-center justify-between py-3 md:py-0">
          <nav className="w-full md:w-auto">
            <ul className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 font-semibold text-[13px] tracking-wide text-gray-700">
              <li className="py-2 md:py-4 px-4 md:px-0 hover:text-primary transition-colors cursor-pointer border-b-2 border-transparent hover:border-primary flex items-center justify-between">
                <Link href="/" className="flex-1">NEW CARS</Link>
              </li>
              <li className="py-2 md:py-4 px-4 md:px-0 hover:text-primary transition-colors cursor-pointer border-b-2 border-transparent hover:border-primary flex items-center justify-between">
                USED CARS <span className="text-xs text-gray-400 ml-1">▾</span>
              </li>
              <li className="py-2 md:py-4 px-4 md:px-0 hover:text-primary transition-colors cursor-pointer border-b-2 border-transparent hover:border-primary flex items-center justify-between">
                <Link href="/compare" className="flex-1">COMPARE CARS</Link>
              </li>
              <li className="py-2 md:py-4 px-4 md:px-0 hover:text-primary transition-colors cursor-pointer border-b-2 border-transparent hover:border-primary flex items-center justify-between">
                NEWS & REVIEWS <span className="text-xs text-gray-400 ml-1">▾</span>
              </li>
            </ul>
          </nav>
          
          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary cursor-pointer transition-colors">
            <FiMapPin className="text-primary" />
            <span>Select City</span>
            <span className="text-xs text-gray-400 ml-1">▾</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
