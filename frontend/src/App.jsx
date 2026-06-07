import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MostSearchedCars from './components/MostSearchedCars';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <HeroSection />
        <MostSearchedCars />
      </main>
      <Footer />
    </div>
  );
}

export default App;
