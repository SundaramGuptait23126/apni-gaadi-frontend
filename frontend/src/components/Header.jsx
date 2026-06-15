"use client";
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { FiSearch, FiHeart, FiUser, FiMapPin, FiShoppingBag, FiActivity, FiTruck, FiHome, FiSettings, FiLogOut, FiMenu, FiX, FiMic } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                CarDekho
              </h1>
            </Link>
          </div>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl border border-gray-300 rounded-lg overflow-hidden bg-gray-50 focus-within:ring-2 focus-within:ring-primary/50 transition-all shadow-sm">
            <select className="bg-white border-r border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 outline-none cursor-pointer">
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
            <button className="bg-primary text-white px-6 font-medium text-sm">
              Search
            </button>
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
                
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4 border-b border-gray-100 bg-gray-50 rounded-t-xl">
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"><FiShoppingBag /> My Orders</div>
                    <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"><FiHeart /> Shortlisted Vehicles</div>
                    <div className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left" onClick={logout}><FiLogOut /> Logout</div>
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
