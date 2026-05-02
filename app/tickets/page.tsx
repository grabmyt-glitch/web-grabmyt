"use client";

import Link from "next/link";
import { useState } from "react";

export default function TicketsPage() {
  const [ticketId, setTicketId] = useState("");

  const editHref = ticketId.trim() ? `/tickets/${ticketId.trim()}/edit` : "#";
  const detailsHref = ticketId.trim() ? `/tickets/${ticketId.trim()}` : "#";

  return (
    <main style={{ padding: "1rem", maxWidth: "760px", margin: "0 auto" }}>
      <h1>Ticket Actions</h1>
      <p>
        Create and edit tickets from here. Your ticket list is in <Link href="/settings">Settings -> My Tickets</Link>.
      </p>
      <div style={{ marginTop: "1rem", display: "grid", gap: "0.75rem" }}>
        <Link href="/tickets/create">Create Ticket</Link>
        <input
          placeholder="Enter ticket id for edit/details"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
        />
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link href={detailsHref}>Open Details</Link>
          <Link href={editHref}>Open Edit</Link>
        </div>
      </div>
    </main>
  );
}
