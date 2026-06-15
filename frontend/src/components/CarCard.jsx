import React from 'react';
import Link from 'next/link';
import { optimizeCloudinaryUrl } from '../utils/imageUtils';

const CarCard = ({ car }) => {
  return (
    <Link href={`/car/${car._id || car.id}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
        
        {/* Image Container */}
        <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
          <img 
            src={optimizeCloudinaryUrl(car.imageUrl || car.image, 400)} 
            alt={car.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            loading="lazy"
          />
          {/* Optional Badge */}
          {car.tagline && (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-bold text-gray-800 rounded shadow-sm">
              {car.tagline}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {car.name}
          </h3>
          <p className="text-xl font-extrabold text-gray-900 mb-4">
            {car.budget || car.price}
          </p>
          
          <div className="mt-auto">
            <button className="w-full py-2.5 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors">
              View Offers
            </button>
          </div>
        </div>
        
      </div>
    </Link>
  );
};

export default CarCard;
