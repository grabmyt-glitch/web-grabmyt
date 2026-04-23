import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import LiveDeals from './components/LiveDeals';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import About from './components/About';
import Testimonials from './components/Testimonials';
import CtaBand from './components/CtaBand';
import Footer from './components/Footer';
import SellTicketPage from './components/SellTicketPage';
import './Global.scss';

const HomePage: React.FC = () => (
  <>
    <Hero />
    <Ticker />
    <LiveDeals />
    <HowItWorks />
    <Features />
    <About />
    <Testimonials />
    <CtaBand />
    <Footer />
  </>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sell-ticket" element={<SellTicketPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
