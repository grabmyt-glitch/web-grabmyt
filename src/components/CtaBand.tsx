import React from 'react';
import './CtaBand.scss';

const CtaBand: React.FC = () => {
  return (
    <div className="cta-band">
      <h2>Stop losing money on<br />cancelled tickets.</h2>
      <p>Join 48,000+ Indians who turned their last-minute plans into last-minute wins.</p>
      <div className="cta-band-btns">
        <a href="#" className="cta-white">🔍 Browse Live Deals</a>
        <a href="#" className="cta-ghost">💸 List My Ticket</a>
      </div>
    </div>
  );
};

export default CtaBand;