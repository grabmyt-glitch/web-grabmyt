"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyTicketsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/settings");
  }, [router]);

  return (
    <main style={{ padding: "1rem", maxWidth: "700px", margin: "0 auto" }}>
      <h1>My Tickets</h1>
      <p>Redirecting to Settings → My Tickets...</p>
    </main>
  );
}
