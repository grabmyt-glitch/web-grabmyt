"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { userService } from "@/services/userService";

export default function DangerZoneSettingsPage() {
  const router = useRouter();
  const { logout } = useAuth();
  
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleDeactivate = async () => {
    setIsProcessing(true);
    setError("");
    try {
      await userService.updateProfile({ isActive: false });
      alert("Account deactivated");
      logout();
    } catch (err) {
      console.error("Failed to deactivate:", err);
      setError("Failed to deactivate account. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (deleteConfirmText !== "DELETE") {
      setError("Please type DELETE to confirm");
      return;
    }
    setIsProcessing(true);
    setError("");
    try {
      await userService.updateProfile({ deleteAccount: true });
      alert("Account deleted forever");
      logout();
    } catch (err) {
      console.error("Failed to delete:", err);
      setError("Failed to delete account. Please check your password.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="settings-content">
      <div className="sc-header" style={{ borderBottomColor: "rgba(255,45,85,0.15)" }}>
        <div className="sc-title" style={{ color: "#FF4D6A" }}>⚠️ Danger Zone</div>
        <div className="sc-sub">These actions are permanent and cannot be undone. Please read carefully before proceeding.</div>
      </div>
      <div className="sc-body">

        {/* Warning Banner */}
        <div style={{ background: "rgba(255,45,85,0.06)", border: "1px solid rgba(255,45,85,0.15)", borderRadius: "12px", padding: "14px 18px", marginBottom: "24px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <span style={{ fontSize: "20px", flexShrink: 0 }}>🚨</span>
          <div>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#FF4D6A", marginBottom: "4px" }}>Proceed with extreme caution</div>
            <div style={{ fontSize: "11px", color: "var(--text3)", lineHeight: "1.7" }}>
              Actions in this section permanently affect your account. If you have active listings or pending payouts, please resolve them before proceeding. All actions require password confirmation.
            </div>
          </div>
        </div>

        {/* DEACTIVATE */}
        <div className="deactivate-card">
          <div className="deactivate-card-title">⏸ Deactivate Account</div>
          <div className="danger-card-desc">
            Temporarily disable your account. Your profile and listings will be hidden from other users. You can reactivate at any time by logging back in and confirming reactivation.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#CC7700" }}>
              <span>⚠</span> All active listings will be paused immediately
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#CC7700" }}>
              <span>⚠</span> Pending buyer requests will be auto-rejected
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#CC7700" }}>
              <span>⚠</span> Wallet balance will be preserved for 90 days
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#00C853" }}>
              <span>✓</span> Your data, reviews and history are retained
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#00C853" }}>
              <span>✓</span> You can reactivate anytime by logging in
            </div>
          </div>
          <button className="deactivate-btn" onClick={() => setShowDeactivateModal(true)}>⏸ Deactivate My Account</button>
        </div>

        {/* EXPORT DATA */}
        <div style={{ background: "rgba(10,132,255,0.04)", border: "1px solid rgba(10,132,255,0.15)", borderRadius: "14px", padding: "20px 22px", marginBottom: "14px" }}>
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "14px", fontWeight: "800", color: "#3FA8FF", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            📥 Export Your Data
          </div>
          <div className="danger-card-desc" style={{ marginBottom: "12px" }}>
            Download a full copy of your account data including transaction history, reviews, messages, and profile info. We'll email you a secure download link within 24 hours.
          </div>
          <button style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "10px", border: "1px solid rgba(10,132,255,0.3)", background: "rgba(10,132,255,0.08)", color: "#3FA8FF", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
            📥 Request Data Export
          </button>
        </div>

        {/* DELETE ACCOUNT */}
        <div className="danger-card">
          <div className="danger-card-title">🗑 Delete Account Permanently</div>
          <div className="danger-card-desc">
            This will permanently delete your account, all your data, transaction history, listings, reviews, and wallet balance. <strong style={{ color: "#FF4D6A" }}>This action cannot be undone.</strong> You will lose all your earnings history and cannot recover this account.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#FF4D6A" }}>
              <span>✗</span> All listings and data deleted permanently
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#FF4D6A" }}>
              <span>✗</span> Wallet balance will be forfeited if not withdrawn
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#FF4D6A" }}>
              <span>✗</span> Reviews received and given are removed
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#FF4D6A" }}>
              <span>✗</span> You cannot recover this account afterwards
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#FF9500" }}>
              <span>→</span> Withdraw your balance before deleting
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button className="danger-btn" onClick={() => setShowDeleteModal(true)}>🗑 Delete My Account</button>
            <div style={{ fontSize: "11px", color: "var(--text3)" }}>You'll be asked to confirm with your password</div>
          </div>
        </div>

      </div>

      {/* MODALS */}
      
      {/* Deactivate Modal */}
      {showDeactivateModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon" style={{ background: "rgba(255,149,0,0.1)", border: "1px solid rgba(255,149,0,0.2)" }}>⏸</div>
            <div className="modal-title">Deactivate Account?</div>
            <div className="modal-desc">Your account and listings will be hidden. You can reactivate anytime by logging in.</div>
            <div className="modal-warn-list" style={{ background: "rgba(255,149,0,0.06)", borderColor: "rgba(255,149,0,0.12)" }}>
              <div className="modal-warn-item" style={{ color: "#CC8800" }}>⚠ 2 active listings will be paused</div>
              <div className="modal-warn-item" style={{ color: "#CC8800" }}>⚠ 1 pending payout will be held in wallet</div>
              <div className="modal-warn-item" style={{ color: "#CC8800" }}>⚠ Your Pro subscription will be suspended</div>
            </div>
            <div style={{ fontSize: "11px", color: "var(--text3)", textAlign: "center", marginBottom: "10px" }}>Enter your password to confirm</div>
            <input 
              type="password"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              className="modal-confirm-input" 
              style={{ borderColor: "rgba(255,149,0,0.3)" }} 
              placeholder="••••••••••" 
            />
            <div className="modal-btn-row">
              <button className="modal-cancel" onClick={() => setShowDeactivateModal(false)}>Keep Active</button>
              <button className="modal-confirm-amber" onClick={handleDeactivate}>⏸ Deactivate</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ maxWidth: "380px" }}>
            <div className="modal-icon" style={{ background: "rgba(255,45,85,0.1)", border: "1px solid rgba(255,45,85,0.25)" }}>🗑</div>
            <div className="modal-title" style={{ color: "#FF4D6A" }}>Delete Account</div>
            <div className="modal-desc">This is permanent and cannot be undone. All your data will be erased forever.</div>
            <div className="modal-warn-list">
              <div className="modal-warn-item">✗ Wallet balance of ₹8,340 will be forfeited</div>
              <div className="modal-warn-item">✗ 18 sold ticket records deleted</div>
              <div className="modal-warn-item">✗ 34 reviews removed permanently</div>
              <div className="modal-warn-item">✗ Username cannot be reclaimed</div>
            </div>
            <div style={{ fontSize: "11px", color: "var(--text3)", textAlign: "center", marginBottom: "8px" }}>
              Type <strong style={{ color: "var(--text)", fontFamily: "monospace" }}>DELETE</strong> to confirm
            </div>
            <input 
              type="text"
              value={deleteConfirmText}
              onChange={e => setDeleteConfirmText(e.target.value)}
              className="modal-confirm-input" 
              placeholder="DELETE" 
            />
            <div style={{ fontSize: "11px", color: "var(--text3)", textAlign: "center", marginBottom: "8px" }}>Enter your password</div>
            <input 
              type="password"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              className="modal-confirm-input" 
              placeholder="••••••••••••" 
            />
            <div className="modal-btn-row">
              <button className="modal-cancel" onClick={() => setShowDeleteModal(false)}>Keep Account</button>
              <button className="modal-confirm-red" onClick={handleDelete} disabled={deleteConfirmText !== "DELETE"}>🗑 Delete Forever</button>
            </div>
            <div style={{ textAlign: "center", marginTop: "12px", fontSize: "10px", color: "var(--text3)" }}>
              First withdraw your balance before deleting.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
