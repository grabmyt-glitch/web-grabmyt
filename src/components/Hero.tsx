import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.scss';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-eyebrow fade-up">🎟 India's First Last-Minute Ticket Marketplace</div>
      <h1 className="hero-h1 fade-up delay-1">
        Don't lose money<br />on <span className="hi">cancelled</span> tickets.<br />
        <span className="stroke">Sell them instead.</span>
      </h1>
      <p className="hero-sub fade-up delay-2">
        Sell your bus, train or movie ticket at a discounted price when you can't make it.
        Buyers get a great last-minute deal. Everyone wins.
      </p>
      <div className="hero-btns fade-up delay-3">
        <a href="#deals" className="btn-primary">🔍 Find Last-Minute Deals</a>
        <Link to="/sell-ticket" className="btn-outline">💸 Sell Your Ticket</Link>
      </div>
      <div className="hero-stats fade-up delay-4">
        <div className="stat">
          <div className="stat-num">₹2<span>Cr+</span></div>
          <div className="stat-lbl">Saved from cancellation</div>
        </div>
        <div className="stat">
          <div className="stat-num">48<span>K+</span></div>
          <div className="stat-lbl">Tickets resold</div>
        </div>
        <div className="stat">
          <div className="stat-num">96<span>%</span></div>
          <div className="stat-lbl">Sell rate in 30 mins</div>
        </div>
        <div className="stat">
          <div className="stat-num">4.<span>9★</span></div>
          <div className="stat-lbl">Average rating</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;