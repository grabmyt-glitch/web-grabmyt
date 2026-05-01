"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./forgot-password.module.scss";
import { API_ENDPOINTS } from "@/constants/api";

type Step = "email" | "sent" | "reset";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("arjun@email.com");
  const [timer, setTimer] = useState(58);
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Timer for resend
  useEffect(() => {
    if (step === "sent" && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const getPasswordStrength = (password: string) => {
    if (password.length < 4) return { level: 1, label: "Very weak" };
    if (password.length < 8) return { level: 2, label: "Weak" };
    if (password.length < 12) return { level: 3, label: "Medium" };
    return { level: 4, label: "Strong" };
  };

  const passwordStrength = getPasswordStrength(newPassword);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;

  const handleSendLink = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        setStep("sent");
      } else {
        setError(result.message || "Failed to send reset link");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    handleSendLink();
    setTimer(58);
  };

  const handleResetPassword = async () => {
    if (!passwordsMatch) return;
    setIsLoading(true);
    setError("");
    
    try {
      // In production, call reset password API with token
      setTimeout(() => {
        setIsLoading(false);
        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      setError("Failed to reset password. Please try again.");
      setIsLoading(false);
    }
  };

  // Step 1: Enter Email
  if (step === "email") {
    return (
      <div className={styles.authPage}>
        <div className={styles.authRight}>
          <div className={styles.formContainer}>
            <div className={styles.iconWrap}>
              <div className={styles.icon}>🔑</div>
            </div>
            <h2 className={styles.arH}>Forgot your password?</h2>
            <p className={styles.arSub}>
              Enter your email and we'll send you a reset link.
            </p>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email address</label>
              <div className={styles.formInput}>
                <div className={styles.fiIcon}>✉️</div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={styles.fiText}
                />
              </div>
            </div>

            <button
              className={styles.submitBtn}
              onClick={handleSendLink}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link →"}
            </button>

            <div className={styles.footerLink}>
              Remember it? <Link href="/login">Back to login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Email Sent
  if (step === "sent") {
    return (
      <div className={styles.authPage}>
        <div className={styles.authRight}>
          <div className={styles.formContainer}>
            <div className={styles.iconWrap}>
              <div className={styles.iconBlue}>📬</div>
            </div>
            <h2 className={styles.arH}>Check your inbox</h2>
            <p className={styles.arSub}>
              We sent a reset link to
              <br />
              <strong>{email}</strong>
              <br />
              <span className={styles.expiry}>Expires in 30 minutes</span>
            </p>

            <div className={styles.hintBox}>
              💡 Didn't get the email? Check your <strong>spam folder</strong> or try a different email address.
            </div>

            <button className={styles.submitBtnBlue}>
              Open Email App →
            </button>

            <div className={styles.resendLink}>
              {timer > 0 ? (
                <span>Resend in 0:{timer.toString().padStart(2, "0")}</span>
              ) : (
                <span onClick={handleResend}>Resend →</span>
              )}
              {" · "}
              <Link href="/login">Back to login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Reset Password
  return (
    <div className={styles.authPage}>
      <div className={styles.authRight}>
        <div className={styles.formContainer}>
          <div className={styles.iconWrap}>
            <div className={styles.iconGreen}>🔒</div>
          </div>
          <h2 className={styles.arH}>Set new password</h2>
          <p className={styles.arSub}>Must be different from your last password</p>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>New password</label>
            <div className={`${styles.formInput} ${newPassword ? styles.filled : ""}`}>
              <div className={styles.fiIcon}>🔒</div>
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Create a new password"
                className={styles.fiText}
              />
              <button
                type="button"
                className={styles.fiEye}
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </button>
            </div>
            {newPassword && (
              <div className={styles.pwStrength}>
                <div className={styles.pwBars}>
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`${styles.pwBar} ${
                        passwordStrength.level >= level
                          ? passwordStrength.level <= 1
                            ? styles.weak
                            : passwordStrength.level <= 2
                            ? styles.mid
                            : styles.strong
                          : styles.empty
                      }`}
                    />
                  ))}
                </div>
                <div className={`${styles.pwLbl} ${
                  passwordStrength.level <= 1 ? styles.weak : 
                  passwordStrength.level <= 2 ? styles.mid : styles.strong
                }`}>
                  {passwordStrength.label} {passwordStrength.level === 4 && "✓"}
                </div>
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Confirm password</label>
            <div className={`${styles.formInput} ${passwordsMatch ? styles.success : ""}`}>
              <div className={styles.fiIcon}>🔒</div>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className={styles.fiText}
              />
              {passwordsMatch && <div className={styles.fiCheck}>✓</div>}
            </div>
            {confirmPassword && !passwordsMatch && (
              <div className={styles.formError}>⚠️ Passwords do not match</div>
            )}
            {passwordsMatch && (
              <div className={styles.formSuccess}>✓ Passwords match</div>
            )}
          </div>

          <button
            className={styles.submitBtnGreen}
            onClick={handleResetPassword}
            disabled={isLoading || !passwordsMatch}
          >
            {isLoading ? "Resetting..." : "Reset Password ✓"}
          </button>
        </div>
      </div>
    </div>
  );
}