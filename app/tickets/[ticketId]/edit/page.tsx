"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import TicketForm from "@/components/tickets/TicketForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTickets, updateTicketPatch, updateTicketPut } from "@/store/slices/ticketsSlice";
import { hasAtLeastOneTicketUpdateField } from "@/store/payloads";
import { getTicketId, normalizeTicketList, toTicketPayload } from "@/utils/tickets";

export default function EditTicketPage() {
  const params = useParams<{ ticketId: string }>();
  const ticketId = params.ticketId;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data } = useAppSelector((state) => state.tickets);
  const [mode, setMode] = useState<"PATCH" | "PUT">("PATCH");
  const [message, setMessage] = useState("");

  useEffect(() => {
    void dispatch(fetchTickets());
  }, [dispatch]);

  const ticket = useMemo(() => {
    const list = normalizeTicketList(data);
    return list.find((x) => getTicketId(x) === ticketId) ?? null;
  }, [data, ticketId]);

  const initialValues = ticket
    ? {
        from: String(ticket.from ?? ""),
        to: String(ticket.to ?? ""),
        place: String(ticket.place ?? ""),
        date: String(ticket.date ?? ""),
        startTime: String(ticket.startTime ?? ""),
        endTime: String(ticket.endTime ?? ""),
        type: String(ticket.type ?? "Train"),
        price: ticket.price ? String(ticket.price) : "",
        email: String(((ticket.personalInformation as Record<string, unknown> | undefined)?.email as string) ?? ""),
        phone: String(((ticket.personalInformation as Record<string, unknown> | undefined)?.phone as string) ?? ""),
      }
    : undefined;

  return (
    <main style={{ padding: "1rem", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Edit Ticket</h1>
      {!ticket && <p>Loading ticket...</p>}
      {message && <p>{message}</p>}
      <label>
        Update Mode: 
        <select value={mode} onChange={(e) => setMode(e.target.value as "PATCH" | "PUT")}>
          <option value="PATCH">PATCH</option>
          <option value="PUT">PUT</option>
        </select>
      </label>
      {initialValues && (
        <TicketForm
          initialValues={initialValues}
          submitLabel={`Save (${mode})`}
          onSubmit={async (values) => {
            const payload = toTicketPayload(values);
            if (!hasAtLeastOneTicketUpdateField(payload)) {
              setMessage("Provide at least one field to update.");
              return;
            }

            try {
              const action =
                mode === "PATCH"
                  ? updateTicketPatch({ ticketId, payload })
                  : updateTicketPut({ ticketId, payload });
              const res = await dispatch(action).unwrap();
              setMessage(res.message ?? "Ticket updated");
              router.push(`/tickets/${ticketId}`);
            } catch (e) {
              setMessage(typeof e === "string" ? e : "Update failed");
            }
          }}
        />
      )}
    </main>
  );
}

