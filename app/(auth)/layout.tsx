"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Hide header on auth pages
  const isAuthPage = pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/verify-email") ||
    pathname?.startsWith("/forgot-password") ||
    pathname?.startsWith("/welcome");

  return (
    <div className="auth-layout" data-auth-page={isAuthPage}>
      {children}
    </div>
  );
}