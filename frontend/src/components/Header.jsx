"use client";
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { FiSearch, FiHeart, FiUser, FiMapPin, FiShoppingBag, FiActivity, FiTruck, FiHome, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Header */}
      <div className="border-b border-gray-200 py-3">
        <div className="container-custom flex items-center justify-between gap-4">
          
          {/* Mobile Menu Button & Logo */}
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
                A
              </div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 hidden sm:block">
                ApniGaadiDekho<span className="text-primary text-sm font-semibold">.com</span>
              </h1>
            </Link>
          </div>
          
          {/* Search Bar - hidden on very small screens, visible on md */}
          <div className="hidden md:flex flex-1 max-w-2xl border border-gray-300 rounded-lg overflow-hidden bg-gray-50 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all shadow-sm">
            <select className="bg-white border-r border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 outline-none cursor-pointer hover:bg-gray-50">
              <option>All</option>
              <option>New Cars</option>
              <option>Used Cars</option>
            </select>
            <div className="flex-1 flex items-center bg-white px-3">
              <FiSearch className="text-gray-400 mr-2" size={18} />
              <input 
                type="text" 
                placeholder="Search or Ask a Question" 
                className="w-full py-2.5 outline-none text-sm bg-transparent placeholder-gray-400" 
              />
            </div>
            <button className="bg-primary text-white px-6 font-medium hover:bg-primary-hover transition-colors text-sm">
              Search
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-gray-700">
            <div className="hidden lg:flex items-center cursor-pointer hover:text-primary transition-colors gap-1">
              <span>English</span>
              <span className="text-xs text-gray-400">▾</span>
            </div>
            <div className="cursor-pointer hover:text-primary transition-colors text-gray-600">
              <FiHeart size={22} />
            </div>
            {user ? (
              <div className="relative group cursor-pointer flex items-center gap-2 hover:text-primary transition-colors">
                <FiUser size={22} className="text-gray-600 group-hover:text-primary" />
                <span className="hidden sm:inline text-gray-800">Hello {user.name}</span>
                <span className="text-xs text-gray-400 hidden sm:inline">▾</span>
                
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top-right group-hover:translate-y-0 translate-y-2">
                  <div className="p-4 border-b border-gray-100 bg-gray-50 rounded-t-xl">
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"><FiShoppingBag /> My Orders</div>
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"><FiHeart /> Shortlisted Vehicles</div>
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"><FiActivity /> My Activity</div>
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"><FiTruck /> My Vehicles</div>
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"><FiHome /> My Garage</div>
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"><FiSettings /> Manage Consents</div>
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"><FiUser /> Profile Settings</div>
                  </div>
                  <div className="p-2 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left" onClick={logout}><FiLogOut /> Logout</div>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-2 hover:text-primary transition-colors text-gray-800">
                <FiUser size={22} className="text-gray-600" />
                <span className="hidden sm:inline font-semibold">Login / Register</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Search - Visible only on small screens */}
      <div className="md:hidden px-4 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex flex-1 border border-gray-300 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-primary/50 transition-all shadow-sm">
          <div className="flex-1 flex items-center px-3 py-2">
            <FiSearch className="text-gray-400 mr-2" size={18} />
            <input 
              type="text" 
              placeholder="Search Cars..." 
              className="w-full outline-none text-sm bg-transparent" 
            />
          </div>
          <button className="bg-primary text-white px-4 text-sm font-medium">Search</button>
        </div>
      </div>
      
      {/* Bottom Header Navigation */}
      <div className={`md:block border-b border-gray-200 ${mobileMenuOpen ? 'block absolute top-full left-0 right-0 bg-white shadow-lg border-b-0' : 'hidden'} md:static md:bg-transparent md:shadow-none`}>
        <div className="container-custom flex flex-col md:flex-row md:items-center justify-between py-3 md:py-0">
          <nav className="w-full md:w-auto">
            <ul className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 font-semibold text-[13px] tracking-wide text-gray-700">
              <li className="py-2 md:py-4 px-4 md:px-0 hover:text-primary hover:bg-gray-50 md:hover:bg-transparent rounded-lg cursor-pointer transition-colors border-b-2 border-transparent hover:border-primary flex items-center justify-between">
                <Link href="/" className="flex-1">NEW CARS</Link>
                <span className="text-xs text-gray-400 md:hidden">▾</span>
              </li>
              <li className="py-2 md:py-4 px-4 md:px-0 hover:text-primary hover:bg-gray-50 md:hover:bg-transparent rounded-lg cursor-pointer transition-colors border-b-2 border-transparent hover:border-primary flex items-center justify-between">
                USED CARS <span className="text-xs text-gray-400 ml-1">▾</span>
              </li>
              <li className="py-2 md:py-4 px-4 md:px-0 hover:text-primary hover:bg-gray-50 md:hover:bg-transparent rounded-lg cursor-pointer transition-colors border-b-2 border-transparent hover:border-primary flex items-center justify-between">
                <Link href="/compare" className="flex-1">COMPARE CARS</Link>
              </li>
              <li className="py-2 md:py-4 px-4 md:px-0 hover:text-primary hover:bg-gray-50 md:hover:bg-transparent rounded-lg cursor-pointer transition-colors border-b-2 border-transparent hover:border-primary flex items-center justify-between">
                NEWS & REVIEWS <span className="text-xs text-gray-400 ml-1">▾</span>
              </li>
              <li className="py-2 md:py-4 px-4 md:px-0 hover:text-primary hover:bg-gray-50 md:hover:bg-transparent rounded-lg cursor-pointer transition-colors border-b-2 border-transparent hover:border-primary flex items-center justify-between">
                VIDEOS <span className="text-xs text-gray-400 ml-1">▾</span>
              </li>
            </ul>
          </nav>
          
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 px-4 md:px-0 py-3 md:py-0 mt-2 md:mt-0 border-t md:border-t-0 border-gray-100 hover:text-primary cursor-pointer transition-colors">
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
