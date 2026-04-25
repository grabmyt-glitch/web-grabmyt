import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../src/index.scss";
import "../src/Global.scss";
import "../src/App.scss";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Grab My Ticket",
  description: "Last-minute ticket marketplace for buyers and sellers.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
