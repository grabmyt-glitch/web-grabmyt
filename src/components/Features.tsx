import React, { useEffect, useRef } from 'react';
import './Features.scss';

const Features: React.FC = () => {
  const featCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const cards = featCardsRef.current?.querySelectorAll('.feat-card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features">
      <div className="features-header">
        <div className="section-tag">Why LastPass</div>
        <h2 className="section-h2">Built for trust & speed</h2>
        <p className="section-sub">
          Every feature is designed around one goal: making last-minute ticket transfers safe and instant.
        </p>
      </div>

      <div className="feat-grid" ref={featCardsRef}>
        <div className="feat-card">
          <div className="feat-icon">🛡️</div>
          <div className="feat-title">No Scalping Guarantee</div>
          <div className="feat-desc">
            Resale price is always strictly lower than the original. Our platform enforces this — no loopholes, no exceptions. Fair for everyone.
          </div>
        </div>
        <div className="feat-card">
          <div className="feat-icon">💬</div>
          <div className="feat-title">Secure Buyer-Seller Chat</div>
          <div className="feat-desc">
            Once a request is accepted, a private encrypted chat opens. Share booking proof, coordinate payment, transfer tickets — all in one place.
          </div>
        </div>
        <div className="feat-card">
          <div className="feat-icon">⚡</div>
          <div className="feat-title">30-Minute Window Rule</div>
          <div className="feat-desc">
            Tickets must be listed at least 30 minutes before departure. This protects buyers from scams and gives enough time to reach the venue.
          </div>
        </div>
        <div className="feat-card">
          <div className="feat-icon">⭐</div>
          <div className="feat-title">Verified Ratings System</div>
          <div className="feat-desc">
            Every buyer and seller gets rated after each deal. Ratings are public and verified — so you always know who you're dealing with.
          </div>
        </div>
        <div className="feat-card">
          <div className="feat-icon">🔔</div>
          <div className="feat-title">Instant Alerts</div>
          <div className="feat-desc">
            Set alerts for your favourite routes or movies. The moment a ticket drops, you get notified before anyone else sees it.
          </div>
        </div>
        <div className="feat-card">
          <div className="feat-icon">🌐</div>
          <div className="feat-title">Train, Bus & Movies</div>
          <div className="feat-desc">
            One platform for all last-minute ticket types. Whether it's a Rajdhani seat, a VRL bus berth, or a 4DX movie ticket — we cover it all.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;