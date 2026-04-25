"use client";import React, { useEffect, useMemo, useState } from 'react';
import { Clock, Sparkles, MessageCircle, CheckCircle2, XCircle } from 'lucide-react';
import Chat from './Chat';
import './RequestFlow.scss';

type RequestStatus = 'idle' | 'pending' | 'accepted' | 'rejected' | 'completed';

const ticket = {
  title: 'Inception (IMAX) · Premium Seat G7',
  venue: 'PVR Inorbit Mall',
  details: 'IMAX · Row G · Seat G7',
  price: '₹390',
  originalPrice: '₹650',
  discount: '40% OFF',
  rating: 4.6,
  sellerName: 'Kiran T.',
  sellerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=3&w=200&h=200&q=80',
};

const buyer = {
  name: 'Neha S.',
  avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=facearea&facepad=3&w=200&h=200&q=80',
  rating: 4.9,
};

const buyerId = 'buyer-neha';
const sellerId = 'seller-kiran';
const ticketId = 'ticket-inception-imax-g7';

const RequestFlow: React.FC = () => {
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [requestMessage, setRequestMessage] = useState('Hi, I’m interested in this ticket — can you hold it for me?');
  const [sellerTimer, setSellerTimer] = useState(300);
  const [dealTimer, setDealTimer] = useState(900);
  const [sellerNotice, setSellerNotice] = useState('');

  useEffect(() => {
    if (status === 'pending' && sellerTimer > 0) {
      const timer = window.setInterval(() => {
        setSellerTimer((current) => Math.max(0, current - 1));
      }, 1000);
      return () => window.clearInterval(timer);
    }
    return undefined;
  }, [status, sellerTimer]);

  useEffect(() => {
    if (status === 'accepted' && dealTimer > 0) {
      const timer = window.setInterval(() => {
        setDealTimer((current) => Math.max(0, current - 1));
      }, 1000);
      return () => window.clearInterval(timer);
    }
    return undefined;
  }, [status, dealTimer]);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendRequest = () => {
    setStatus('pending');
    setSellerTimer(300);
  };

  const handleAccept = () => {
    setStatus('accepted');
    setDealTimer(900);
  };

  const handleReject = () => {
    setStatus('rejected');
    setSellerNotice('This request was declined. Try another deal or send a new request.');
  };

  const handleCompleteDeal = () => {
    setStatus('completed');
  };

  const highDemandTag = useMemo(() => {
    if (status === 'accepted') return 'Act fast — 3 users tried this ticket';
    return 'High demand ticket';
  }, [status]);

  return (
    <section className="request-flow">
      <div className="request-hero">
        <div>
          <span className="section-tag">📨 Request Flow</span>
          <h1>Buyer + Seller request flow with chat unlocking</h1>
          <p>From request to acceptance, chat, and deal completion — all screens come alive in one premium flow.</p>
        </div>
        <div className="hero-badges">
          <div className="hero-pill">Glassmorphism</div>
          <div className="hero-pill">Live Request</div>
          <div className="hero-pill">Secure Chat</div>
        </div>
      </div>

      <div className="request-layout">
        <div className="buyer-panel glass-panel">
          <div className="panel-header">
            <div>
              <p className="panel-title">Buyer request</p>
              <h2>Send a request to the seller</h2>
            </div>
            <span className={`status-pill ${status === 'pending' ? 'pending' : status === 'accepted' ? 'accepted' : status === 'rejected' ? 'rejected' : 'idle'}`}>
              {status === 'pending' && 'Pending Seller Approval'}
              {status === 'accepted' && 'Request Accepted'}
              {status === 'rejected' && 'Request Rejected'}
              {status === 'idle' && 'Ready to Request'}
              {status === 'completed' && 'Deal Completed'}
            </span>
          </div>

          <div className="mini-card">
            <div className="mini-tag">{ticket.discount}</div>
            <div className="mini-title">{ticket.title}</div>
            <div className="mini-meta">{ticket.details}</div>
            <div className="mini-price-row">
              <div>
                <div className="mini-price">{ticket.price}</div>
                <div className="mini-sub">{ticket.originalPrice}</div>
              </div>
              <div className="high-demand">🔥 {highDemandTag}</div>
            </div>
            <div className="seller-card">
              <div className="avatar" style={{ backgroundImage: `url(${ticket.sellerAvatar})` }} />
              <div>
                <div className="seller-name">{ticket.sellerName}</div>
                <div className="seller-rating">⭐ {ticket.rating.toFixed(1)}</div>
              </div>
            </div>
          </div>

          <div className="request-input-block">
            <label htmlFor="requestText">Message to seller</label>
            <textarea
              id="requestText"
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
              disabled={status !== 'idle'}
            />
            <button className="primary-btn" onClick={handleSendRequest} disabled={status !== 'idle'}>
              Send Request
            </button>
          </div>

          {status === 'pending' && (
            <div className="pending-panel">
              <div className="pending-icon">⏳</div>
              <div>
                <p className="pending-title">Seller usually responds in 5 mins</p>
                <p className="pending-timer">{formatCountdown(sellerTimer)}</p>
                <p className="pending-copy">Chat unlocks as soon as the seller accepts. Stay ready.</p>
              </div>
            </div>
          )}

          {status === 'accepted' && (
            <div className="accepted-panel">
              <div className="accepted-badge">🔓 Chat unlocked</div>
              <p>Complete the deal within 15 mins.</p>
            </div>
          )}

          {status === 'rejected' && sellerNotice && <div className="rejected-note">{sellerNotice}</div>}
        </div>

        <div className="seller-panel glass-panel">
          <div className="panel-header">
            <div>
              <p className="panel-title">Seller request panel</p>
              <h2>Review buyer request</h2>
            </div>
            <div className="small-pill">Live review</div>
          </div>

          {status === 'pending' && (
            <div className="request-card">
              <div className="request-card-top">
                <div className="user-snapshot">
                  <div className="avatar-sm" style={{ backgroundImage: `url(${buyer.avatar})` }} />
                  <div>
                    <div className="user-name">{buyer.name}</div>
                    <div className="user-rating">⭐ {buyer.rating}</div>
                  </div>
                </div>
                <div className="request-tag">New request</div>
              </div>
              <div className="request-details">
                <div className="detail-label">Ticket requested</div>
                <div>{ticket.title}</div>
                <div className="detail-label">Message preview</div>
                <div className="message-preview">“{requestMessage}”</div>
              </div>
              <div className="request-actions">
                <button className="accept-btn" onClick={handleAccept}>Accept</button>
                <button className="reject-btn" onClick={handleReject}>Reject</button>
              </div>
            </div>
          )}

          {status === 'idle' && (
            <div className="seller-empty">
              <MessageCircle size={18} />
              <p>Waiting for a buyer to send a request.</p>
            </div>
          )}

          {status === 'accepted' && (
            <div className="seller-summary">
              <div className="summary-row">
                <div>
                  <div className="summary-label">Buyer</div>
                  <div>{buyer.name}</div>
                </div>
                <div>
                  <div className="summary-label">Ticket</div>
                  <div>{ticket.title}</div>
                </div>
              </div>
              <div className="summary-info">
                <Sparkles size={16} />
                <span>🚀 Request accepted and chat unlocked.</span>
              </div>
              <div className="summary-info">
                <Clock size={16} />
                <span>{formatCountdown(dealTimer)} left to complete the deal.</span>
              </div>
            </div>
          )}

          {status === 'rejected' && (
            <div className="seller-empty rejected-state">
              <XCircle size={18} />
              <p>Request has been rejected. The buyer will see a decline notice.</p>
            </div>
          )}

          {status === 'completed' && (
            <div className="seller-empty completed-state">
              <CheckCircle2 size={18} />
              <p>Deal has been marked complete. Well played.</p>
            </div>
          )}
        </div>
      </div>

      <div className="chat-layout glass-panel">
        <div className="chat-left">
          <div className="chat-list-header">
            <div>
              <p className="panel-title">Chats</p>
              <h3>Active conversations</h3>
            </div>
            <div className="chat-tag">{status === 'accepted' ? 'Chat open' : 'Locked'}</div>
          </div>
          <div className="chat-list-item active">
            <div className="chat-item-avatar" />
            <div>
              <div className="chat-item-name">{ticket.sellerName}</div>
              <div className="chat-item-meta">{status === 'accepted' ? 'Ready to send' : 'Awaiting acceptance'}</div>
            </div>
          </div>
        </div>

        <div className="chat-center">
          {status === 'accepted' ? (
            <Chat buyerId={buyerId} sellerId={sellerId} ticketId={ticketId} />
          ) : (
            <div className="chat-locked">
              <div className="chat-window-header">
                <div>
                  <div className="chat-title">{ticket.sellerName}</div>
                  <div className="chat-status">Online <span className="online-dot" /></div>
                </div>
                <div className="chat-timer">
                  <Clock size={16} />
                  Waiting for approval
                </div>
              </div>
              <div className="chat-placeholder">
                <p className="chat-placeholder-title">Chat unlocks after seller accepts the request.</p>
                <p className="chat-placeholder-copy">Once the request is approved, your live Firestore chat will appear here.</p>
              </div>
            </div>
          )}
        </div>

        <div className="chat-right sticky-summary">
          <div className="summary-card">
            <div className="summary-top">
              <h3>{ticket.title}</h3>
              <div className="urgency-pill">⚡ Act fast</div>
            </div>
            <div className="summary-details">
              <div className="detail-row">
                <span>Price</span>
                <strong>{ticket.price}</strong>
              </div>
              <div className="detail-row">
                <span>Discount</span>
                <strong>{ticket.discount}</strong>
              </div>
              <div className="detail-row">
                <span>Seller</span>
                <strong>{ticket.sellerName} · ⭐ {ticket.rating}</strong>
              </div>
              <div className="detail-row">
                <span>Status</span>
                <strong>{status === 'accepted' ? 'Chat unlocked' : status === 'pending' ? 'Pending approval' : status === 'completed' ? 'Completed' : 'Request ready'}</strong>
              </div>
            </div>
            <div className="summary-cta-row">
              <button className="complete-btn" onClick={handleCompleteDeal} disabled={status !== 'accepted'}>
                Mark as Deal Completed
              </button>
              <button className="cancel-btn" onClick={() => setStatus('rejected')}>
                Cancel Request
              </button>
            </div>
          </div>
        </div>
      </div>

      {status === 'completed' && (
        <div className="completion-modal">
          <div className="completion-card">
            <div className="confetti">🎉</div>
            <h2>Deal Successfully Completed!</h2>
            <p>You and {ticket.sellerName} closed the deal smoothly.</p>
            <div className="completion-info">
              <div>
                <span>Ticket</span>
                <strong>{ticket.title}</strong>
              </div>
              <div>
                <span>Seller</span>
                <strong>{ticket.sellerName}</strong>
              </div>
            </div>
            <div className="completion-actions">
              <button className="rate-btn">⭐ Rate Seller</button>
              <button className="more-btn">🔁 View More Deals</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RequestFlow;
