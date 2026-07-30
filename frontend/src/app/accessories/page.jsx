import React from 'react';

export const metadata = {
  title: 'Car Accessories | ApniGaadiDekho',
  description: 'Shop premium car accessories for your vehicle. Best prices and top quality guaranteed.',
};

export default function AccessoriesPage() {
  const accessories = [
    {
      id: 1,
      name: 'Premium Leather Seat Covers',
      price: '₹4,999',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80',
      category: 'Interior'
    },
    {
      id: 2,
      name: 'All-Weather 3D Floor Mats',
      price: '₹2,499',
      rating: 4.6,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=800&q=80',
      category: 'Interior'
    },
    {
      id: 3,
      name: 'High-Power LED Headlight Bulbs',
      price: '₹3,299',
      rating: 4.9,
      reviews: 256,
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80',
      category: 'Exterior'
    },
    {
      id: 4,
      name: 'Smart Dash Cam with Night Vision',
      price: '₹5,999',
      rating: 4.7,
      reviews: 178,
      image: 'https://images.unsplash.com/photo-1516015694769-e77be953a168?auto=format&fit=crop&w=800&q=80',
      category: 'Electronics'
    },
    {
      id: 5,
      name: 'Premium Car Cover (Waterproof)',
      price: '₹1,499',
      rating: 4.4,
      reviews: 62,
      image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80',
      category: 'Exterior'
    },
    {
      id: 6,
      name: 'Wireless Car Charger Mount',
      price: '₹1,299',
      rating: 4.5,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1585298198762-6721ea7f12e2?auto=format&fit=crop&w=800&q=80',
      category: 'Electronics'
    },
    {
      id: 7,
      name: 'Microfiber Cleaning Cloth Set (4 Pcs)',
      price: '₹399',
      rating: 4.9,
      reviews: 504,
      image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80',
      category: 'Care'
    },
    {
      id: 8,
      name: 'Heavy Duty Tire Inflator 150 PSI',
      price: '₹1,899',
      rating: 4.8,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1598463567676-4767174dbfa3?auto=format&fit=crop&w=800&q=80',
      category: 'Utility'
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Accessories Hero */}
      <section className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1920&q=80" 
            alt="Car Accessories Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>
        <div className="container-custom relative z-10">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary font-bold rounded-full text-sm tracking-wide mb-4 border border-primary/30">
            APNIGAADIDEKHO STORE
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-white">
            Premium Car Accessories
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
            Upgrade your ride with our hand-picked selection of high-quality interior and exterior accessories. Free shipping on orders over ₹999.
          </p>
          <div className="flex gap-4">
            <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-primary/30">
              Shop Bestsellers
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-xl font-bold border border-white/20 transition-colors">
              Browse Categories
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-custom py-12 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Categories</h3>
            <ul className="space-y-3 mb-8">
              {['All Accessories', 'Interior', 'Exterior', 'Electronics', 'Car Care', 'Utility'].map((cat, i) => (
                <li key={cat}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="category" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" defaultChecked={i === 0} />
                    <span className={\`text-gray-600 group-hover:text-primary transition-colors font-medium \${i === 0 ? 'text-primary font-bold' : ''}\`}>
                      {cat}
                    </span>
                  </label>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Price Range</h3>
            <div className="space-y-4">
              <input type="range" className="w-full accent-primary" min="0" max="10000" defaultValue="5000" />
              <div className="flex justify-between text-sm text-gray-500 font-medium">
                <span>₹0</span>
                <span>₹5,000+</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer shadow-sm">
              <option>Sort by: Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Customer Rating</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {accessories.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 group flex flex-col">
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-gray-700 uppercase tracking-wider">
                    {item.category}
                  </div>
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm transition-colors">
                    ♥
                  </button>
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-400 text-sm">★★★★★</span>
                    <span className="text-xs font-medium text-gray-500 ml-1">{item.rating} ({item.reviews})</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                    <span className="text-xl font-extrabold text-gray-900">{item.price}</span>
                    <button className="bg-primary/10 hover:bg-primary text-primary hover:text-white p-2.5 rounded-xl transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button className="border-2 border-gray-200 text-gray-600 hover:border-primary hover:text-primary font-bold px-8 py-3 rounded-xl transition-all">
              Load More Products
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
