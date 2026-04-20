import { useState, useEffect } from 'react';
import { Clock, Eye, Tag, Zap } from 'lucide-react';
import './TicketCard.css';

interface TicketCardProps {
  title: string;
  type: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  timeRemainingMs: number;
  viewers: number;
  image?: string;
}

export function TicketCard({
  title,
  type,
  originalPrice,
  discountedPrice,
  discountPercentage,
  timeRemainingMs,
  viewers,
  image
}: TicketCardProps) {
  const [timeLeft, setTimeLeft] = useState(timeRemainingMs);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (ms: number) => {
    if (ms <= 0) return "00:00:00";
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const mins = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <div className="ticket-badge-discount">
          <Tag size={14} />
          <span>{discountPercentage}% OFF</span>
        </div>
        <div className="ticket-type">{type}</div>
      </div>
      
      {image && (
         <div className="ticket-image" style={{ backgroundImage: `url(${image})` }}></div>
      )}

      <div className="ticket-content">
        <h3 className="ticket-title">{title}</h3>
        
        <div className="ticket-urgency">
          <div className="timer-container">
            <Clock size={16} className="timer-icon pulse-icon" />
            <span className="timer-text">{formatTime(timeLeft)}</span>
          </div>
          <div className="viewers-container">
            <Eye size={16} />
            <span>{viewers} watching</span>
          </div>
        </div>

        <div className="ticket-pricing">
          <div className="prices">
            <span className="original-price">${originalPrice.toFixed(2)}</span>
            <span className="discounted-price">${discountedPrice.toFixed(2)}</span>
          </div>
          <div className="scarcity-label">
            <Zap size={14} className="zap-icon" />
            <span>Almost gone!</span>
          </div>
        </div>
      </div>

      <div className="ticket-footer">
        <button className="grab-btn">
          Grab Deal
        </button>
      </div>
    </div>
  );
}
