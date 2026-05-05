"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../src/components/Navbar";
import ReduxProvider from "@/store/ReduxProvider";
import AuthBootstrap from "@/store/AuthBootstrap";
import { AuthProvider } from "@/context/AuthContext";

export default function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Check if current route is an auth page
  const isAuthPage = pathname?.startsWith("/login") || 
                     pathname?.startsWith("/signup") || 
                     pathname?.startsWith("/verify-email") || 
                     pathname?.startsWith("/forgot-password") ||
                     pathname?.startsWith("/welcome");

  return (
    <ReduxProvider>
      <AuthProvider>
        <AuthBootstrap />
        {!isAuthPage && <Navbar />}
        <div className="app-shell">{children}</div>
      </AuthProvider>
    </ReduxProvider>
  );
}
