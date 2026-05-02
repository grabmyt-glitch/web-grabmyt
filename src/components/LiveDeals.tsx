'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTickets } from '@/store/slices/ticketsSlice';
import { normalizeTicketList } from '@/utils/tickets';
import './LiveDeals.scss';

const LiveDeals: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const ticketCardsRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const ticketsState = useAppSelector((state) => state.tickets);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  useEffect(() => {
    void dispatch(fetchTickets());
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    const cards = ticketCardsRef.current?.querySelectorAll('.ticket-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [ticketsState.data, activeFilter]);

  const filters = ['All', 'Train', 'Bus', 'Movie'];

  const publicTickets = useMemo(() => {
    const all = normalizeTicketList(ticketsState.data);
    const userEmail = String(currentUser?.email ?? '').toLowerCase();
    const userPhone = String(currentUser?.phone ?? '').toLowerCase();

    const notMine = all.filter((ticket) => {
      const personal = (ticket.personalInformation as Record<string, unknown> | undefined) ?? {};
      const ticketEmail = String(personal.email ?? ticket.email ?? '').toLowerCase();
      const ticketPhone = String(personal.phone ?? ticket.phone ?? '').toLowerCase();

      if (userEmail && ticketEmail && userEmail === ticketEmail) return false;
      if (userPhone && ticketPhone && userPhone === ticketPhone) return false;
      return true;
    });

    if (activeFilter === 'All') return notMine;
    return notMine.filter((ticket) => String(ticket.type ?? '').toLowerCase() === activeFilter.toLowerCase());
  }, [ticketsState.data, currentUser, activeFilter]);

  return (
    <section id="deals">
      <div className="deals-header">
        <div>
          <div className="section-tag">Live Now</div>
          <h2 className="section-h2">Grab Before They're Gone</h2>
          <p className="section-sub">Public tickets only. Your own tickets are hidden here.</p>
        </div>
        <div>
          <div className="deals-filters">
            {filters.map((filter) => (
              <div
                key={filter}
                className={`df ${activeFilter === filter ? 'on' : 'off'}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </div>
            ))}
          </div>
        </div>
      </div>

      {ticketsState.status === 'loading' && <p>Loading tickets...</p>}
      {ticketsState.error && <p style={{ color: 'crimson' }}>{ticketsState.error}</p>}

      <div className="tickets-grid" ref={ticketCardsRef}>
        {publicTickets.length === 0 ? (
          <div className="ticket-card">
            <div className="tc-route">No public tickets found</div>
            <div className="tc-op">Try creating a ticket or check back soon.</div>
          </div>
        ) : (
          publicTickets.map((ticket, index) => (
            <div className="ticket-card" key={String(ticket._id ?? ticket.id ?? index)}>
              <div className="tc-badge-row">
                <div className="tc-type">{String(ticket.type ?? 'Ticket')}</div>
                <div className="urg urg-g">LIVE</div>
              </div>
              <div className="tc-route">{String(ticket.from ?? '-')} to {String(ticket.to ?? '-')}</div>
              <div className="tc-op">{String(ticket.place ?? '-')} · {String(ticket.date ?? '-')}</div>
              <div className="tc-price-row">
                <div className="price-left">
                  <div className="price-main">Rs. {String(ticket.price ?? '-')}</div>
                  <div className="tc-meta">Contact available after request</div>
                </div>
                <button className="req-btn">Request</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default LiveDeals;

