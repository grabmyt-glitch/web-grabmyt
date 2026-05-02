"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname?.startsWith(path) ? "active" : "";

  return (
    <div className="settings-page">
      {/* SIDEBAR */}
      <div className="settings-sidebar">
        <div className="ss-logo">
          <em>⚡</em>LastPass
        </div>
        
        <div className="ss-group-label">Account</div>
        <Link href="/settings/profile" className={`ss-item ${isActive("/settings/profile")}`}>
          <span className="ss-icon">👤</span>Profile
        </Link>
        <Link href="/settings/security" className={`ss-item ${isActive("/settings/security")}`}>
          <span className="ss-icon">🔒</span>Security
        </Link>
        <Link href="/settings/notifications" className={`ss-item ${isActive("/settings/notifications")}`}>
          <span className="ss-icon">🔔</span>Notifications
        </Link>
        
        <div className="ss-divider"></div>
        
        <div className="ss-group-label">Billing</div>
        <Link href="/settings/monitoring" className={`ss-item ${isActive("/settings/monitoring")}`}>
          <span className="ss-icon">📊</span>Monitoring
        </Link>
        <Link href="/settings/billing" className={`ss-item ${isActive("/settings/billing")}`}>
          <span className="ss-icon">💳</span>Billing & Plan
        </Link>
        
        <div className="ss-divider"></div>
        
        <div className="ss-group-label">Danger Zone</div>
        <Link href="/settings/danger-zone" className={`ss-item danger ${isActive("/settings/danger-zone")}`}>
          <span className="ss-icon">⚠️</span>Danger Zone
        </Link>
      </div>
      
      {/* CONTENT */}
      {children}
    </div>
  );
}
