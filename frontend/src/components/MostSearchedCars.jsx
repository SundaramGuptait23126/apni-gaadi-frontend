"use client";
import React, { useState, useEffect } from 'react';
import CarCard from './CarCard';

const MostSearchedCars = () => {
  const [activeCategory, setActiveCategory] = useState('SUV');
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['SUV', 'Hatchback', 'Sedan', 'MUV', 'Luxury'];

  useEffect(() => {
    // Fetch from backend
    const fetchCars = async () => {
      setLoading(true);
      try {
        const carApiUrl = process.env.NEXT_PUBLIC_CAR_API_URL || 'http://localhost:5002/api/cars';
        const res = await fetch(`${carApiUrl}/category/Most%20Searched%20Cars?subCategory=${activeCategory}`);
        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [activeCategory]);

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 tracking-tight relative inline-block">
          The most searched cars
          <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full"></div>
        </h2>
        
        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-4 md:gap-8 mb-10 pb-2 border-b border-gray-200 hide-scrollbar scroll-smooth">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`pb-4 px-2 whitespace-nowrap font-semibold text-[15px] transition-all border-b-2 ${activeCategory === cat ? 'text-primary border-primary' : 'text-gray-500 border-transparent hover:text-gray-800'}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel / Grid Wrapper */}
        <div className="relative group">
          {loading ? (
            <div className="flex justify-center items-center h-64 text-gray-400 font-medium animate-pulse">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin mr-3"></div>
              Loading cars...
            </div>
          ) : (
            <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 md:gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 pb-4 md:pb-0">
              {cars.length > 0 ? (
                cars.map(car => (
                  <div key={car.id || car._id} className="animate-fade-in-up snap-center shrink-0 w-[75vw] sm:w-[45vw] md:w-auto">
                    <CarCard car={car} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-lg">No cars found in this category.</p>
                </div>
              )}
            </div>
          )}
          
          {/* We would wire this up properly in a real carousel, for now it's just visual */}
          {cars.length > 0 && (
            <button className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-primary border border-gray-100 hover:bg-primary hover:text-white transition-all z-10 opacity-0 group-hover:opacity-100 focus:opacity-100">
              <span className="text-xl font-bold">→</span>
            </button>
          )}
        </div>

        <div className="mt-10 text-center">
          <a href="#" className="inline-flex items-center text-primary font-bold hover:text-primary-hover transition-colors text-[15px]">
            View All {activeCategory} Cars 
            <span className="ml-2 bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center text-primary">→</span>
          </a>
        </div>
      </div>

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
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}} />
    </section>
  );
};

export default MostSearchedCars;
