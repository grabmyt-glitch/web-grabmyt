import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar: React.FC = () => {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <em>⚡</em>LastPass
      </div>
      <div className="nav-links">
        <a href="#deals" className="nav-link">Browse Deals</a>
        <a href="#how" className="nav-link">How It Works</a>
        <a href="#features" className="nav-link">Features</a>
        <a href="#about" className="nav-link">About</a>
      </div>
      <div className="nav-right">
        <div className="nav-live">
          <div className="live-dot"></div>12 live now
        </div>
        <a href="#" className="nav-login">Log in</a>
        <Link to="/sell-ticket" className="nav-cta">List a Ticket →</Link>
      </div>
    </nav>
  );
};

export default Navbar;