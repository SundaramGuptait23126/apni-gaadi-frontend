import React from 'react';
import './CarCard.css';

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <div className="car-image-container">
        <img src={car.image} alt={car.name} className="car-image" />
      </div>
      <div className="car-details">
        <h3 className="car-name">{car.name}</h3>
        <p className="car-price">{car.price}</p>
        <button className="btn-outline view-offers-btn">View June Offers</button>
      </div>
    </div>
  );
};

export default CarCard;
