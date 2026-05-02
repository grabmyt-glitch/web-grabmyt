"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteTicketById, fetchTickets, getTicketById } from "@/store/slices/ticketsSlice";
import { getTicketId, normalizeTicketList } from "@/utils/tickets";

export default function TicketDetailsPage() {
  const params = useParams<{ ticketId: string }>();
  const ticketId = params.ticketId;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, error } = useAppSelector((state) => state.tickets);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (ticketId) {
      void dispatch(getTicketById(ticketId));
      void dispatch(fetchTickets());
    }
  }, [dispatch, ticketId]);

  const currentTicket = useMemo(() => {
    const list = normalizeTicketList(data);
    const fromList = list.find((x) => getTicketId(x) === ticketId);
    if (fromList) return fromList;

    if (data && typeof data === "object") {
      const obj = data as Record<string, unknown>;
      if (getTicketId(obj) === ticketId) return obj;
    }

    return null;
  }, [data, ticketId]);

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this ticket? This action cannot be undone.");
    if (!confirmed) return;
    try {
      const res = await dispatch(deleteTicketById(ticketId)).unwrap();
      setMessage(res.message ?? "Ticket deleted");
      router.push("/my-tickets");
    } catch (e) {
      setMessage(typeof e === "string" ? e : "Delete failed");
    }
  };

  return (
    <main style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Ticket Details</h1>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {message && <p>{message}</p>}
      {!currentTicket ? (
        <p>Ticket not found.</p>
      ) : (
        <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem" }}>
          <p><strong>ID:</strong> {ticketId}</p>
          <p><strong>From:</strong> {String(currentTicket.from ?? "-")}</p>
          <p><strong>To:</strong> {String(currentTicket.to ?? "-")}</p>
          <p><strong>Place:</strong> {String(currentTicket.place ?? "-")}</p>
          <p><strong>Date:</strong> {String(currentTicket.date ?? "-")}</p>
          <p><strong>Start Time:</strong> {String(currentTicket.startTime ?? "-")}</p>
          <p><strong>End Time:</strong> {String(currentTicket.endTime ?? "-")}</p>
          <p><strong>Type:</strong> {String(currentTicket.type ?? "-")}</p>
          <p><strong>Price:</strong> {String(currentTicket.price ?? "-")}</p>
          <p>
            <Link href={`/tickets/${ticketId}/edit`}>Edit</Link> | <button onClick={handleDelete}>Delete</button>
          </p>
        </div>
      )}
    </main>
  );
}

