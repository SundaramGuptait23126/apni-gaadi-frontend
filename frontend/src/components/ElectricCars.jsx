"use client";
import React, { useState, useEffect } from 'react';
import CarCard from './CarCard';
import './MostSearchedCars.css';

const ElectricCars = () => {
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
        const res = await fetch(`${carApiUrl}/category/Electric%20Cars?subCategory=${activeCategory}`);
        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching electric cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [activeCategory]);

  return (
    <section className="most-searched-section">
      <div className="container box-container">
        <h2 className="section-title">Electric Cars</h2>
        
        <div className="category-tabs">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="cars-carousel-wrapper">
          {loading ? (
            <div className="loading-state">Loading cars...</div>
          ) : (
            <div className="cars-grid">
              {cars.length > 0 ? (
                cars.map(car => (
                  <CarCard key={car._id || car.id} car={car} />
                ))
              ) : (
                <p>No cars found in this category.</p>
              )}
            </div>
          )}
          
          <button className="carousel-nav-btn next">→</button>
        </div>

        <div className="view-all-link">
          <a href="#">View All {activeCategory} Electric Cars <span className="arrow">→</span></a>
        </div>
      </div>
    </section>
  );
};

export default ElectricCars;
