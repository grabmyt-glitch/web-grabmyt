"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import dayjs, { Dayjs } from 'dayjs';
import { ConfigProvider, DatePicker, Select, TimePicker } from 'antd';
import 'antd/dist/reset.css';
import { useAppDispatch } from '@/store/hooks';
import { createTicket } from '@/store/slices/ticketsSlice';
import { validateTicketCreatePayload } from '@/store/payloads';
import './SellTicketPage.scss';

const initialFormState = {
  from: '',
  to: '',
  date: '',
  time: '',
  ticketType: 'Train',
  seatInfo: '',
  originalPrice: '',
  listingPrice: '',
  contact: '',
  notes: '',
};

const SellTicketPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage('');

    const ticketPayload = {
      from: form.from,
      to: form.to,
      place: form.seatInfo,
      date: form.date,
      startTime: form.time,
      endTime: form.time,
      price: Number(form.listingPrice) || undefined,
      type: form.ticketType,
      personalInformation: {
        email: form.contact.includes('@') ? form.contact : undefined,
        phone: form.contact,
      },
    };
    const validationError = validateTicketCreatePayload(ticketPayload);
    if (validationError) {
      setStatusMessage(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await dispatch(createTicket(ticketPayload)).unwrap();
      setStatusMessage(result.message || 'Ticket listing created successfully.');
      setForm(initialFormState);
    } catch {
      setStatusMessage('Network error while submitting the ticket.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateChange = (value: Dayjs | null) => {
    setForm((prev) => ({ ...prev, date: value ? value.format('YYYY-MM-DD') : '' }));
  };

  const handleTimeChange = (value: Dayjs | null) => {
    setForm((prev) => ({ ...prev, time: value ? value.format('HH:mm') : '' }));
  };

  return (
    <section className="sell-ticket-page">
      <div className="sell-ticket-shell">
        <div className="sell-ticket-left">
          <div className="section-tag">Sell Your Ticket</div>
          <h1>Turn unused tickets into instant cash.</h1>
          <p>
            List your bus, train or movie ticket quickly. Buyers browse live options, request your ticket, and you close the deal in minutes.
          </p>

          <div className="sell-card-visual">
            <div className="ticket-illustration">
              <div className="ticket-chip" />
              <div className="ticket-bar" />
              <div className="ticket-label">Rajdhani Express • B2-34</div>
              <div className="ticket-price">₹1,100</div>
            </div>
          </div>

          <div className="sell-usage">
            <h2>Why sell here?</h2>
            <ul>
              <li>Fast onboarding for last-minute tickets</li>
              <li>Built-in buyer interest for urgent routes</li>
              <li>Strict no-scalping rules for fair pricing</li>
              <li>Secure posting and instant listing visibility</li>
            </ul>
          </div>

          <div className="sell-badge">Verified last-minute listings</div>
          <Link href="/sell-tickets" className="secondary-link">← Back to home</Link>
        </div>
        <div className="sell-ticket-right">
          <div className="form-card">
            <div className="section-tag">Create listing</div>
            <h2>Submit your ticket details</h2>
            <p>Fill the form on the right, set a fair price, and let buyers request your ticket instantly.</p>

            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#FF5A3C',
                  colorBgContainer: '#171936',
                  colorText: '#F5F7FF',
                  colorBorder: 'rgba(255,255,255,0.12)',
                },
              }}
            >
              <form className="sell-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label>
                  From
                  <input name="from" value={form.from} onChange={handleChange} required placeholder="Hyderabad" />
                </label>
                <label>
                  To / Event
                  <input name="to" value={form.to} onChange={handleChange} required placeholder="Mumbai or Dune 4DX" />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Date
                  <DatePicker
                    className="antd-field"
                    value={form.date ? dayjs(form.date, 'YYYY-MM-DD') : null}
                    onChange={handleDateChange}
                    format="DD/MM/YYYY"
                    placeholder="Select date"
                  />
                </label>
                <label>
                  Time
                  <TimePicker
                    className="antd-field"
                    value={form.time ? dayjs(form.time, 'HH:mm') : null}
                    onChange={handleTimeChange}
                    format="HH:mm"
                    minuteStep={5}
                    placeholder="Select time"
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Ticket type
                  <Select
                    className="antd-field"
                    value={form.ticketType}
                    onChange={(value) => setForm((prev) => ({ ...prev, ticketType: value }))}
                    options={[
                      { value: 'Train', label: 'Train' },
                      { value: 'Bus', label: 'Bus' },
                      { value: 'Movie', label: 'Movie' },
                    ]}
                    getPopupContainer={(triggerNode) => triggerNode.parentElement ?? document.body}
                  />
                </label>
                <label>
                  Seat / slot
                  <input name="seatInfo" value={form.seatInfo} onChange={handleChange} required placeholder="B2-34 Window · 3A AC" />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Original price
                  <input name="originalPrice" value={form.originalPrice} onChange={handleChange} required placeholder="₹1,800" />
                </label>
                <label>
                  Listing price
                  <input name="listingPrice" value={form.listingPrice} onChange={handleChange} required placeholder="₹1,100" />
                </label>
              </div>
              <label>
                Contact
                <input name="contact" value={form.contact} onChange={handleChange} required placeholder="upi@bank or phone" />
              </label>
              <label>
                Notes
                <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Add any important notes for buyers..." rows={5} />
              </label>

              {statusMessage && <div className="form-status">{statusMessage}</div>}

              <button type="submit" className="primary-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Posting ticket...' : 'Post ticket now'}
              </button>
            </form>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellTicketPage;
