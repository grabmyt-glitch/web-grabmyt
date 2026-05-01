"use client";

import React, { useState } from "react";
import { userService } from "@/services/userService";

export default function SecuritySettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      setSaveMessage("❌ Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setSaveMessage("❌ Password must be at least 8 characters");
      return;
    }
    
    setIsSaving(true);
    setSaveMessage("");
    try {
      await userService.updatePassword({
        currentPassword,
        newPassword,
      });
      setSaveMessage("✓ Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Failed to update password:", error);
      setSaveMessage("Failed to update password. Please check your current password.");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  return (
    <div className="settings-content">
      <div className="sc-header">
        <div className="sc-title">Security Settings</div>
        <div className="sc-sub">Manage your password, two-factor authentication, and active sessions</div>
      </div>
      <div className="sc-body">

        {/* Change Password */}
        <div className="settings-section">
          <div className="ss-sec-title">🔑 Change Password</div>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "20px 22px" }}>
            <div className="s-field" style={{ marginBottom: "14px" }}>
              <div className="s-label">Current Password</div>
              <div className="settings-input filled" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "14px" }}>🔒</span>
                <input 
                  type="password" 
                  value={currentPassword} 
                  onChange={e => setCurrentPassword(e.target.value)} 
                  style={{ flex: 1, background: "transparent", border: "none", color: "var(--text)", outline: "none" }}
                  placeholder="••••••••••••"
                />
              </div>
            </div>
            <div className="s-row">
              <div className="s-field">
                <div className="s-label">New Password</div>
                <div className="settings-input focused" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "14px" }}>🔒</span>
                  <input 
                    type="password" 
                    value={newPassword} 
                    onChange={e => setNewPassword(e.target.value)} 
                    style={{ flex: 1, background: "transparent", border: "none", color: "var(--text)", outline: "none" }}
                    placeholder="••••••••••••"
                  />
                </div>
                {newPassword && (
                  <div className="pw-strength" style={{ marginTop: "6px" }}>
                    <div className="pw-bars" style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                      <div style={{ flex: 1, height: "3px", borderRadius: "3px", background: "var(--green)" }}></div>
                      <div style={{ flex: 1, height: "3px", borderRadius: "3px", background: "var(--green)" }}></div>
                      <div style={{ flex: 1, height: "3px", borderRadius: "3px", background: "var(--green)" }}></div>
                      <div style={{ flex: 1, height: "3px", borderRadius: "3px", background: "var(--green)" }}></div>
                    </div>
                    <div style={{ fontSize: "9px", color: "var(--green)" }}>Strong password ✓</div>
                  </div>
                )}
              </div>
              <div className="s-field">
                <div className="s-label">Confirm New Password</div>
                <div className="settings-input success" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "14px" }}>🔒</span>
                  <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} 
                    style={{ flex: 1, background: "transparent", border: "none", color: "var(--text)", outline: "none" }}
                    placeholder="••••••••••••"
                  />
                  {confirmPassword === newPassword && confirmPassword.length > 0 && (
                    <span style={{ fontSize: "14px", color: "#00C853" }}>✓</span>
                  )}
                </div>
                {confirmPassword === newPassword && confirmPassword.length > 0 && (
                  <div style={{ fontSize: "10px", color: "var(--green)", marginTop: "4px" }}>✓ Passwords match</div>
                )}
              </div>
            </div>
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", margin: "12px 0" }}>
              <div style={{ fontSize: "9px", padding: "3px 9px", borderRadius: "20px", background: "rgba(0,200,83,0.08)", border: "1px solid rgba(0,200,83,0.2)", color: "#00C853" }}>✓ 8+ characters</div>
              <div style={{ fontSize: "9px", padding: "3px 9px", borderRadius: "20px", background: "rgba(0,200,83,0.08)", border: "1px solid rgba(0,200,83,0.2)", color: "#00C853" }}>✓ Uppercase letter</div>
              <div style={{ fontSize: "9px", padding: "3px 9px", borderRadius: "20px", background: "rgba(0,200,83,0.08)", border: "1px solid rgba(0,200,83,0.2)", color: "#00C853" }}>✓ Number</div>
              <div style={{ fontSize: "9px", padding: "3px 9px", borderRadius: "20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text3)" }}>Different from last 3</div>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button 
                className="settings-save-btn" 
                style={{ width: "auto", fontSize: "13px", padding: "11px 20px" }}
                onClick={handlePasswordUpdate}
                disabled={isSaving}
              >
                {isSaving ? "Updating..." : "🔒 Update Password"}
              </button>
              <button className="settings-ghost-btn" onClick={() => { setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); }}>Cancel</button>
              {saveMessage && (
                <span style={{ 
                  fontSize: "12px", 
                  color: saveMessage.includes("❌") ? "#FF4D6A" : "#00C853" 
                }}>
                  {saveMessage}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 2FA */}
        <div className="settings-section">
          <div className="ss-sec-title">🛡 Two-Factor Authentication</div>
          <div className="sec-item">
            <div className="sec-item-icon" style={{ background: "rgba(0,200,83,0.1)" }}>📱</div>
            <div className="sec-item-info">
              <div className="sec-item-title">Authenticator App (TOTP)</div>
              <div className="sec-item-desc">Google Authenticator / Authy — most secure</div>
            </div>
            <div className="sec-item-status enabled">Enabled</div>
            <div className="sec-item-action" style={{ marginLeft: "12px" }}>Manage</div>
          </div>
          <div className="sec-item">
            <div className="sec-item-icon" style={{ background: "rgba(255,255,255,0.05)" }}>💬</div>
            <div className="sec-item-info">
              <div className="sec-item-title">SMS OTP</div>
              <div className="sec-item-desc">Sent to +91 98XXXXXXXX</div>
            </div>
            <div className="sec-item-status disabled-s">Disabled</div>
            <div className="sec-item-action" style={{ marginLeft: "12px" }}>Enable</div>
          </div>
          <div className="sec-item">
            <div className="sec-item-icon" style={{ background: "rgba(10,132,255,0.1)" }}>🔑</div>
            <div className="sec-item-info">
              <div className="sec-item-title">Passkey / Hardware Key</div>
              <div className="sec-item-desc">Use FIDO2 key or biometric passkey</div>
            </div>
            <div className="sec-item-status disabled-s">Not Set</div>
            <div className="sec-item-action" style={{ marginLeft: "12px" }}>Set Up</div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="settings-section">
          <div className="ss-sec-title">📱 Active Sessions</div>
          <div className="session-item">
            <div className="session-device">💻</div>
            <div className="session-info">
              <div className="session-name">Chrome on MacBook Pro</div>
              <div className="session-meta">Hyderabad, IN · Active now · IP 49.204.xx.xx</div>
            </div>
            <div className="session-current">This Device</div>
          </div>
          <div className="session-item">
            <div className="session-device">📱</div>
            <div className="session-info">
              <div className="session-name">LastPass App — iPhone 15 Pro</div>
              <div className="session-meta">Hyderabad, IN · 2 hours ago</div>
            </div>
            <div className="session-revoke">Revoke</div>
          </div>
          <div className="session-item">
            <div className="session-device">🖥</div>
            <div className="session-info">
              <div className="session-name">Firefox on Windows PC</div>
              <div className="session-meta">Mumbai, IN · 3 days ago</div>
            </div>
            <div className="session-revoke">Revoke</div>
          </div>
          <div style={{ marginTop: "12px" }}>
            <button className="danger-btn" style={{ fontSize: "11px" }}>🚫 Revoke All Other Sessions</button>
          </div>
        </div>

        {/* Login History */}
        <div className="settings-section">
          <div className="ss-sec-title">📋 Recent Login History</div>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "11px", color: "var(--text2)" }}>
              <span style={{ width: "100px", color: "var(--text3)" }}>Date</span>
              <span style={{ flex: 1, color: "var(--text3)" }}>Device / Location</span>
              <span>Status</span>
            </div>
            <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "11px" }}>
              <span style={{ width: "100px", color: "var(--text3)" }}>Apr 28, 14:32</span>
              <span style={{ flex: 1, color: "var(--text2)" }}>Chrome · Hyderabad</span>
              <span style={{ color: "#00C853", fontSize: "9px", fontWeight: "700" }}>✓ Success</span>
            </div>
            <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "11px" }}>
              <span style={{ width: "100px", color: "var(--text3)" }}>Apr 27, 09:11</span>
              <span style={{ flex: 1, color: "var(--text2)" }}>iPhone App · Hyderabad</span>
              <span style={{ color: "#00C853", fontSize: "9px", fontWeight: "700" }}>✓ Success</span>
            </div>
            <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: "10px", fontSize: "11px" }}>
              <span style={{ width: "100px", color: "var(--text3)" }}>Apr 25, 22:48</span>
              <span style={{ flex: 1, color: "var(--text2)" }}>Firefox · Mumbai</span>
              <span style={{ color: "#FF9500", fontSize: "9px", fontWeight: "700" }}>⚠ New Location</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
