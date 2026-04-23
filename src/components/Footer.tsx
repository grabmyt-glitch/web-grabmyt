import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <em>⚡</em>LastPass
          </div>
          <div className="footer-desc">
            India's first last-minute ticket resale marketplace. Turn cancelled plans into recovered money — safely and instantly.
          </div>
          <div className="footer-socials">
            <div className="fsoc">𝕏</div>
            <div className="fsoc">in</div>
            <div className="fsoc">📸</div>
            <div className="fsoc">▶</div>
          </div>
        </div>
        <div className="footer-col">
          <h4>Platform</h4>
          <ul>
            <li><a href="#">Browse Deals</a></li>
            <li><a href="#">List a Ticket</a></li>
            <li><a href="#">How It Works</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Download App</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Safety Tips</a></li>
            <li><a href="#">Dispute Resolution</a></li>
            <li><a href="#">Community Rules</a></li>
            <li><a href="#">Report an Issue</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">© 2024 LastPass Technologies Pvt. Ltd. · Hyderabad, India</div>
        <div className="footer-rules">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
        <div className="footer-badge">🛡 Zero Scalping Guarantee</div>
      </div>
    </footer>
  );
};

export default Footer;