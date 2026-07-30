"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiStar, FiFilter, FiChevronRight, FiCheck } from 'react-icons/fi';

const accessoriesData = [
  { id: 1, name: "Premium 7D Floor Mats", category: "Interior", price: "₹2,499", rating: 4.8, image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "HD Dash Cam Dual Lens", category: "Electronics", price: "₹4,999", rating: 4.9, image: "https://images.unsplash.com/photo-1511473775474-06cce7c56950?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Luxury Leather Seat Covers", category: "Interior", price: "₹6,500", rating: 4.7, image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "LED Headlight Bulbs (Pair)", category: "Exterior", price: "₹1,850", rating: 4.5, image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 5, name: "Premium Car Perfume", category: "Car Care", price: "₹499", rating: 4.6, image: "https://images.unsplash.com/photo-1587309995166-512140a3224f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 6, name: "Alloy Wheel Cleaner Spray", category: "Car Care", price: "₹350", rating: 4.3, image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 7, name: "Smart Tire Pressure Monitor", category: "Electronics", price: "₹2,100", rating: 4.8, image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 8, name: "Carbon Fiber Spoiler", category: "Exterior", price: "₹3,200", rating: 4.4, image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
];

const categories = ["All", "Interior", "Exterior", "Electronics", "Car Care"];

export default function AccessoriesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);

  const filteredProducts = activeCategory === "All" 
    ? accessoriesData 
    : accessoriesData.filter(item => item.category === activeCategory);

  const addToCart = (id) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Car Accessories Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-20 container-custom py-16 md:py-24">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary font-semibold text-xs tracking-wider rounded-full mb-4 uppercase">
              Official Store
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Upgrade Your Ride <br/> <span className="text-primary">Premium Accessories</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-lg">
              Discover our exclusive collection of high-quality car accessories designed to enhance your driving experience.
            </p>
            <div className="flex gap-4">
              <button className="bg-primary hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-[0_0_15px_rgba(235,81,44,0.4)]">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom mt-12 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24">
            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <FiFilter /> Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button 
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors text-sm font-medium flex justify-between items-center ${
                      activeCategory === cat 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {cat}
                    {activeCategory === cat && <FiCheck />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeCategory === "All" ? "Trending Products" : `${activeCategory} Accessories`}
            </h2>
            <span className="text-sm text-gray-500 font-medium">Showing {filteredProducts.length} Results</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-800 flex items-center gap-1 shadow-sm">
                    <FiStar className="text-yellow-500 fill-yellow-500" /> {product.rating}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                    {product.category}
                  </div>
                  <h3 className="font-bold text-gray-900 text-[15px] mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-end mt-4">
                    <div className="text-lg font-extrabold text-gray-900">
                      {product.price}
                    </div>
                    <button 
                      onClick={() => addToCart(product.id)}
                      className={`h-9 px-4 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                        cart.includes(product.id) 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-900 text-white hover:bg-primary hover:shadow-[0_4px_10px_rgba(235,81,44,0.3)]'
                      }`}
                    >
                      {cart.includes(product.id) ? (
                        <><FiCheck /> Added</>
                      ) : (
                        <><FiShoppingCart /> Add</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                <FiShoppingCart />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-500 text-sm">We couldn't find any products in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
