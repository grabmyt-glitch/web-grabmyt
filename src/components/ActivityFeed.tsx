'use client';

import { useState, useEffect } from 'react';
import { Flame, Eye, TrendingDown, Bell } from 'lucide-react';
import './ActivityFeed.scss';

interface ActivityItem {
  id: number;
  type: 'sold' | 'viewing' | 'drop';
  message: string;
  time: string;
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: 1, type: 'sold', message: 'Movie ticket sold', time: '2 mins ago' },
    { id: 2, type: 'viewing', message: '5 users viewing Ed Sheeran Concert', time: 'Just now' },
    { id: 3, type: 'drop', message: 'Price dropped for NYC Bus', time: '5 mins ago' }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setActivities(prev => {
        const newActivity = {
          id: Date.now(),
          type: 'sold' as const,
          message: 'Someone just grabbed a deal!',
          time: 'Just now'
        };
        return [newActivity, ...prev].slice(0, 5); // Keep top 5
      });
    }, 15000); // Every 15 seconds
    
    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'sold': return <Flame size={16} className="activity-icon-flame" />;
      case 'viewing': return <Eye size={16} className="activity-icon-eye" />;
      case 'drop': return <TrendingDown size={16} className="activity-icon-drop" />;
      default: return <Bell size={16} />;
    }
  };

  return (
    <aside className="activity-feed">
      <div className="feed-header">
        <h3>Live Activity</h3>
        <div className="live-indicator">
          <span className="dot"></span>
          Live
        </div>
      </div>
      
      <div className="feed-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className={`activity-icon-container ${activity.type}`}>
              {getIcon(activity.type)}
            </div>
            <div className="activity-content">
              <p className="activity-message">{activity.message}</p>
              <span className="activity-time">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
