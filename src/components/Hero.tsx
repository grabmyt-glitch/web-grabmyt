import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.scss';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-eyebrow fade-up">🎟 India's first last-minute ticket marketplace</div>
          <h1 className="hero-h1 fade-up delay-1">
            Turn cancelled tickets into instant cash<br />
            with a <span>premium</span> request flow.
          </h1>
          <p className="hero-sub fade-up delay-2">
            Sell your bus, train or movie ticket in minutes. Buyers browse verified inventory, request your ticket, and unlock chat only after seller approval.
          </p>

          <div className="hero-btns fade-up delay-3">
            <a href="#deals" className="btn-primary">🔍 Browse Live Deals</a>
            <Link to="/sell-ticket" className="btn-outline">💸 List Your Ticket</Link>
          </div>

          <div className="hero-stats fade-up delay-4">
            <div className="stat">
              <div className="stat-num">₹2<span>Cr+</span></div>
              <div className="stat-lbl">Saved on cancelled tickets</div>
            </div>
            <div className="stat">
              <div className="stat-num">48<span>K+</span></div>
              <div className="stat-lbl">Deals closed</div>
            </div>
            <div className="stat">
              <div className="stat-num">96<span>%</span></div>
              <div className="stat-lbl">Responded in 15 mins</div>
            </div>
          </div>
        </div>

        <aside className="hero-panel fade-up delay-2">
          <div className="panel-pill">Trending in 2026</div>
          <h2>Clean, premium, and built to convert last-minute ticket interest.</h2>
          <p>Modern glass surfaces, smart buyer-seller request flow, and faster chat make the home page feel trustworthy and premium.</p>

          <div className="panel-grid">
            <div className="panel-card">
              <strong>Instant interest</strong>
              <span>Buyers request within 5 minutes.</span>
            </div>
            <div className="panel-card">
              <strong>Secure chat</strong>
              <span>Unlock only after seller approval.</span>
            </div>
            <div className="panel-card">
              <strong>Cleaner UX</strong>
              <span>Soft glass panels, bright whitespace, elegant shadows.</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Hero;