"use client";
import React, { useState, useEffect } from 'react';
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
    <>
      {/* =======================
          DESKTOP HERO LAYOUT 
          ======================= */}
      <section className="hidden md:flex relative w-full min-h-[500px] h-[600px] lg:h-[70vh] items-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 w-full h-full z-0 bg-gray-900">
          {activeCar ? (
            <img 
              src={optimizeCloudinaryUrl(activeCar.imageUrl, 1200)} 
              alt={activeCar.name} 
              className="w-full h-full object-cover opacity-80 transition-opacity duration-1000 ease-in-out"
              fetchPriority="high"
              loading="eager"
            />
          ) : (
            <div className="w-full h-full bg-gray-800"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>

        <div className="container-custom relative z-10 w-full flex justify-between items-start gap-8 pt-16 pb-12">
          
          {/* Search Widget */}
          <div className="w-[400px] bg-white rounded-xl shadow-2xl overflow-hidden flex-shrink-0 animate-fade-in-up">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Find your right car</h2>
              
              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button 
                  className={`flex-1 pb-3 text-center font-medium transition-colors border-b-2 ${carType === 'new' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setCarType('new')}
                >
                  New Car
                </button>
                <button 
                  className={`flex-1 pb-3 text-center font-medium transition-colors border-b-2 ${carType === 'used' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setCarType('used')}
                >
                  Used Car
                </button>
              </div>

              {/* Radio Group */}
              <div className="flex gap-6 mb-6">
                <label className="flex items-center gap-2 cursor-pointer text-gray-700 font-medium">
                  <div className="relative flex items-center">
                    <input 
                      type="radio" 
                      name="searchBy" 
                      className="peer sr-only"
                      checked={searchBy === 'budget'}
                      onChange={() => setSearchBy('budget')}
                    />
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-primary peer-checked:bg-primary transition-all"></div>
                    <div className="absolute w-2 h-2 rounded-full bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  By Budget
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-gray-700 font-medium">
                  <div className="relative flex items-center">
                    <input 
                      type="radio" 
                      name="searchBy" 
                      className="peer sr-only"
                      checked={searchBy === 'brand'}
                      onChange={() => setSearchBy('brand')}
                    />
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-primary peer-checked:bg-primary transition-all"></div>
                    <div className="absolute w-2 h-2 rounded-full bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  By Brand
                </label>
              </div>

              {/* Selects */}
              <div className="space-y-4 mb-6">
                <select className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer">
                  <option>Select Budget</option>
                  <option>Under 5 Lakh</option>
                  <option>5 - 10 Lakh</option>
                  <option>10 - 20 Lakh</option>
                  <option>Over 20 Lakh</option>
                </select>
                <select className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer">
                  <option>All Vehicle Types</option>
                  <option>SUV</option>
                  <option>Hatchback</option>
                  <option>Sedan</option>
                </select>
              </div>

              <button className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-primary-hover transform hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg">
                Search
              </button>
              
              <div className="mt-4 text-center">
                <a href="#" className="text-primary hover:text-primary-hover font-medium text-sm transition-colors">Advanced Search →</a>
              </div>
            </div>
          </div>

          {/* Featured Content */}
          <div className="flex-1 text-white pl-12 flex flex-col justify-center animate-fade-in mt-0">
            {activeCar ? (
              <div className="mb-16 text-left">
                <span className="inline-block px-3 py-1 bg-primary/90 text-white text-xs font-bold rounded-full mb-4 tracking-wider">FEATURED</span>
                <h1 className="text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-md">{activeCar.name}</h1>
                <p className="text-xl text-gray-200 mb-8 drop-shadow max-w-2xl">{activeCar.tagline || activeCar.brand}</p>
                <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-gray-900 transition-colors shadow-lg">Know More</button>
              </div>
            ) : (
              <>
                {(!initialFeaturedCars || initialFeaturedCars.length === 0) ? <p className="text-white text-xl">No cars available.</p> : null}
              </>
            )}

            {/* Featured Carousel Nav */}
            {featuredCars.length > 0 && (
              <div className="flex gap-8 overflow-x-auto pb-4 hide-scrollbar justify-start">
                {featuredCars.map((car, index) => (
                  <div 
                    key={car._id} 
                    className="flex flex-col gap-2 cursor-pointer group min-w-[80px]"
                    onClick={() => setActiveIndex(index)}
                  >
                    <span className={`text-sm font-bold whitespace-nowrap transition-colors ${index === activeIndex ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{car.name}</span>
                    <span className={`text-xs whitespace-nowrap transition-colors ${index === activeIndex ? 'text-gray-300' : 'text-gray-500 group-hover:text-gray-400'}`}>{car.budget ? `₹ ${car.budget}` : car.brand}</span>
                    <div className={`h-1 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-primary w-full' : 'bg-gray-600 w-1/2 group-hover:w-3/4'}`}></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =======================
          MOBILE HERO LAYOUT 
          ======================= */}
      <section className="md:hidden w-full bg-white pb-8">
        {/* Mobile Hero Carousel */}
        <div className="w-full px-4 pt-4 pb-2">
          <div className="w-full aspect-[2/1] bg-gray-900 rounded-xl overflow-hidden relative shadow-sm">
            {activeCar ? (
              <>
                <img 
                  src={optimizeCloudinaryUrl(activeCar.imageUrl, 800)} 
                  alt={activeCar.name} 
                  className="w-full h-full object-cover opacity-90 transition-opacity duration-1000 ease-in-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-5 left-3 right-3 text-white">
                  <h3 className="font-bold text-lg leading-tight truncate drop-shadow-md">{activeCar.name}</h3>
                  <p className="text-[10px] text-gray-200 truncate drop-shadow">{activeCar.tagline || activeCar.brand}</p>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-gray-800"></div>
            )}
            
            {/* Carousel Dots */}
            {featuredCars.length > 0 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                {featuredCars.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-primary w-4' : 'bg-white/50 w-1.5'}`}
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Find your right car */}
        <div className="px-4 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Find your right car</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {/* New Car Card */}
            <div className="bg-[#fff1e0] rounded-[20px] p-4 flex flex-col h-40 relative overflow-hidden shadow-sm">
              <h3 className="font-bold text-gray-900 z-10 text-center text-[15px]">New Car</h3>
              <p className="text-[11px] text-gray-600 z-10 text-center mt-0.5">With exciting offers</p>
              <div className="absolute bottom-1 right-1 left-1 flex justify-center">
                {/* Visual Representation */}
                <div className="text-[55px] leading-none mb-1">🚗</div>
              </div>
            </div>
            
            {/* Finance */}
            <div className="bg-[#ffe8d6] rounded-[20px] p-4 flex flex-col h-40 relative overflow-hidden shadow-sm">
              <h3 className="font-bold text-gray-900 z-10 text-center text-[15px]">Finance</h3>
              <p className="text-[11px] text-gray-600 z-10 text-center mt-0.5">With best offers</p>
              <div className="absolute bottom-2 right-1 left-1 flex justify-center">
                <div className="text-[50px] leading-none mb-2">👛</div>
              </div>
            </div>
            
            {/* Sell Car */}
            <div className="bg-[#e0f0ff] rounded-[20px] p-4 flex flex-col h-40 relative overflow-hidden shadow-sm">
              <h3 className="font-bold text-gray-900 z-10 text-center text-[15px]">Sell Car</h3>
              <p className="text-[11px] text-gray-600 z-10 text-center mt-0.5">From your home</p>
              <div className="absolute bottom-2 right-1 left-1 flex justify-center">
                <div className="text-[50px] leading-none mb-2">🤝</div>
              </div>
            </div>
            
            {/* Compare */}
            <div className="bg-[#fff3cc] rounded-[20px] p-4 flex flex-col h-40 relative overflow-hidden shadow-sm">
              <h3 className="font-bold text-gray-900 z-10 text-center text-[15px]">Compare</h3>
              <p className="text-[11px] text-gray-600 z-10 text-center mt-0.5">With best offers</p>
              <div className="absolute bottom-2 right-1 left-1 flex justify-center gap-1">
                <div className="text-[35px] leading-none mt-2">🚘</div>
                <div className="text-[35px] leading-none">🚗</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in forwards;
        }
      `}} />
    </>
  );
};

export default HeroSection;
