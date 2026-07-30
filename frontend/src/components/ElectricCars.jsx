"use client";
import React, { useState, useEffect } from 'react';
import CarCard from './CarCard';

const ElectricCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from backend
    const fetchCars = async () => {
      setLoading(true);
      try {
        const carApiUrl = process.env.NEXT_PUBLIC_CAR_API_URL || 'http://3.25.228.91/api/cars';
        const res = await fetch(`${carApiUrl}/category/Electric%20Cars`);
        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching electric cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 tracking-tight relative inline-block">
          Electric Cars
          <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-green-500 rounded-full"></div>
        </h2>
        
        {/* Carousel / Grid Wrapper */}
        <div className="relative group mt-4">
          {loading ? (
            <div className="flex justify-center items-center h-64 text-gray-400 font-medium animate-pulse">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin mr-3"></div>
              Loading cars...
            </div>
          ) : (
            <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 md:gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 pb-4 md:pb-0">
              {cars.length > 0 ? (
                cars.map(car => (
                  <div key={car._id || car.id} className="animate-fade-in-up snap-center shrink-0 w-[75vw] sm:w-[45vw] md:w-auto">
                    <CarCard car={car} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <p className="text-lg">No cars found in this category.</p>
                </div>
              )}
            </div>
          )}
          
          {cars.length > 0 && (
            <button className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-green-500 border border-gray-100 hover:bg-green-500 hover:text-white transition-all z-10 opacity-0 group-hover:opacity-100 focus:opacity-100">
              <span className="text-xl font-bold">→</span>
            </button>
          )}
        </div>

        <div className="mt-10 text-center">
          <a href="#" className="inline-flex items-center text-green-600 font-bold hover:text-green-700 transition-colors text-[15px]">
            View All Electric Cars 
            <span className="ml-2 bg-green-100 w-8 h-8 rounded-full flex items-center justify-center text-green-600">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ElectricCars;
