import React, { useEffect, useState } from 'react';
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
import RequestFlow from './components/RequestFlow';
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
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = window.localStorage.getItem('theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('light-theme', theme === 'light');
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <BrowserRouter>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sell-ticket" element={<SellTicketPage />} />
        <Route path="/request-flow" element={<RequestFlow />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
