export type TicketRecord = Record<string, unknown>;

export function getTicketId(ticket: TicketRecord): string {
  return String(ticket._id ?? ticket.id ?? ticket.ticketId ?? "");
}

export function normalizeTicketList(data: unknown): TicketRecord[] {
  if (Array.isArray(data)) return data as TicketRecord[];

  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    if (Array.isArray(obj.data)) return obj.data as TicketRecord[];
    if (Array.isArray(obj.tickets)) return obj.tickets as TicketRecord[];
  }

  return [];
}

export function toTicketPayload(form: {
  from: string;
  to: string;
  place: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  price: string;
  email: string;
  phone: string;
}) {
  return {
    from: form.from || undefined,
    to: form.to || undefined,
    place: form.place || undefined,
    date: form.date || undefined,
    startTime: form.startTime || undefined,
    endTime: form.endTime || undefined,
    type: form.type || undefined,
    price: form.price ? Number(form.price) : undefined,
    personalInformation: {
      email: form.email || undefined,
      phone: form.phone || undefined,
    },
  };
}

