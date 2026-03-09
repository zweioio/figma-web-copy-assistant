import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Usage from './components/Usage';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Hero />
      <Features />
      <Usage />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
