import { useState } from 'react';
import {
  BadgeDollarSign,
  Bus,
  CalendarDays,
  ChevronDown,
  Clock3,
  Film,
  Menu,
  MessageCircleMore,
  Phone,
  Search,
  ShieldCheck,
  Ticket,
  TrainFront,
  UserRound,
  WalletCards,
  Globe,
  X,
} from 'lucide-react';
import heroImage from './assets/hero.png';
import './App.scss';

type TicketType = 'Bus' | 'Train' | 'Movie';

interface TicketItem {
  type: TicketType;
  route: string;
  schedule: string;
  originalPrice: string;
  discountedPrice: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const ticketTypeIcons: Record<TicketType, typeof Bus> = {
  Bus,
  Train: TrainFront,
  Movie: Film,
};

const featuredTickets: TicketItem[] = [
  {
    type: 'Bus',
    route: 'Bangalore to Goa Night Coach',
    schedule: 'Today, 10:45 PM',
    originalPrice: 'Rs. 1,850',
    discountedPrice: 'Rs. 1,120',
  },
  {
    type: 'Train',
    route: 'Mumbai to Pune Vande Bharat',
    schedule: 'Tomorrow, 6:20 AM',
    originalPrice: 'Rs. 1,240',
    discountedPrice: 'Rs. 790',
  },
  {
    type: 'Movie',
    route: 'Midnight IMAX: Dune Resurrection',
    schedule: 'Today, 11:55 PM',
    originalPrice: 'Rs. 780',
    discountedPrice: 'Rs. 420',
  },
  {
    type: 'Bus',
    route: 'Hyderabad to Chennai Sleeper',
    schedule: 'Today, 9:10 PM',
    originalPrice: 'Rs. 2,100',
    discountedPrice: 'Rs. 1,360',
  },
  {
    type: 'Train',
    route: 'Delhi to Jaipur Express',
    schedule: 'Tomorrow, 7:40 PM',
    originalPrice: 'Rs. 980',
    discountedPrice: 'Rs. 620',
  },
  {
    type: 'Movie',
    route: 'BookMyShow Luxe: Couple Recliner',
    schedule: 'Today, 8:30 PM',
    originalPrice: 'Rs. 1,450',
    discountedPrice: 'Rs. 860',
  },
];

const faqs: FaqItem[] = [
  {
    question: 'How does ticket resale work?',
    answer:
      'Sellers list valid last-minute tickets, buyers grab the best match, and GMT coordinates secure transfer details instantly within the app.',
  },
  {
    question: 'Is it safe to buy tickets?',
    answer:
      'Every listing is screened with seller verification, ticket validation checks, and protected in-app payments so buyers can book with confidence.',
  },
  {
    question: 'How do I receive my ticket?',
    answer:
      'Once payment is confirmed, your ticket is shared digitally through your GMT account and a confirmation message so it is ready to use right away.',
  },
  {
    question: 'Can I cancel after selling?',
    answer:
      'To protect buyers, confirmed sales are treated as final. If there is an issue with the transfer, GMT support steps in to resolve it quickly.',
  },
];

const floatingIcons = [
  { icon: Ticket, label: 'ticket', className: 'icon-ticket' },
  { icon: Bus, label: 'bus', className: 'icon-bus' },
  { icon: TrainFront, label: 'train', className: 'icon-train' },
  { icon: Film, label: 'film', className: 'icon-film' },
];

function App() {
  const [activeFaq, setActiveFaq] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="landing-page">
      <header className="topbar">
        <a className="brand" href="#hero" aria-label="Grab My Ticket home">
          <span className="brand-mark">GMT</span>
          <span className="brand-text">Grab My Ticket</span>
        </a>

        <div className="topbar-search">
          <Search size={16} />
          <input type="text" placeholder="Search route, city or event" aria-label="Search tickets" />
        </div>

        <nav className={`topbar-actions ${mobileNavOpen ? 'is-open' : ''}`}>
          <a href="#featured">Explore</a>
          <a href="#about">About</a>
          <a href="#faq">FAQ</a>
          <button className="sell-button" type="button">
            Sell Ticket
          </button>

          <div className="profile-menu">
            <button type="button" className="profile-trigger" aria-label="Open profile menu">
              <UserRound size={18} />
              <span>Account</span>
              <ChevronDown size={16} />
            </button>

            <div className="profile-dropdown">
              <a href="#hero">Login</a>
              <a href="#hero">Signup</a>
              <a href="#featured">My Tickets</a>
              <a href="#footer">Logout</a>
            </div>
          </div>
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileNavOpen((open) => !open)}
        >
          {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main>
        <section
          className="hero-section"
          id="hero"
          style={{ backgroundImage: `linear-gradient(135deg, rgba(8, 15, 35, 0.86), rgba(28, 42, 94, 0.55)), url(${heroImage})` }}
        >
          <div className="hero-overlay" />

          {floatingIcons.map(({ icon: Icon, label, className }) => (
            <div key={label} className={`floating-icon ${className}`} aria-hidden="true">
              <Icon size={22} />
            </div>
          ))}

          <div className="hero-content">
            <div className="hero-copy reveal reveal-up">
              <span className="eyebrow">Last-minute travel and entertainment deals</span>
              <h1>Grab Last-Minute Tickets at the Best Price</h1>
              <p>Buy or sell tickets instantly before it&apos;s too late.</p>

              <div className="hero-actions">
                <button type="button" className="primary-cta">
                  Grab a Ticket
                </button>
                <button type="button" className="secondary-cta">
                  Sell a Ticket
                </button>
              </div>

              <div className="hero-metrics">
                <div>
                  <strong>25k+</strong>
                  <span>tickets moved</span>
                </div>
                <div>
                  <strong>40%</strong>
                  <span>average savings</span>
                </div>
                <div>
                  <strong>3 min</strong>
                  <span>average checkout</span>
                </div>
              </div>
            </div>

            <div className="search-panel reveal reveal-right">
              <div className="search-header">
                <span>Find a last-minute deal</span>
                <p>Routes, events, and dates that are ready right now.</p>
              </div>

              <div className="search-grid">
                <label>
                  <span>From</span>
                  <input type="text" placeholder="Mumbai" />
                </label>
                <label>
                  <span>To / Event</span>
                  <input type="text" placeholder="Goa or IMAX screening" />
                </label>
                <label>
                  <span>Date</span>
                  <input type="date" defaultValue="2026-04-21" />
                </label>
                <button type="button" className="search-submit">
                  Search deals
                </button>
              </div>

              <div className="search-tags">
                <span>Trending now</span>
                <button type="button">Buses</button>
                <button type="button">Trains</button>
                <button type="button">Movies</button>
              </div>
            </div>
          </div>
        </section>

        <section className="featured-section section-shell" id="featured">
          <div className="section-heading reveal reveal-up">
            <div>
              <span className="section-kicker">Featured tickets</span>
              <h2>Fresh deals from commuters, moviegoers, and last-minute planners</h2>
            </div>
            <p>Every card below is preloaded to make the marketplace feel alive the second someone lands on GMT.</p>
          </div>

          <div className="ticket-grid">
            {featuredTickets.map((ticket, index) => {
              const Icon = ticketTypeIcons[ticket.type];

              return (
                <article
                  className="ticket-card reveal reveal-up"
                  key={`${ticket.type}-${ticket.route}`}
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="ticket-card__badge">
                    <Icon size={18} />
                    <span>{ticket.type}</span>
                  </div>

                  <h3>{ticket.route}</h3>

                  <div className="ticket-card__meta">
                    <span>
                      <CalendarDays size={16} />
                      {ticket.schedule}
                    </span>
                    <span>
                      <Clock3 size={16} />
                      Limited window
                    </span>
                  </div>

                  <div className="ticket-card__footer">
                    <div className="ticket-card__price">
                      <span className="original">{ticket.originalPrice}</span>
                      <strong>{ticket.discountedPrice}</strong>
                    </div>
                    <button type="button">Grab Now</button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="section-cta">
            <button type="button" className="secondary-cta">
              View All Tickets
            </button>
          </div>
        </section>

        <section className="about-section section-shell" id="about">
          <div className="about-copy reveal reveal-left">
            <span className="section-kicker">About GMT</span>
            <h2>A smarter way to recover value from unused tickets and unlock spontaneous plans</h2>
            <p>
              Grab My Ticket is a last-minute marketplace where people resell valid bus, train, and movie tickets
              before departure or showtime. Buyers save money, sellers recover losses, and every exchange is designed
              to feel fast, safe, and effortless.
            </p>
          </div>

          <div className="benefit-grid">
            <article className="benefit-card reveal reveal-up">
              <BadgeDollarSign size={24} />
              <h3>Save money</h3>
              <p>Unlock premium seats and urgent travel routes at prices that beat standard checkout.</p>
            </article>
            <article className="benefit-card reveal reveal-up">
              <ShieldCheck size={24} />
              <h3>Instant booking</h3>
              <p>Verified listings, quick payments, and a clean flow that gets you from browse to ticket in minutes.</p>
            </article>
            <article className="benefit-card reveal reveal-up">
              <WalletCards size={24} />
              <h3>Easy resale</h3>
              <p>Turn cancellation pain into recovered value by listing a ticket before it goes to waste.</p>
            </article>
          </div>
        </section>

        <section className="faq-section section-shell" id="faq">
          <div className="section-heading reveal reveal-up">
            <div>
              <span className="section-kicker">FAQ</span>
              <h2>Questions people ask before their first grab</h2>
            </div>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <article
                className={`faq-item reveal reveal-up ${activeFaq === index ? 'is-open' : ''}`}
                key={faq.question}
              >
                <button type="button" onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}>
                  <span>{faq.question}</span>
                  <ChevronDown size={18} />
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer section-shell" id="footer">
        <a className="brand footer-brand" href="#hero">
          <span className="brand-mark">GMT</span>
          <span className="brand-text">Grab My Ticket</span>
        </a>

        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#footer">Contact</a>
          <a href="#footer">Terms</a>
          <a href="#footer">Privacy</a>
        </div>

        <div className="footer-socials">
          <a href="#footer" aria-label="Website">
            <Globe size={18} />
          </a>
          <a href="#footer" aria-label="Support chat">
            <MessageCircleMore size={18} />
          </a>
          <a href="#footer" aria-label="Call support">
            <Phone size={18} />
          </a>
        </div>

        <p>Copyright (c) 2026 Grab My Ticket. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
