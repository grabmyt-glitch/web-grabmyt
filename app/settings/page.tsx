"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearAuthState, deleteUserById, setCurrentUser, updateUserById } from "@/store/slices/authSlice";
import { deleteTicketById, fetchTickets } from "@/store/slices/ticketsSlice";
import { clearUserCookie } from "@/utils/authCookie";
import { getTicketId, normalizeTicketList } from "@/utils/tickets";

function getUserId(user: Record<string, unknown> | null): string {
  return String(user?._id ?? user?.id ?? user?.userId ?? "");
}

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const ticketsData = useAppSelector((state) => state.tickets.data);
  const [firstName, setFirstName] = useState(String(currentUser?.firstName ?? ""));
  const [lastName, setLastName] = useState(String(currentUser?.lastName ?? ""));
  const [email, setEmail] = useState(String(currentUser?.email ?? ""));
  const [phone, setPhone] = useState(String(currentUser?.phone ?? ""));
  const [dob, setDob] = useState(String(currentUser?.dob ?? ""));
  const [location, setLocation] = useState(String(currentUser?.location ?? ""));
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"about" | "myTickets">("about");

  useEffect(() => {
    void dispatch(fetchTickets());
  }, [dispatch]);

  const userId = getUserId(currentUser);
  const userEmail = String(currentUser?.email ?? "").toLowerCase();
  const userPhone = String(currentUser?.phone ?? "").toLowerCase();

  const myTickets = useMemo(() => {
    const all = normalizeTicketList(ticketsData);
    return all.filter((ticket) => {
      const info = (ticket.personalInformation as Record<string, unknown> | undefined) ?? {};
      const ticketEmail = String(info.email ?? ticket.email ?? "").toLowerCase();
      const ticketPhone = String(info.phone ?? ticket.phone ?? "").toLowerCase();
      return (userEmail && ticketEmail === userEmail) || (userPhone && ticketPhone === userPhone);
    });
  }, [ticketsData, userEmail, userPhone]);

  const handleUpdate = async () => {
    if (!currentUser || !userId) {
      setMessage("User session missing.");
      return;
    }

    try {
      const res = await dispatch(
        updateUserById({
          userId,
          payload: { firstName, lastName, email, phone, dob, location },
        }),
      ).unwrap();

      const updatedUser = { ...currentUser, firstName, lastName, email, phone, dob, location };
      dispatch(setCurrentUser(updatedUser));
      setMessage(res.message ?? "Profile updated.");
    } catch (error) {
      setMessage(typeof error === "string" ? error : "Failed to update profile.");
    }
  };

  const handleDeleteEverything = async () => {
    if (!currentUser || !userId) {
      setMessage("User session missing.");
      return;
    }

    const confirmed = window.confirm("Delete your account and all your tickets? This cannot be undone.");
    if (!confirmed) return;

    try {
      await dispatch(fetchTickets()).unwrap();
      for (const ticket of myTickets) {
        const id = getTicketId(ticket);
        if (!id) continue;
        await dispatch(deleteTicketById(id)).unwrap();
      }

      await dispatch(deleteUserById(userId)).unwrap();
      clearUserCookie();
      dispatch(setCurrentUser(null));
      dispatch(clearAuthState());
      setMessage("Account and tickets deleted.");
      router.push("/signup");
    } catch (error) {
      setMessage(typeof error === "string" ? error : "Failed to delete everything.");
    }
  };

  if (!currentUser) {
    return (
      <main style={{ padding: "1rem", maxWidth: "700px", margin: "0 auto" }}>
        <h1>Settings</h1>
        <p>Please login first.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "1rem", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Settings</h1>
      <p>Manage your account and your tickets from here.</p>

      <div style={{ display: "flex", gap: "0.5rem", margin: "1rem 0" }}>
        <button onClick={() => setActiveTab("about")} style={{ padding: "0.45rem 0.7rem" }}>
          About
        </button>
        <button onClick={() => setActiveTab("myTickets")} style={{ padding: "0.45rem 0.7rem" }}>
          My Tickets
        </button>
      </div>

      {activeTab === "about" && (
        <>
          <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "0.75rem", marginBottom: "0.85rem" }}>
            <p><strong>Email:</strong> {String(currentUser.email ?? "-")}</p>
            <p><strong>First Name:</strong> {String(currentUser.firstName ?? "-")}</p>
            <p><strong>Last Name:</strong> {String(currentUser.lastName ?? "-")}</p>
            <p><strong>Phone:</strong> {String(currentUser.phone ?? "-")}</p>
            <p><strong>DOB:</strong> {String(currentUser.dob ?? "-")}</p>
            <p><strong>Location:</strong> {String(currentUser.location ?? "-")}</p>
          </div>

          <div style={{ display: "grid", gap: "0.65rem", marginTop: "1rem" }}>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="DOB" />
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
            <button onClick={handleUpdate}>Update Profile</button>
          </div>

          <hr style={{ margin: "1rem 0" }} />
          <button onClick={handleDeleteEverything} style={{ color: "white", background: "crimson", padding: "0.5rem 0.75rem" }}>
            Delete Everything
          </button>
        </>
      )}

      {activeTab === "myTickets" && (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <p>
            <Link href="/tickets/create">Create Ticket</Link>
          </p>
          {myTickets.length === 0 ? (
            <p>No tickets found for your account.</p>
          ) : (
            myTickets.map((ticket) => {
              const id = getTicketId(ticket);
              return (
                <article key={id} style={{ border: "1px solid #ccc", padding: "0.75rem", borderRadius: "8px" }}>
                  <div><strong>{String(ticket.from ?? "-")}</strong> to <strong>{String(ticket.to ?? "-")}</strong></div>
                  <div>Place: {String(ticket.place ?? "-")} | Type: {String(ticket.type ?? "-")}</div>
                  <div>Price: {String(ticket.price ?? "-")}</div>
                  <p style={{ marginTop: "0.5rem" }}>
                    <Link href={`/tickets/${id}`}>Details</Link> | <Link href={`/tickets/${id}/edit`}>Edit</Link>
                  </p>
                </article>
              );
            })
          )}
        </div>
      )}

      {message && <p style={{ marginTop: "0.75rem" }}>{message}</p>}
    </main>
  );
}
