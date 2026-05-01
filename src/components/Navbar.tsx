"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Moon, SunMedium } from 'lucide-react';
import './Navbar.scss';
import { useAuth } from '@/context/AuthContext';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-logo">
        <Link href="/" style={{textDecoration: 'none', color: 'inherit'}}>
          <em>⚡</em>Grab My Ticket
        </Link>
      </div>
      <div className="nav-links">
        <a href="#deals" className="nav-link">Browse Deals</a>
        <a href="#how" className="nav-link">How It Works</a>
        <a href="#features" className="nav-link">Features</a>
        <a href="#about" className="nav-link">About</a>
        <Link href="/request-flow" className="nav-link">Request Flow</Link>
      </div>
      <div className="nav-right">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <SunMedium size={16} /> : <Moon size={16} />}
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
        <div className="nav-live">
          <div className="live-dot"></div>12 live now
        </div>
        
        {user ? (
          <div className="user-menu" onMouseLeave={() => setIsDropdownOpen(false)}>
            <div 
              className="user-avatar" 
              onMouseEnter={() => setIsDropdownOpen(true)}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {user.avatar || 'U'}
            </div>
            
            {isDropdownOpen && (
              <div className="user-dropdown">
                <div className="user-dropdown-header">
                  <div className="u-name">{user.name}</div>
                  <div className="u-email">{user.email}</div>
                </div>
                <div className="user-dropdown-body">
                  <Link href="/settings/profile" className="u-item">
                    <span>⚙️</span> Profile Settings
                  </Link>
                  <Link href="/settings/monitoring" className="u-item">
                    <span>📊</span> Dashboard
                  </Link>
                  <div className="u-divider"></div>
                  <button onClick={logout} className="u-item u-logout">
                    <span>🚪</span> Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login" className="nav-login">Log in</Link>
        )}
        
        <Link href="/sell-ticket" className="nav-cta">List a Ticket →</Link>
      </div>
    </nav>
  );
};

export default Navbar;