"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { userService } from "@/services/userService";

export default function NotificationsSettingsPage() {
  const { user } = useAuth();
  
  const [requestReceived, setRequestReceived] = useState(true);
  const [requestStatus, setRequestStatus] = useState(true);
  const [priceDrops, setPriceDrops] = useState(false);
  const [urgencyAlerts, setUrgencyAlerts] = useState(true);
  
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [marketingNotifs, setMarketingNotifs] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Fetch notification settings on mount
  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        const data = await userService.getUserData();
        if (data?.notifications) {
          setRequestReceived(data.notifications.requestReceived ?? true);
          setRequestStatus(data.notifications.requestStatus ?? true);
          setPriceDrops(data.notifications.priceDrops ?? false);
          setUrgencyAlerts(data.notifications.urgencyAlerts ?? true);
          setEmailNotifs(data.notifications.emailNotifs ?? true);
          setSmsNotifs(data.notifications.smsNotifs ?? false);
          setPushNotifs(data.notifications.pushNotifs ?? true);
          setMarketingNotifs(data.notifications.marketingNotifs ?? false);
        }
      } catch (error) {
        console.error("Failed to fetch notification settings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotificationSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");
    try {
      await userService.updateNotifications({
        requestReceived,
        requestStatus,
        priceDrops,
        urgencyAlerts,
        emailNotifs,
        smsNotifs,
        pushNotifs,
        marketingNotifs,
      });
      setSaveMessage("✓ Notifications saved!");
    } catch (error) {
      console.error("Failed to save notifications:", error);
      setSaveMessage("Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  return (
    <div className="settings-content">
      <div className="sc-header">
        <div className="sc-title">Notifications</div>
        <div className="sc-sub">Choose what you hear about and how</div>
      </div>
      <div className="sc-body">
        
        <div className="settings-section">
          <div className="ss-sec-title">🎟 Ticket Alerts</div>
          <div className="toggle-row">
            <div className="toggle-info">
              <div className="t-title">Ticket request received</div>
              <div className="t-desc">Someone wants to buy your listing</div>
            </div>
            <div className={`toggle ${requestReceived ? "on" : "off"}`} onClick={() => setRequestReceived(!requestReceived)}>
              <div className="toggle-knob"></div>
            </div>
          </div>
          <div className="toggle-row">
            <div className="toggle-info">
              <div className="t-title">Request approved / rejected</div>
              <div className="t-desc">Updates on your buy requests</div>
            </div>
            <div className={`toggle ${requestStatus ? "on" : "off"}`} onClick={() => setRequestStatus(!requestStatus)}>
              <div className="toggle-knob"></div>
            </div>
          </div>
          <div className="toggle-row">
            <div className="toggle-info">
              <div className="t-title">Price drop alerts</div>
              <div className="t-desc">Notify when a watchlisted ticket drops in price</div>
            </div>
            <div className={`toggle ${priceDrops ? "on" : "off"}`} onClick={() => setPriceDrops(!priceDrops)}>
              <div className="toggle-knob"></div>
            </div>
          </div>
          <div className="toggle-row">
            <div className="toggle-info">
              <div className="t-title">Last-minute urgency alerts</div>
              <div className="t-desc">Tickets expiring within 30 minutes</div>
            </div>
            <div className={`toggle ${urgencyAlerts ? "on" : "off"}`} onClick={() => setUrgencyAlerts(!urgencyAlerts)}>
              <div className="toggle-knob"></div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="ss-sec-title">💬 Communication</div>
          <div className="toggle-row">
            <div className="toggle-info">
              <div className="t-title">Email notifications</div>
              <div className="t-desc">{user?.email || "arjun@email.com"}</div>
            </div>
            <div className={`toggle ${emailNotifs ? "on" : "off"}`} onClick={() => setEmailNotifs(!emailNotifs)}>
              <div className="toggle-knob"></div>
            </div>
          </div>
          <div className="toggle-row">
            <div className="toggle-info">
              <div className="t-title">SMS / WhatsApp alerts</div>
              <div className="t-desc">+91 98XXXXXXXX</div>
            </div>
            <div className={`toggle ${smsNotifs ? "on" : "off"}`} onClick={() => setSmsNotifs(!smsNotifs)}>
              <div className="toggle-knob"></div>
            </div>
          </div>
          <div className="toggle-row">
            <div className="toggle-info">
              <div className="t-title">Push notifications</div>
              <div className="t-desc">Browser and mobile app alerts</div>
            </div>
            <div className={`toggle ${pushNotifs ? "on" : "off"}`} onClick={() => setPushNotifs(!pushNotifs)}>
              <div className="toggle-knob"></div>
            </div>
          </div>
          <div className="toggle-row">
            <div className="toggle-info">
              <div className="t-title">Marketing & promotions</div>
              <div className="t-desc">Deals, tips, and platform updates</div>
            </div>
            <div className={`toggle ${marketingNotifs ? "on" : "off"}`} onClick={() => setMarketingNotifs(!marketingNotifs)}>
              <div className="toggle-knob"></div>
            </div>
          </div>
        </div>
        
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button className="settings-save-btn" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "💾 Save Preferences"}
          </button>
          {saveMessage && (
            <span style={{ 
              fontSize: "12px", 
              color: saveMessage.includes("Failed") ? "#FF4D6A" : "#00C853" 
            }}>
              {saveMessage}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
