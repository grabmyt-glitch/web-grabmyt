"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../src/components/Navbar";

export default function Providers({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const pathname = usePathname();

  // Check if current route is an auth page
  const isAuthPage = pathname?.startsWith("/login") || 
                     pathname?.startsWith("/signup") || 
                     pathname?.startsWith("/verify-email") || 
                     pathname?.startsWith("/forgot-password") ||
                     pathname?.startsWith("/welcome");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    setTheme(savedTheme === "light" ? "light" : "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light-theme", theme === "light");
    document.documentElement.classList.toggle("dark-theme", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <>
      {!isAuthPage && <Navbar theme={theme} toggleTheme={toggleTheme} />}
      <div className="app-shell">{children}</div>
    </>
  );
}
