import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, SunMedium } from 'lucide-react';
import './Navbar.scss';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
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
        <Link to="/request-flow" className="nav-link">Request Flow</Link>
      </div>
      <div className="nav-right">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <SunMedium size={16} /> : <Moon size={16} />}
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
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