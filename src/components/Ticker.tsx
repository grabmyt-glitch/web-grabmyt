import React from 'react';
import './Ticker.scss';

const Ticker: React.FC = () => {
  return (
    <div className="ticker-wrap">
      <div className="ticker">
        <div className="ticker-item">🎬 Dune 4DX · Hyd · -40% · 19 min left</div>
        <div className="ticker-item">🚆 Hyd→Mumbai · Rajdhani · -38% · 42 min left</div>
        <div className="ticker-item">🚌 Bangalore→Hyd · VRL · -35% · 1 hr left</div>
        <div className="ticker-item">🎬 Inception IMAX · PVR · -40% · 28 min left</div>
        <div className="ticker-item">🚆 Chennai→Hyd · Charminar · -33% · 88 min left</div>
        <div className="ticker-item">🎬 Oppenheimer · Cinepolis · -45% · 15 min left</div>
        <div className="ticker-item">🚌 Hyd→Pune · Orange Travels · -30% · 55 min left</div>
        {/* duplicate for seamless loop */}
        <div className="ticker-item">🎬 Dune 4DX · Hyd · -40% · 19 min left</div>
        <div className="ticker-item">🚆 Hyd→Mumbai · Rajdhani · -38% · 42 min left</div>
        <div className="ticker-item">🚌 Bangalore→Hyd · VRL · -35% · 1 hr left</div>
        <div className="ticker-item">🎬 Inception IMAX · PVR · -40% · 28 min left</div>
        <div className="ticker-item">🚆 Chennai→Hyd · Charminar · -33% · 88 min left</div>
        <div className="ticker-item">🎬 Oppenheimer · Cinepolis · -45% · 15 min left</div>
        <div className="ticker-item">🚌 Hyd→Pune · Orange Travels · -30% · 55 min left</div>
      </div>
    </div>
  );
};

export default Ticker;