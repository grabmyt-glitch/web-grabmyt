"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TicketForm from "@/components/tickets/TicketForm";
import { useAppDispatch } from "@/store/hooks";
import { createTicket } from "@/store/slices/ticketsSlice";
import { toTicketPayload } from "@/utils/tickets";
import { validateTicketCreatePayload } from "@/store/payloads";

export default function CreateTicketPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [message, setMessage] = useState("");

  return (
    <main style={{ padding: "1rem", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Create Ticket</h1>
      {message && <p>{message}</p>}
      <TicketForm
        submitLabel="Create Ticket"
        onSubmit={async (values) => {
          const payload = toTicketPayload(values);
          const validationError = validateTicketCreatePayload(payload);
          if (validationError) {
            setMessage(validationError);
            return;
          }

          try {
            const res = await dispatch(createTicket(payload)).unwrap();
            setMessage(res.message ?? "Ticket created");
            router.push("/my-tickets");
          } catch (error) {
            setMessage(typeof error === "string" ? error : "Failed to create ticket");
          }
        }}
      />
    </main>
  );
}

