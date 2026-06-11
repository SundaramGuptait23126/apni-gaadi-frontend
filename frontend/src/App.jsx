import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MostSearchedCars from './components/MostSearchedCars';
import ElectricCars from './components/ElectricCars';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';

// Home component to hold the main page content
const Home = () => (
  <main>
    <HeroSection />
    <MostSearchedCars />
    <ElectricCars />
  </main>
);

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
