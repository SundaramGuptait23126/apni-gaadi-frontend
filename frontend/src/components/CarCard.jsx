import React from 'react';
import Link from 'next/link';
import './CarCard.css';
import { optimizeCloudinaryUrl } from '../utils/imageUtils';

const CarCard = ({ car }) => {
  return (
    <Link href={`/car/${car._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div className="car-card">
        <div className="car-image-container">
          <img 
            src={optimizeCloudinaryUrl(car.imageUrl || car.image, 400)} 
            alt={car.name} 
            className="car-image" 
            loading="lazy"
          />
        </div>
        <div className="car-details">
          <h3 className="car-name">{car.name}</h3>
          <p className="car-price">{car.budget || car.price}</p>
          <button className="view-offers-btn">View June Offers</button>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
