"use client";
import React, { useEffect, useRef } from 'react';
import './Testimonials.scss';

const Testimonials: React.FC = () => {
  const testCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const cards = testCardsRef.current?.querySelectorAll('.test-card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials">
      <div className="test-header">
        <div className="section-tag">Real People</div>
        <h2 className="section-h2">What our users say</h2>
        <p className="section-sub">Thousands of buyers and sellers have found last-minute wins on LastPass.</p>
      </div>
      <div className="test-grid" ref={testCardsRef}>
        <div className="test-card">
          <div className="test-stars">★★★★★</div>
          <div className="test-quote">
            I had to cancel my Rajdhani ticket an hour before departure. Instead of losing ₹1,200, I listed it on LastPass and got ₹900 in 12 minutes. Literally saved my evening.
          </div>
          <div className="test-user">
            <div className="test-av" style={{ background: 'linear-gradient(135deg,#FF4500,#FF6830)' }}>R</div>
            <div>
              <div className="test-name">Ravi Kumar</div>
              <div className="test-role">Seller · Hyderabad</div>
            </div>
          </div>
        </div>
        <div className="test-card">
          <div className="test-stars">★★★★★</div>
          <div className="test-quote">
            Got a 4DX ticket for Dune at ₹450 when I thought the show was sold out. The seller responded in 3 minutes, we chatted, paid, and I was in my seat before the ads ended!
          </div>
          <div className="test-user">
            <div className="test-av" style={{ background: 'linear-gradient(135deg,#0A84FF,#3A9FFF)' }}>A</div>
            <div>
              <div className="test-name">Arjun Krishnan</div>
              <div className="test-role">Buyer · Hyderabad</div>
            </div>
          </div>
        </div>
        <div className="test-card">
          <div className="test-stars">★★★★☆</div>
          <div className="test-quote">
            The chat feature is what makes this trustworthy. I could see the seller's booking screenshot before paying. Felt completely safe. Will use every time I need to cancel.
          </div>
          <div className="test-user">
            <div className="test-av" style={{ background: 'linear-gradient(135deg,#8B5CF6,#A78BFA)' }}>S</div>
            <div>
              <div className="test-name">Sneha Reddy</div>
              <div className="test-role">Buyer & Seller · Bangalore</div>
            </div>
          </div>
        </div>
        <div className="test-card">
          <div className="test-stars">★★★★★</div>
          <div className="test-quote">
            I was at the bus stop and realised I had the wrong date. Listed my VRL ticket and sold it within 20 minutes to someone who was genuinely happy to get it. Win-win!
          </div>
          <div className="test-user">
            <div className="test-av" style={{ background: 'linear-gradient(135deg,#FF2D55,#FF6080)' }}>P</div>
            <div>
              <div className="test-name">Priya Menon</div>
              <div className="test-role">Seller · Chennai</div>
            </div>
          </div>
        </div>
        <div className="test-card">
          <div className="test-stars">★★★★★</div>
          <div className="test-quote">
            As someone who travels frequently for work, I can't always predict cancellations. LastPass turned my biggest travel anxiety into something I actually don't worry about anymore.
          </div>
          <div className="test-user">
            <div className="test-av" style={{ background: 'linear-gradient(135deg,#00C853,#00E676)' }}>V</div>
            <div>
              <div className="test-name">Vikram Shetty</div>
              <div className="test-role">Frequent Seller · Mumbai</div>
            </div>
          </div>
        </div>
        <div className="test-card">
          <div className="test-stars">★★★★★</div>
          <div className="test-quote">
            The urgency badges are so useful. I could see which tickets were selling fast and which ones had time. Grabbed an IMAX ticket 28 mins before showtime. Unreal experience!
          </div>
          <div className="test-user">
            <div className="test-av" style={{ background: 'linear-gradient(135deg,#FF9500,#FFB830)' }}>D</div>
            <div>
              <div className="test-name">Dev Patel</div>
              <div className="test-role">Buyer · Pune</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;