import { useState } from 'react';
import { Home, Search, Ticket, List, MessageSquare, User } from 'lucide-react';
import './Sidebar.css';

export function Sidebar() {
  const [activeItem, setActiveItem] = useState('Home');

  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'Search', icon: Search },
    { name: 'Sell Ticket', icon: Ticket },
    { name: 'My Listings', icon: List },
    { name: 'Chats', icon: MessageSquare },
    { name: 'Profile', icon: User },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">GT</div>
        <h2>GrabTicket</h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.name;
          return (
            <button
              key={item.name}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveItem(item.name)}
            >
              <Icon size={22} className="nav-icon" />
              <span>{item.name}</span>
              {isActive && <div className="active-glow"></div>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
