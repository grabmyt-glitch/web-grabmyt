"use client";

import React, { useState, useEffect } from "react";
import { userService } from "@/services/userService";

export default function MonitoringSettingsPage() {
  const [stats, setStats] = useState({
    totalEarnings: "₹14,850",
    ticketsSold: "18",
    avgRating: "4.9",
    avgSellTime: "11 min",
    ticketsBought: "7",
    spentTotal: "₹6,200",
    activeListings: "3",
    pendingRequests: "2",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await userService.getUserData();
        if (data?.monitoring) {
          setStats(data.monitoring);
        }
      } catch (error) {
        console.error("Failed to fetch monitoring data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="settings-content">
      <div className="sc-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div className="sc-title">Activity Monitoring</div>
          <div className="sc-sub"><span className="live-dot"></span> Live — last updated just now</div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button style={{ fontSize: "11px", padding: "6px 14px", borderRadius: "8px", background: "rgba(255,69,0,0.1)", border: "1px solid rgba(255,69,0,0.2)", color: "#FF6830", cursor: "pointer" }}>📅 This Month</button>
          <button style={{ fontSize: "11px", padding: "6px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text3)", cursor: "pointer" }}>Export CSV</button>
        </div>
      </div>
      <div className="sc-body">
        {/* Stats */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">💰 Total Earnings</div>
            <div className="stat-val">{stats.totalEarnings}</div>
            <div className="stat-change up">↑ 23% vs last month</div>
            <div className="bar-chart">
              <div className="bar" style={{ height: "30%" }}></div>
              <div className="bar" style={{ height: "50%" }}></div>
              <div className="bar" style={{ height: "40%" }}></div>
              <div className="bar" style={{ height: "70%" }}></div>
              <div className="bar" style={{ height: "60%" }}></div>
              <div className="bar" style={{ height: "80%" }}></div>
              <div className="bar hi" style={{ height: "100%" }}></div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">🎟 Tickets Sold</div>
            <div className="stat-val">{stats.ticketsSold}</div>
            <div className="stat-change up">↑ 6 more than last month</div>
            <div className="bar-chart">
              <div className="bar" style={{ height: "20%" }}></div>
              <div className="bar" style={{ height: "40%" }}></div>
              <div className="bar" style={{ height: "55%" }}></div>
              <div className="bar" style={{ height: "45%" }}></div>
              <div className="bar" style={{ height: "75%" }}></div>
              <div className="bar" style={{ height: "65%" }}></div>
              <div className="bar hi" style={{ height: "100%" }}></div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">⭐ Avg Rating</div>
            <div className="stat-val">{stats.avgRating}</div>
            <div className="stat-change neutral">Based on 34 reviews</div>
            <div style={{ display: "flex", gap: "3px", marginTop: "10px" }}>
              <span style={{ fontSize: "16px", color: "#FF9500" }}>★</span>
              <span style={{ fontSize: "16px", color: "#FF9500" }}>★</span>
              <span style={{ fontSize: "16px", color: "#FF9500" }}>★</span>
              <span style={{ fontSize: "16px", color: "#FF9500" }}>★</span>
              <span style={{ fontSize: "16px", color: "#FF9500" }}>★</span>
            </div>
          </div>
        </div>
        
        <div className="stat-grid" style={{ marginBottom: "22px" }}>
          <div className="stat-card">
            <div className="stat-label">⏱ Avg Sell Time</div>
            <div className="stat-val">{stats.avgSellTime}</div>
            <div className="stat-change up">↑ Faster than avg (18min)</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">🛒 Tickets Bought</div>
            <div className="stat-val">{stats.ticketsBought}</div>
            <div className="stat-change down">{stats.spentTotal} spent total</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">📋 Active Listings</div>
            <div className="stat-val">{stats.activeListings}</div>
            <div className="stat-change neutral">{stats.pendingRequests} pending requests</div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="ss-sec-title">🧾 Recent Transactions</div>
        <div className="txn-row">
          <div className="txn-icon" style={{ background: "rgba(0,200,83,0.1)" }}>🎬</div>
          <div className="txn-info">
            <div className="txn-title">Dune: Part Two (4DX) — PVR Banjara Hills</div>
            <div className="txn-meta">Sold · Apr 22, 2026 · 2 seats · Buyer: Rohit M.</div>
          </div>
          <div>
            <div className="txn-amt credit">+₹900</div>
            <div className="txn-status done">Settled</div>
          </div>
        </div>
        <div className="txn-row">
          <div className="txn-icon" style={{ background: "rgba(10,132,255,0.1)" }}>🎭</div>
          <div className="txn-info">
            <div className="txn-title">Arijit Singh Live — Hyderabad</div>
            <div className="txn-meta">Bought · Apr 19, 2026 · 1 seat · Seller: Priya S.</div>
          </div>
          <div>
            <div className="txn-amt debit">−₹2,200</div>
            <div className="txn-status done">Settled</div>
          </div>
        </div>
        <div className="txn-row">
          <div className="txn-icon" style={{ background: "rgba(255,69,0,0.1)" }}>⚽</div>
          <div className="txn-info">
            <div className="txn-title">IPL: SRH vs MI — Uppal Stadium</div>
            <div className="txn-meta">Sold · Apr 18, 2026 · 1 seat · Buyer: Kavya R.</div>
          </div>
          <div>
            <div className="txn-amt credit">+₹1,450</div>
            <div className="txn-status pend">Pending</div>
          </div>
        </div>
        <div className="txn-row">
          <div className="txn-icon" style={{ background: "rgba(255,45,85,0.1)" }}>🎵</div>
          <div className="txn-info">
            <div className="txn-title">NH7 Weekender — Pune</div>
            <div className="txn-meta">Sold · Apr 15, 2026 · 3 seats · Buyer: Ankit V.</div>
          </div>
          <div>
            <div className="txn-amt credit">+₹3,600</div>
            <div className="txn-status fail">Cancelled</div>
          </div>
        </div>

        {/* Withdrawal / Wallet */}
        <div style={{ marginTop: "20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <div>
              <div style={{ fontSize: "11px", color: "var(--text3)", marginBottom: "3px" }}>💼 Wallet Balance</div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "28px", fontWeight: "800", color: "#FF4500" }}>₹8,340</div>
              <div style={{ fontSize: "10px", color: "var(--text3)" }}>Available for withdrawal</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
              <button className="settings-save-btn" style={{ width: "auto", fontSize: "13px", padding: "11px 20px", marginBottom: "0" }}>🏦 Withdraw to Bank</button>
              <div style={{ fontSize: "10px", color: "var(--text3)" }}>HDFC ••••4821 · Instant transfer</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1, background: "rgba(0,200,83,0.06)", border: "1px solid rgba(0,200,83,0.12)", borderRadius: "10px", padding: "12px", textAlign: "center" }}>
              <div style={{ fontSize: "10px", color: "var(--text3)", marginBottom: "3px" }}>Total Earned</div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "16px", fontWeight: "800", color: "#00C853" }}>₹42,150</div>
            </div>
            <div style={{ flex: 1, background: "rgba(255,45,85,0.06)", border: "1px solid rgba(255,45,85,0.12)", borderRadius: "10px", padding: "12px", textAlign: "center" }}>
              <div style={{ fontSize: "10px", color: "var(--text3)", marginBottom: "3px" }}>Total Spent</div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "16px", fontWeight: "800", color: "#FF4D6A" }}>₹18,400</div>
            </div>
            <div style={{ flex: 1, background: "rgba(255,149,0,0.06)", border: "1px solid rgba(255,149,0,0.12)", borderRadius: "10px", padding: "12px", textAlign: "center" }}>
              <div style={{ fontSize: "10px", color: "var(--text3)", marginBottom: "3px" }}>Platform Fee</div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "16px", fontWeight: "800", color: "#FF9500" }}>₹2,107</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
