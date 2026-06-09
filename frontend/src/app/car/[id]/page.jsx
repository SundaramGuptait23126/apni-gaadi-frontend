"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FiHeart, FiShare2, FiSettings, FiMaximize, FiShield } from 'react-icons/fi';
import { BsFuelPump, BsLightningCharge, BsGearWide } from 'react-icons/bs';
import { MdOutlineAirlineSeatReclineNormal } from 'react-icons/md';
import './CarDetail.css';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carApiUrl = process.env.NEXT_PUBLIC_CAR_API_URL || 'http://localhost:5002/api/cars';
        const res = await fetch(`${carApiUrl}/${id}`);
        if (!res.ok) {
          throw new Error('Car not found');
        }
        const data = await res.json();
        setCar(data);
      } catch (err) {
        console.error('Error fetching car:', err);
        setError('Unable to load car details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCar();
  }, [id]);

  if (loading) {
    return <div className="car-detail-loading">Loading amazing details...</div>;
  }

  if (error || !car) {
    return <div className="car-detail-error">{error || 'Car not found.'}</div>;
  }

  return (
    <div className="car-detail-container">
      {/* Top Navigation / Breadcrumbs Simulation */}
      <div className="car-detail-navbar">
        <ul>
          <li className="active">OVERVIEW</li>
          <li>PRICE</li>
          <li>IMAGES</li>
          <li>SPECS</li>
          <li>USER REVIEWS</li>
          <li>VARIANTS</li>
        </ul>
      </div>

      <div className="car-detail-hero">
        <div className="car-image-section">
          <img src={car.imageUrl} alt={car.name} className="main-car-image" />
          <div className="image-tags">
            <span className="tag">📷 98 Photos</span>
            <span className="tag">🎥 Shorts</span>
            <span className="tag">🎨 6 Colors</span>
          </div>
        </div>

        <div className="car-info-section">
          <div className="car-title-row">
            <h1>{car.name}</h1>
            <div className="action-icons">
              <FiHeart className="icon" />
              <FiShare2 className="icon" />
            </div>
          </div>
          
          <div className="rating-row">
            <span className="star-rating">4.7 ★</span>
            <span className="review-count">310 Reviews</span>
            <span className="rate-win-btn">Rate & Win ₹1000</span>
          </div>

          <p className="car-description">
            {car.tagline || `${car.name} is one of the most highly anticipated cars on Indian roads. It comes loaded with tech and an amazing design that turns heads everywhere.`}
          </p>

          <div className="car-price">
            <h2>{car.budget || 'Price TBA'}</h2>
            {car.budget && <span className="on-road-price">Get On-Road Price</span>}
          </div>
          {car.budget && <p className="ex-showroom">*Ex-Showroom Price in New Delhi</p>}

          <button className="view-offers-btn">View June Offers</button>
          <p className="hurry-text">🏷️ Hurry up to lock festive offers!</p>
        </div>
      </div>

      <div className="car-specs-emi-section">
        <div className="specs-card">
          <h2>{car.name} specs & features</h2>
          <div className="specs-tabs">
            <span className="tab active">Key Specifications</span>
            <span className="tab">Highlights</span>
          </div>
          
          <div className="specs-grid">
            <div className="spec-item">
              <span className="spec-label"><FiSettings /> Engine</span>
              <span className="spec-value">{car.engine || 'N/A'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label"><FiMaximize /> Ground Clearance</span>
              <span className="spec-value">{car.groundClearance || 'N/A'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label"><BsFuelPump /> Fuel Type</span>
              <span className="spec-value">{car.fuelType || 'Petrol'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label"><BsGearWide /> Transmission</span>
              <span className="spec-value">{car.transmission || 'Manual'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label"><MdOutlineAirlineSeatReclineNormal /> Seating Capacity</span>
              <span className="spec-value">{car.seatingCapacity || '5 Seater'}</span>
            </div>
          </div>
        </div>

        <div className="emi-card">
          <div className="emi-header">
            <h3>Calculate EMI</h3>
            <span className="emi-icon">₹</span>
          </div>
          <p className="emi-subtitle">Your monthly EMI</p>
          <h2>₹30,836 <span className="edit-emi">Edit EMI</span></h2>
          <p className="emi-calc-info">Interest calculated at 9.8% for 48 months</p>
          <button className="view-emi-btn">View EMI Options</button>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
