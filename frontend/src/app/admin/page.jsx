"use client";
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FiUploadCloud } from 'react-icons/fi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  
  const categoriesList = ['Most Searched Cars', 'Electric Cars', 'Latest Cars', 'Upcoming Cars'];
  const subCategoriesList = ['SUV', 'Hatchback', 'Sedan', 'MUV', 'Luxury'];

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    tagline: '',
    budget: '',
    type: 'New',
    category: 'Most Searched Cars',
    subCategory: 'SUV',
    isFeatured: true
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Admin Guard: Only allow specific email
  if (!user || user.email !== 'sundramgupta990@gmail.com') {
    return (
      <div className="unauthorized-container">
        <h2>Unauthorized Access</h2>
        <p>You must be logged in as the Admin to view this page.</p>
        <p>Email required: sundramgupta990@gmail.com</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setMessage({ type: 'error', text: 'Please select an image file to upload.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    const data = new FormData();
    data.append('name', formData.name);
    data.append('brand', formData.brand);
    data.append('tagline', formData.tagline);
    data.append('budget', formData.budget);
    data.append('type', formData.type);
    data.append('category', formData.category);
    data.append('subCategory', formData.subCategory);
    data.append('isFeatured', formData.isFeatured);
    data.append('image', image);

    try {
      const carApiUrl = process.env.NEXT_PUBLIC_CAR_API_URL || 'http://localhost:5002/api/cars';
      const response = await fetch(carApiUrl, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Car uploaded successfully! It is now live in the database and Cloudinary.' });
        // Reset form
        setFormData({ name: '', brand: '', tagline: '', budget: '', type: 'New', category: 'Most Searched Cars', subCategory: 'SUV', isFeatured: true });
        setImage(null);
        e.target.reset();
      } else {
        setMessage({ type: 'error', text: result.message || 'Upload failed' });
      }
    } catch (error) {
      console.error('Error uploading car:', error);
      setMessage({ type: 'error', text: 'Network error. Make sure car-service is running on port 5002.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="admin-dashboard">
        <div className="admin-header">
          <h2>Admin Dashboard: Add New Car</h2>
          <p>Upload a new car directly to your MongoDB and Cloudinary storage.</p>
        </div>

        {message.text && (
          <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
            {message.text}
          </div>
        )}

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Car Name (e.g., 2026 Tata Tiago)</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter full car name" />
          </div>

          <div className="form-group">
            <label>Brand (e.g., Tata)</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} required placeholder="Enter brand name" />
          </div>

          <div className="form-group">
            <label>Tagline (e.g., Comfortable & Indian Road Friendly!)</label>
            <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} placeholder="Catchy tagline for hero slider" />
          </div>

          <div className="form-group">
            <label>Budget Range (e.g., ₹ 5.65 - 8.90 Lakh)</label>
            <input type="text" name="budget" value={formData.budget} onChange={handleChange} placeholder="Optional pricing info" />
          </div>

          <div className="form-group">
            <label>Condition</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="New">New Car</option>
              <option value="Used">Used Car</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              {categoriesList.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Subcategory</label>
            <select name="subCategory" value={formData.subCategory} onChange={handleChange}>
              {subCategoriesList.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Upload Car Image (JPG, PNG, WEBP)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} required />
          </div>

          <div className="form-group checkbox-group">
            <input type="checkbox" id="isFeatured" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
            <label htmlFor="isFeatured">Show in Hero Carousel on Homepage</label>
          </div>

          <button type="submit" className="upload-btn" disabled={loading}>
            {loading ? 'Uploading to Cloudinary...' : <><FiUploadCloud size={24} /> Upload Car</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
