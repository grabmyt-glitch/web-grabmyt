'use client';

import React, { useState, useEffect, useRef } from 'react';
import './LiveDeals.scss';

const LiveDeals: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const ticketCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const cards = ticketCardsRef.current?.querySelectorAll('.ticket-card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const filters = ['All', 'Train', 'Bus', 'Movies'];

  return (
    <section id="deals">
      <div className="deals-header">
        <div>
          <div className="section-tag">🔴 Live Now</div>
          <h2 className="section-h2">Grab Before They're Gone</h2>
          <p className="section-sub">Real deals, real urgency. These tickets expire with the show.</p>
        </div>
        <div>
          <div className="deals-filters">
            {filters.map(filter => (
              <div
                key={filter}
                className={`df ${activeFilter === filter ? 'on' : 'off'}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === 'All' ? '🎟' : filter === 'Train' ? '🚆' : filter === 'Bus' ? '🚌' : '🎬'} {filter}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="tickets-grid" ref={ticketCardsRef}>
        {/* Card 1 — Critical */}
        <div className="ticket-card">
          <div className="tc-badge-row">
            <div className="tc-type">🎬 Movie</div>
            <div className="urg urg-r">🔥 CRITICAL</div>
          </div>
          <div className="tc-route">Dune: Part Two (4DX)</div>
          <div className="tc-op">Cinepolis Forum Mall · Seat D12 · 4DX Premium</div>
          <div className="prog-track">
            <div className="prog-fill" style={{ width: '86%', background: '#FF2D55' }}></div>
          </div>
          <div className="prog-label">⏱ 19 minutes left · 👁 9 people viewing · 🪑 1 seat</div>
          <div className="tc-price-row">
            <div className="price-left">
              <div className="price-main">₹450</div>
              <div className="price-row2">
                <div className="price-orig">₹750</div>
                <div className="price-save">Save 40%</div>
              </div>
              <div className="tc-meta">Seller: Priya M. ⭐ 4.8</div>
            </div>
            <button className="req-btn">📨 Request</button>
          </div>
        </div>

        {/* Card 2 — Hot */}
        <div className="ticket-card">
          <div className="tc-badge-row">
            <div className="tc-type">🎬 Movie</div>
            <div className="urg urg-o">⚡ HOT</div>
          </div>
          <div className="tc-route">Inception (IMAX)</div>
          <div className="tc-op">PVR Inorbit Mall · Seat G7 · IMAX Screen</div>
          <div className="prog-track">
            <div className="prog-fill" style={{ width: '65%', background: '#FF9500' }}></div>
          </div>
          <div className="prog-label">⏱ 28 minutes left · 👁 7 people viewing · 🪑 1 seat</div>
          <div className="tc-price-row">
            <div className="price-left">
              <div className="price-main">₹390</div>
              <div className="price-row2">
                <div className="price-orig">₹650</div>
                <div className="price-save">Save 40%</div>
              </div>
              <div className="tc-meta">Seller: Kiran T. ⭐ 4.6</div>
            </div>
            <button className="req-btn">📨 Request</button>
          </div>
        </div>

        {/* Card 3 — Good */}
        <div className="ticket-card">
          <div className="tc-badge-row">
            <div className="tc-type">🚆 Train</div>
            <div className="urg urg-g">✅ GOOD</div>
          </div>
          <div className="tc-route">Hyderabad → Mumbai</div>
          <div className="tc-op">Rajdhani Express · B2-34 Window · 3A AC</div>
          <div className="prog-track">
            <div className="prog-fill" style={{ width: '33%', background: '#00C853' }}></div>
          </div>
          <div className="prog-label">⏱ 42 minutes left · 👁 4 people viewing · 🪑 2 seats</div>
          <div className="tc-price-row">
            <div className="price-left">
              <div className="price-main">₹1,100</div>
              <div className="price-row2">
                <div className="price-orig">₹1,800</div>
                <div className="price-save">Save 39%</div>
              </div>
              <div className="tc-meta">Seller: Ravi K. ⭐ 4.9</div>
            </div>
            <button className="req-btn">📨 Request</button>
          </div>
        </div>

        {/* Card 4 */}
        <div className="ticket-card">
          <div className="tc-badge-row">
            <div className="tc-type">🚌 Bus</div>
            <div className="urg urg-g">✅ GOOD</div>
          </div>
          <div className="tc-route">Bangalore → Hyderabad</div>
          <div className="tc-op">VRL Travels · Seat 12 Upper Berth · Sleeper AC</div>
          <div className="prog-track">
            <div className="prog-fill" style={{ width: '28%', background: '#00C853' }}></div>
          </div>
          <div className="prog-label">⏱ 65 minutes left · 👁 2 people viewing · 🪑 3 seats</div>
          <div className="tc-price-row">
            <div className="price-left">
              <div className="price-main">₹620</div>
              <div className="price-row2">
                <div className="price-orig">₹950</div>
                <div className="price-save">Save 35%</div>
              </div>
              <div className="tc-meta">Seller: Ananya S. ⭐ 4.7</div>
            </div>
            <button className="req-btn">📨 Request</button>
          </div>
        </div>

        {/* Card 5 */}
        <div className="ticket-card">
          <div className="tc-badge-row">
            <div className="tc-type">🎬 Movie</div>
            <div className="urg urg-r">🔥 CRITICAL</div>
          </div>
          <div className="tc-route">Oppenheimer (70mm)</div>
          <div className="tc-op">IMAX Prasads · Row C Seat 8 · 70mm Film</div>
          <div className="prog-track">
            <div className="prog-fill" style={{ width: '92%', background: '#FF2D55' }}></div>
          </div>
          <div className="prog-label">⏱ 15 minutes left · 👁 12 people viewing · 🪑 1 seat</div>
          <div className="tc-price-row">
            <div className="price-left">
              <div className="price-main">₹330</div>
              <div className="price-row2">
                <div className="price-orig">₹600</div>
                <div className="price-save">Save 45%</div>
              </div>
              <div className="tc-meta">Seller: Meera R. ⭐ 5.0</div>
            </div>
            <button className="req-btn">📨 Request</button>
          </div>
        </div>

        {/* Card 6 */}
        <div className="ticket-card">
          <div className="tc-badge-row">
            <div className="tc-type">🚆 Train</div>
            <div className="urg urg-g">✅ GOOD</div>
          </div>
          <div className="tc-route">Chennai → Hyderabad</div>
          <div className="tc-op">Charminar Express · C4-18 · 2S Seating</div>
          <div className="prog-track">
            <div className="prog-fill" style={{ width: '18%', background: '#00C853' }}></div>
          </div>
          <div className="prog-label">⏱ 88 minutes left · 👁 1 person viewing · 🪑 4 seats</div>
          <div className="tc-price-row">
            <div className="price-left">
              <div className="price-main">₹780</div>
              <div className="price-row2">
                <div className="price-orig">₹1,200</div>
                <div className="price-save">Save 33%</div>
              </div>
              <div className="tc-meta">Seller: Dev P. ⭐ 4.5</div>
            </div>
            <button className="req-btn">📨 Request</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDeals;