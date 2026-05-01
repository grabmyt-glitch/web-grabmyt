"use client";

import React, { useState, useEffect } from "react";
import { userService } from "@/services/userService";

export default function BillingSettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [planData, setPlanData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<any>(null);

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const data = await userService.getUserData();
        if (data?.billing) {
          setPlanData(data.billing.plan);
          setPaymentMethod(data.billing.paymentMethod);
        }
      } catch (error) {
        console.error("Failed to fetch billing data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBillingData();
  }, []);

  // Fallback data when API is not available
  const currentPlan = planData || {
    name: "Pro Seller",
    price: "₹299",
    period: "/month",
    features: [
      "✓ Unlimited listings per month",
      "✓ 4% platform fee (vs 8% free)",
      "✓ Priority buyer matching",
      "✓ Instant bank transfers",
      "✓ Advanced analytics access",
    ],
    renewsOn: "May 24, 2026",
    autoPayFrom: "HDFC ••••4821",
  };

  const card = paymentMethod || {
    type: "VISA",
    number: "•••• •••• •••• 4821",
    expires: "08/27",
    bank: "HDFC Bank",
  };

  return (
    <div className="settings-content">
      <div className="sc-header">
        <div className="sc-title">Billing & Plan</div>
        <div className="sc-sub">Manage your subscription and payment methods</div>
      </div>
      <div className="sc-body">
        {/* Current plan */}
        <div className="ss-sec-title" style={{ marginBottom: "12px" }}>⚡ Current Plan</div>
        <div className="plan-card plan-active">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
            <div>
              <div className="plan-name">{currentPlan.name}</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "rgba(255,69,0,0.1)", border: "1px solid rgba(255,69,0,0.2)", borderRadius: "20px", padding: "2px 9px", fontSize: "9px", fontWeight: "700", color: "#FF6830", marginTop: "4px" }}>
                ✓ Active Plan
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="plan-price">{currentPlan.price}</div>
              <div className="plan-period">{currentPlan.period}</div>
            </div>
          </div>
          <div className="plan-feat">
            {currentPlan.features?.map((feature: string, index: number) => (
              <div key={index} className="plan-feat-item">{feature}</div>
            ))}
          </div>
          <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "11px", color: "var(--text3)" }}>
            Renews on <strong style={{ color: "var(--text2)" }}>May 24, 2026</strong> · Auto-pay from HDFC ••••4821
          </div>
        </div>
        
        {/* Free plan */}
        <div className="plan-card" style={{ opacity: 0.6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <div className="plan-name" style={{ fontSize: "13px" }}>Free</div>
            <div><span className="plan-price" style={{ fontSize: "18px" }}>₹0</span><span className="plan-period">/month</span></div>
          </div>
          <div style={{ fontSize: "11px", color: "var(--text3)" }}>5 listings/month · 8% fee · Standard transfer</div>
        </div>

        {/* Payment Method */}
        <div className="ss-sec-title" style={{ marginTop: "24px" }}>💳 Payment Method</div>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "14px 16px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "42px", height: "28px", borderRadius: "6px", background: "#1A1AFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "800", color: "#fff" }}>
            {card.type}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "13px", color: "var(--text)", fontWeight: "500" }}>{card.number}</div>
            <div style={{ fontSize: "10px", color: "var(--text3)" }}>Expires {card.expires} · {card.bank}</div>
          </div>
          <div style={{ fontSize: "10px", fontWeight: "700", background: "rgba(0,200,83,0.1)", color: "#00C853", padding: "3px 9px", borderRadius: "20px" }}>Primary</div>
        </div>
        <div style={{ fontSize: "12px", color: "var(--orange)", fontWeight: "600", cursor: "pointer", marginBottom: "20px" }}>
          + Add payment method
        </div>

        {/* Billing history link */}
        <button className="settings-ghost-btn" style={{ width: "100%", padding: "12px 0", marginTop: "12px", color: "#FF4D6A", borderColor: "rgba(255,45,85,0.3)" }}>Cancel Subscription</button>
        <div style={{ textAlign: "center", fontSize: "11px", color: "var(--text3)", marginTop: "10px" }}>You'll keep Pro access until {currentPlan.renewsOn}</div>
      </div>
    </div>
  );
}
