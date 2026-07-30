"use client";
import React, { useState, useEffect } from 'react';
import './Compare.css';

export default function CompareCars() {
  const [allCars, setAllCars] = useState([]);
  const [car1Id, setCar1Id] = useState('');
  const [car2Id, setCar2Id] = useState('');
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comparing, setComparing] = useState(false);
  const [error, setError] = useState('');

  // Fetch list of cars to populate dropdowns
  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        const carApiUrl = process.env.NEXT_PUBLIC_CAR_API_URL || 'http://3.25.228.91/api/cars';
        const res = await fetch(carApiUrl);
        if (!res.ok) throw new Error('Failed to fetch cars list');
        const data = await res.json();
        setAllCars(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load cars for comparison.');
      } finally {
        setLoading(false);
      }
    };
    fetchAllCars();
  }, []);

  const handleCompare = async () => {
    if (!car1Id || !car2Id) {
      setError('Please select two cars to compare.');
      return;
    }
    if (car1Id === car2Id) {
      setError('Please select two different cars to compare.');
      return;
    }

    setComparing(true);
    setError('');
    setComparisonData(null);

    try {
      // In production, define NEXT_PUBLIC_COMPARE_API_URL in Vercel. 
      // Defaults to localhost for local testing.
      const compareApiUrl = process.env.NEXT_PUBLIC_COMPARE_API_URL || 'http://3.25.228.91/api/compare';
      const res = await fetch(`${compareApiUrl}?carIds=${car1Id},${car2Id}`);
      if (!res.ok) throw new Error('Failed to fetch comparison data');
      
      const data = await res.json();
      setComparisonData(data.cars);
    } catch (err) {
      console.error(err);
      setError('Error comparing cars. Please try again later.');
    } finally {
      setComparing(false);
    }
  };

  if (loading) {
    return <div className="loading-state">Loading cars...</div>;
  }

  return (
    <div className="compare-container">
      <div className="compare-header">
        <h1>Compare Cars</h1>
        <p>Find the perfect car by comparing features, prices, and specs side-by-side.</p>
      </div>

      <div className="selectors-row">
        <div className="select-group">
          <label>Select Car 1</label>
          <select 
            className="car-select" 
            value={car1Id} 
            onChange={(e) => setCar1Id(e.target.value)}
          >
            <option value="">-- Choose First Car --</option>
            {allCars.map(car => (
              <option key={`c1-${car._id}`} value={car._id}>{car.brand} {car.name}</option>
            ))}
          </select>
        </div>

        <div className="select-group">
          <label>Select Car 2</label>
          <select 
            className="car-select" 
            value={car2Id} 
            onChange={(e) => setCar2Id(e.target.value)}
          >
            <option value="">-- Choose Second Car --</option>
            {allCars.map(car => (
              <option key={`c2-${car._id}`} value={car._id}>{car.brand} {car.name}</option>
            ))}
          </select>
        </div>

        <button 
          className="compare-action-btn" 
          onClick={handleCompare}
          disabled={comparing}
        >
          {comparing ? 'Comparing...' : 'Compare Now'}
        </button>
      </div>

      {error && <div className="error-state">{error}</div>}

      {comparisonData && comparisonData.length === 2 && (
        <div className="comparison-table-wrapper">
          <table className="compare-table">
            <thead>
              <tr>
                <th className="feature-label">Features</th>
                <th>
                  <div className="car-header-card">
                    <img src={comparisonData[0].imageUrl} alt={comparisonData[0].name} className="car-header-image" />
                    <h3 className="car-header-name">{comparisonData[0].brand} {comparisonData[0].name}</h3>
                    <p className="car-header-price">{comparisonData[0].budget || 'Price TBA'}</p>
                  </div>
                </th>
                <th>
                  <div className="car-header-card">
                    <img src={comparisonData[1].imageUrl} alt={comparisonData[1].name} className="car-header-image" />
                    <h3 className="car-header-name">{comparisonData[1].brand} {comparisonData[1].name}</h3>
                    <p className="car-header-price">{comparisonData[1].budget || 'Price TBA'}</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="feature-label">Category</td>
                <td>{comparisonData[0].category} ({comparisonData[0].subCategory})</td>
                <td>{comparisonData[1].category} ({comparisonData[1].subCategory})</td>
              </tr>
              <tr>
                <td className="feature-label">Fuel Type</td>
                <td>{comparisonData[0].fuelType || 'N/A'}</td>
                <td>{comparisonData[1].fuelType || 'N/A'}</td>
              </tr>
              <tr>
                <td className="feature-label">Transmission</td>
                <td>{comparisonData[0].transmission || 'N/A'}</td>
                <td>{comparisonData[1].transmission || 'N/A'}</td>
              </tr>
              <tr>
                <td className="feature-label">Engine</td>
                <td>{comparisonData[0].engine || 'N/A'}</td>
                <td>{comparisonData[1].engine || 'N/A'}</td>
              </tr>
              <tr>
                <td className="feature-label">Ground Clearance</td>
                <td>{comparisonData[0].groundClearance || 'N/A'}</td>
                <td>{comparisonData[1].groundClearance || 'N/A'}</td>
              </tr>
              <tr>
                <td className="feature-label">Seating Capacity</td>
                <td>{comparisonData[0].seatingCapacity || 'N/A'}</td>
                <td>{comparisonData[1].seatingCapacity || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
