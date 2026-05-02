"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { userService } from "@/services/userService";

export default function ProfileSettingsPage() {
  const { user } = useAuth();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  
  const [showProfile, setShowProfile] = useState(true);
  const [allowDms, setAllowDms] = useState(true);
  const [antiScalping, setAntiScalping] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await userService.getUserData();
        if (data) {
          setFirstName(data.profile?.firstName || user?.name?.split(" ")[0] || "");
          setLastName(data.profile?.lastName || user?.name?.split(" ")[1] || "");
          setUsername(data.profile?.username || "");
          setPhone(data.profile?.phone || "");
          setDob(data.profile?.dob || "");
          setCity(data.profile?.city || "");
          setBio(data.profile?.bio || "");
          setShowProfile(data.profile?.showProfile ?? true);
          setAllowDms(data.profile?.allowDms ?? true);
          setAntiScalping(data.profile?.antiScalping ?? true);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // Use fallback values from auth context
        setFirstName(user?.name?.split(" ")[0] || "Arjun");
        setLastName(user?.name?.split(" ")[1] || "Kumar");
        setUsername("@arjunkumar_92");
        setPhone("+91 98XXXXXXXX");
        setDob("12 / 09 / 1992");
        setCity("Hyderabad, Telangana");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");
    try {
      await userService.updateProfile({
        firstName,
        lastName,
        username,
        phone,
        dob,
        city,
        bio,
        showProfile,
        allowDms,
        antiScalping,
      });
      setSaveMessage("✓ Profile saved successfully!");
    } catch (error) {
      console.error("Failed to save profile:", error);
      setSaveMessage("Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  return (
    <div className="settings-content">
      <div className="sc-header">
        <div className="sc-title">Profile Settings</div>
        <div className="sc-sub">Manage your personal information and public profile</div>
      </div>
      <div className="sc-body">
        {/* Avatar */}
        <div className="avatar-section">
          <div className="avatar-ring">{user?.avatar || "AK"}</div>
          <div className="avatar-info">
            <div className="av-name">{user?.name || "Arjun Kumar"}</div>
            <div className="av-email">{user?.email || "arjun@email.com"}</div>
            <div className="av-badge">✓ Verified Account</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
            <button className="av-change-btn">📷 Change Photo</button>
            <button className="av-change-btn" style={{ color: "var(--text3)", borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
              Remove
            </button>
          </div>
        </div>
        
        {/* Personal info */}
        <div className="settings-section">
          <div className="ss-sec-title">📋 Personal Information</div>
          <div className="s-row">
            <div className="s-field">
              <div className="s-label">First Name</div>
              <input type="text" className="settings-input filled" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className="s-field">
              <div className="s-label">Last Name</div>
              <input type="text" className="settings-input filled" value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
          </div>
          <div className="s-row">
            <div className="s-field">
              <div className="s-label">Username</div>
              <input type="text" className="settings-input filled" value={username} onChange={e => setUsername(e.target.value)} />
              <div className="s-hint">lastpass.in/u/{username.replace("@", "")}</div>
            </div>
            <div className="s-field">
              <div className="s-label">Phone Number</div>
              <input type="text" className="settings-input filled" value={phone} onChange={e => setPhone(e.target.value)} />
              <div className="s-hint">✓ Verified via OTP</div>
            </div>
          </div>
          <div className="s-row">
            <div className="s-field">
              <div className="s-label">Email Address</div>
              <input type="email" className="settings-input disabled" value={user?.email || "arjun@email.com"} disabled />
              <div className="s-hint">🔒 Cannot change verified email</div>
            </div>
            <div className="s-field">
              <div className="s-label">Date of Birth</div>
              <input type="text" className="settings-input filled" value={dob} onChange={e => setDob(e.target.value)} />
            </div>
          </div>
          <div className="s-field" style={{ marginBottom: "14px" }}>
            <div className="s-label">City / Location</div>
            <div className="settings-input" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "13px" }}>📍</span>
              <span style={{ color: "var(--text)", fontSize: "13px" }}>Hyderabad, Telangana</span>
            </div>
          </div>
          <div className="s-field" style={{ marginBottom: "18px" }}>
            <div className="s-label">Bio (optional)</div>
            <textarea 
              className="settings-input" 
              style={{ height: "68px", resize: "none" }}
              placeholder="Tell buyers/sellers about yourself…"
            ></textarea>
            <div className="s-hint">Max 160 characters · Shown on public profile</div>
          </div>
        </div>
        
        {/* Preferences */}
        <div className="settings-section">
          <div className="ss-sec-title">⚙️ Preferences</div>
          <div className="toggle-row">
            <div className="toggle-info">
              <div className="t-title">Show profile publicly</div>
              <div className="t-desc">Other users can see your rating and reviews</div>
            </div>
            <div className={`toggle ${showProfile ? "on" : "off"}`} onClick={() => setShowProfile(!showProfile)}>
              <div className="toggle-knob"></div>
            </div>
          </div>
          <div className="toggle-row">
            <div className="toggle-info">
              <div className="t-title">Allow direct messages</div>
              <div className="t-desc">Buyers and sellers can message you before transacting</div>
            </div>
            <div className={`toggle ${allowDms ? "on" : "off"}`} onClick={() => setAllowDms(!allowDms)}>
              <div className="toggle-knob"></div>
            </div>
          </div>
          <div className="toggle-row">
            <div className="toggle-info">
              <div className="t-title">Anti-scalping pledge</div>
              <div className="t-desc">You agree not to sell tickets above face value</div>
            </div>
            <div className={`toggle ${antiScalping ? "on" : "off"}`} onClick={() => setAntiScalping(!antiScalping)}>
              <div className="toggle-knob"></div>
            </div>
          </div>
        </div>
        
        {/* Save */}
        <div style={{ display: "flex", gap: "12px", paddingTop: "4px", alignItems: "center" }}>
          <button className="settings-save-btn" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "💾 Save Changes"}
          </button>
          <button className="settings-ghost-btn" onClick={() => window.location.reload()}>Discard</button>
          {saveMessage && (
            <span style={{ 
              marginLeft: "12px", 
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
