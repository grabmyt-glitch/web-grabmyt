"use client";

import { useState } from "react";

type TicketFormValues = {
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
};

type Props = {
  initialValues?: Partial<TicketFormValues>;
  submitLabel: string;
  onSubmit: (values: TicketFormValues) => Promise<void> | void;
};

const defaultValues: TicketFormValues = {
  from: "",
  to: "",
  place: "",
  date: "",
  startTime: "",
  endTime: "",
  type: "Train",
  price: "",
  email: "",
  phone: "",
};

export default function TicketForm({ initialValues, submitLabel, onSubmit }: Props) {
  const [values, setValues] = useState<TicketFormValues>({ ...defaultValues, ...initialValues });
  const [loading, setLoading] = useState(false);

  const onChange = (key: keyof TicketFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await onSubmit(values);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem" }}>
      <input placeholder="From" value={values.from} onChange={(e) => onChange("from", e.target.value)} />
      <input placeholder="To" value={values.to} onChange={(e) => onChange("to", e.target.value)} />
      <input placeholder="Place" value={values.place} onChange={(e) => onChange("place", e.target.value)} />
      <input type="date" value={values.date} onChange={(e) => onChange("date", e.target.value)} />
      <input type="time" value={values.startTime} onChange={(e) => onChange("startTime", e.target.value)} />
      <input type="time" value={values.endTime} onChange={(e) => onChange("endTime", e.target.value)} />
      <select value={values.type} onChange={(e) => onChange("type", e.target.value)}>
        <option value="Train">Train</option>
        <option value="Bus">Bus</option>
        <option value="Movie">Movie</option>
      </select>
      <input placeholder="Price" value={values.price} onChange={(e) => onChange("price", e.target.value)} />
      <input placeholder="Email" value={values.email} onChange={(e) => onChange("email", e.target.value)} />
      <input placeholder="Phone" value={values.phone} onChange={(e) => onChange("phone", e.target.value)} />

      <button type="submit" disabled={loading}>
        {loading ? "Please wait..." : submitLabel}
      </button>
    </form>
  );
}

