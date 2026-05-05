import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';
import './Navbar.scss';
import { useAuth } from '@/context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <em>⚡</em>Grab My Ticket
          </Link>
        </div>

        <button className="mobile-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-content ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="nav-links">
            <a href="#deals" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Browse Deals</a>
            <a href="#how" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>How It Works</a>
            <a href="#features" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
            <a href="#about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <Link href="/request-flow" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Request Flow</Link>
          </div>

          <div className="nav-right">
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
                  {user.avatar || <User size={20} />}
                </div>

                {isDropdownOpen && (
                  <div className="user-dropdown">
                    <div className="user-dropdown-header">
                      <div className="u-name">{user.name}</div>
                      <div className="u-email">{user.email}</div>
                    </div>
                    <div className="user-dropdown-body">
                      <Link href="/settings/profile" className="u-item" onClick={() => setIsMobileMenuOpen(false)}>
                        <span>⚙️</span> Profile Settings
                      </Link>
                      <Link href="/settings/monitoring" className="u-item" onClick={() => setIsMobileMenuOpen(false)}>
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
              <Link href="/login" className="nav-login" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
            )}

            <Link href="/sell-ticket" className="nav-cta" onClick={() => setIsMobileMenuOpen(false)}>List a Ticket →</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;