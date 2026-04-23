import React from 'react';
import './About.scss';

const About: React.FC = () => {
  return (
    <section id="about">
      <div className="about-grid">
        <div className="about-visual">
          <div className="av-stat">
            <div className="av-num">₹2Cr+</div>
            <div className="av-label">Recovered for sellers who would have lost everything on cancellation</div>
          </div>
          <div className="av-stat">
            <div className="av-num">48,000+</div>
            <div className="av-label">Tickets successfully resold on the platform since launch</div>
          </div>
          <div className="av-stat">
            <div className="av-num">96%</div>
            <div className="av-label">Of listed tickets sell within 30 minutes of listing</div>
          </div>
          <div className="av-stat">
            <div className="av-num">12 Cities</div>
            <div className="av-label">Currently active across India, expanding to 30 by 2025</div>
          </div>
        </div>

        <div className="about-text">
          <div className="section-tag">Our Story</div>
          <h2 className="section-h2">Born from a ₹1,200 train ticket that went to waste.</h2>
          <p>
            It started when our founder missed a Rajdhani train due to a last-minute emergency and lost ₹1,200 to a cancellation penalty. He thought — <em>someone at the station would have paid for this.</em>
          </p>
          <p>
            That frustration turned into LastPass — a marketplace where last-minute cancellations become last-minute deals. Sellers recover money they'd otherwise lose. Buyers get deeply discounted tickets that were going to waste anyway.
          </p>
          <p>
            We built it for the everyday Indian traveller and moviegoer. No middlemen, no algorithms deciding your price — just people helping people, with a secure platform to make it safe.
          </p>
          <div className="about-badges">
            <div className="ab orange">🇮🇳 Made in India</div>
            <div className="ab">🚀 Founded 2024</div>
            <div className="ab">🏙 Hyderabad HQ</div>
            <div className="ab">🛡 Zero Scalping</div>
            <div className="ab orange">📱 App Coming Soon</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;