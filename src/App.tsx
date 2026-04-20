
import { Layout } from './components/Layout';
import { TicketCard } from './components/TicketCard';
import './App.scss';

function App() {
  const dummyTickets = [
    {
      id: 1,
      title: "Avengers: Secret Wars - Premier",
      type: "Movie",
      originalPrice: 45.00,
      discountedPrice: 22.50,
      discountPercentage: 50,
      timeRemainingMs: 3600000 * 2 + 1500000, // 2h 25m
      viewers: 142,
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=400&h=200"
    },
    {
      id: 2,
      title: "NYC to Boston Express Coach",
      type: "Bus",
      originalPrice: 60.00,
      discountedPrice: 35.00,
      discountPercentage: 42,
      timeRemainingMs: 3600000 * 4 + 450000, // 4h 7m
      viewers: 38,
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400&h=200"
    },
    {
      id: 3,
      title: "Ed Sheeran Live - VIP Pit",
      type: "Event",
      originalPrice: 250.00,
      discountedPrice: 175.00,
      discountPercentage: 30,
      timeRemainingMs: 3600000 * 1 + 220000, // 1h 3m
      viewers: 890,
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=400&h=200"
    },
    {
      id: 4,
      title: "Bullet Train: Tokyo to Osaka",
      type: "Train",
      originalPrice: 120.00,
      discountedPrice: 85.00,
      discountPercentage: 29,
      timeRemainingMs: 3600000 * 0 + 900000, // 15m
      viewers: 215,
      image: "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?auto=format&fit=crop&q=80&w=400&h=200"
    },
    {
      id: 5,
      title: "Comedy Club Night - Front Row",
      type: "Event",
      originalPrice: 40.00,
      discountedPrice: 15.00,
      discountPercentage: 62,
      timeRemainingMs: 3600000 * 3 + 1800000, // 3h 30m
      viewers: 12,
      image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80&w=400&h=200"
    },
    {
      id: 6,
      title: "LA to SF Sleeper Bus",
      type: "Bus",
      originalPrice: 85.00,
      discountedPrice: 45.00,
      discountPercentage: 47,
      timeRemainingMs: 3600000 * 5 + 300000, // 5h 5m
      viewers: 56,
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=400&h=200"
    }
  ];

  return (
    <Layout>
      <div className="app-header">
        <h1>Flash Deals <span className="fire-emoji">🔥</span></h1>
        <p className="subtitle">Grab these last-minute tickets before they're gone!</p>
      </div>
      
      <div className="ticket-grid">
        {dummyTickets.map(ticket => (
          <TicketCard key={ticket.id} {...ticket} />
        ))}
      </div>
    </Layout>
  );
}

export default App;
