import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MostSearchedCars from './components/MostSearchedCars';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Home component to hold the main page content
const Home = () => (
  <main>
    <HeroSection />
    <MostSearchedCars />
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
