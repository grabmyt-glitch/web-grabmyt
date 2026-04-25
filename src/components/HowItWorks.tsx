'use client';

import React, { useEffect, useRef } from 'react';
import './HowItWorks.scss';

const HowItWorks: React.FC = () => {
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const steps = stepsRef.current?.querySelectorAll('.step');
    steps?.forEach(step => observer.observe(step));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how">
      <div className="how-grid">
        <div>
          <div className="section-tag">Simple Process</div>
          <h2 className="section-h2">How LastPass Works</h2>
          <p className="section-sub" style={{ marginBottom: 0 }}>
            From listing to handover in under 5 minutes.
          </p>

          <div className="how-steps" ref={stepsRef} style={{ marginTop: 40 }}>
            <div className="step">
              <div className="step-num">1</div>
              <div className="step-body">
                <div className="step-title">Seller lists the ticket</div>
                <div className="step-desc">
                  Can't make it? List your ticket in 60 seconds. Set a discounted price — must be lower than what you paid. No scalping allowed.
                </div>
              </div>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <div className="step-body">
                <div className="step-title">Buyer sends a request</div>
                <div className="step-desc">
                  Buyers browse live deals and tap Request on any ticket. They send a short message. No payment yet — zero risk at this stage.
                </div>
              </div>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <div className="step-body">
                <div className="step-title">Seller reviews & accepts</div>
                <div className="step-desc">
                  Seller sees the buyer's profile, rating, and message. Accept or decline within 10 minutes. Accepting opens a secure chat instantly.
                </div>
              </div>
            </div>
            <div className="step">
              <div className="step-num">4</div>
              <div className="step-body">
                <div className="step-title">Chat, pay & transfer</div>
                <div className="step-desc">
                  Buyer and seller connect in a secure chat. Share booking proof, coordinate payment, and transfer the ticket. Rate each other when done.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="how-visual">
          <div className="hv-header">
            <div className="hv-dots">
              <div className="hv-dot" style={{ background: '#FF5F57' }}></div>
              <div className="hv-dot" style={{ background: '#FEBC2E' }}></div>
              <div className="hv-dot" style={{ background: '#28C840' }}></div>
            </div>
            <div className="hv-title">lastpass.in/chat/ravi-k</div>
          </div>
          <div style={{ background: 'rgba(255,69,0,0.07)', borderBottom: '1px solid rgba(255,69,0,0.1)', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: '13px', fontWeight: 700, color: '#fff' }}>
                🚆 Hyd → Mumbai · B2-34
              </div>
              <div style={{ fontSize: '10px', color: '#3A3A5A', marginTop: '1px' }}>
                Rajdhani · Ref: TRN2891X · 42 mins left
              </div>
            </div>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: '16px', fontWeight: 800, color: '#FF4500' }}>
              ₹1,100
            </div>
          </div>
          <div className="hv-body">
            <div className="hv-msg hv-them">
              <div className="hv-av" style={{ background: 'linear-gradient(135deg,#FF4500,#FF6830)' }}>R</div>
              <div>
                <div className="hv-bubble">Hey! I accepted your request. Ticket is available 🎫 Booking ref: TRN2891X</div>
                <div className="hv-time">9:38 AM · Ravi (Seller)</div>
              </div>
            </div>
            <div className="hv-msg" style={{ marginLeft: 'auto', maxWidth: '82%', display: 'flex', gap: '9px', flexDirection: 'row-reverse' }}>
              <div className="hv-av" style={{ background: 'linear-gradient(135deg,#0A84FF,#3A9FFF)' }}>A</div>
              <div>
                <div className="hv-bubble" style={{ background: 'linear-gradient(135deg,#FF4500,#FF6830)', color: '#fff', borderRadius: '14px 4px 14px 14px' }}>
                  Great! Sending ₹1,100 to ravi@upi now 💸
                </div>
                <div className="hv-time" style={{ textAlign: 'right' }}>9:40 AM · You</div>
              </div>
            </div>
            <div className="hv-msg hv-them">
              <div className="hv-av" style={{ background: 'linear-gradient(135deg,#FF4500,#FF6830)' }}>R</div>
              <div>
                <div className="hv-bubble">OTP: 847291 — Share with ticket counter. Enjoy! ✅</div>
                <div className="hv-time">9:41 AM · Ravi (Seller)</div>
              </div>
            </div>
            <div className="hv-strip">
              <span style={{ fontSize: '18px' }}>🤝</span>
              <div className="hv-strip-text">Deal complete! Both parties confirmed transfer.</div>
              <div className="hv-strip-btn">Rate Now</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;