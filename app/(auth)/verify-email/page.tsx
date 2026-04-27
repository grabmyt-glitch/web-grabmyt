"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./verify-email.module.scss";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(543); // 8:43 in seconds
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `⏱ ${mins}:${secs.toString().padStart(2, "0")} remaining`;
  };

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0];
    }
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("").concat(Array(6).fill("")).slice(0, 6);
    setOtp(newOtp);

    const lastFilledIndex = pastedData.length - 1;
    if (lastFilledIndex < 5) {
      inputRefs.current[lastFilledIndex + 1]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);

    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      if (otpString === "999999") {
        setError("Incorrect code — please try again");
      } else {
        setIsVerified(true);
        router.push("/welcome");
      }
    }, 1500);
  };

  const handleResend = () => {
    setTimer(543);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const allFilled = otp.every((digit) => digit !== "");

  if (isVerified) {
    return (
      <div className={styles.authPage}>
        <div className={styles.authLeft}>
          <div className={styles.alLogo}>
            <em>⚡</em>LastPass
          </div>
          <div className={styles.alBody}>
            <div className={styles.alTagSuccess}>✓ Verified</div>
            <h1 className={styles.alH}>
              You're all
              <br />
              set, <em style={{ color: "#00C853" }}>Arjun!</em>
            </h1>
            <p className={styles.alSub}>
              Your account is verified and ready. Start browsing last-minute deals or list your first ticket.
            </p>

            <div className={styles.progressSteps}>
              <div className={styles.stepItem}>
                <div className={styles.stepCircleDone}>✓</div>
                <div className={styles.stepLabelDone}>Your details</div>
              </div>
              <div className={styles.stepItem}>
                <div className={styles.stepCircleDone}>✓</div>
                <div className={styles.stepLabelDone}>Email verified</div>
              </div>
              <div className={styles.stepItem}>
                <div className={styles.stepCircle}>3</div>
                <div className={styles.stepLabel}>You're in! 🎉</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.authRight}>
          <div className={styles.formContainer}>
            <div className={styles.successWrap}>
              <div className={styles.successRing}>🎉</div>
              <h2 className={styles.successH}>Email Verified!</h2>
              <p className={styles.successSub}>
                Welcome to LastPass, Arjun!
                <br />
                Your account is ready to use.
              </p>

              <div className={styles.quickActions}>
                <div className={styles.actionCard}>
                  <div className={styles.actionIcon}>🔍</div>
                  <div className={styles.actionTitle}>Browse Deals</div>
                  <div className={styles.actionSub}>Find last-minute tickets</div>
                </div>
                <div className={styles.actionCardBlue}>
                  <div className={styles.actionIcon}>💸</div>
                  <div className={styles.actionTitle}>List a Ticket</div>
                  <div className={styles.actionSub}>Sell yours instantly</div>
                </div>
              </div>

              <button className={styles.submitBtn} onClick={() => router.push("/")}>
                🎟 Go to My Dashboard →
              </button>
              <div className={styles.footerLink}>
                or <span>complete your profile</span> for better trust scores
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authPage}>
      {/* Left Panel - Brand Side */}
      <div className={styles.authLeft}>
        <div className={styles.alLogo}>
          <em>⚡</em>LastPass
        </div>
        <div className={styles.alBody}>
          <div className={styles.alTag}>📧 Almost there!</div>
          <h1 className={styles.alH}>
            Verify your
            <br />
            email to
            <br />
            <em>get started</em>
          </h1>
          <p className={styles.alSub}>
            We sent a 6-digit code to your inbox. It expires in 10 minutes.
          </p>

          {/* Progress Steps */}
          <div className={styles.progressSteps}>
            <div className={styles.stepItem}>
              <div className={styles.stepCircleDone}>✓</div>
              <div className={styles.stepLabelDone}>Your details</div>
              <div className={styles.stepStatusDone}>Done ✓</div>
            </div>
            <div className={styles.stepItem}>
              <div className={styles.stepCircle}>2</div>
              <div className={styles.stepLabel}>Verify email</div>
              <div className={styles.stepStatus}>Current</div>
            </div>
            <div className={`${styles.stepItem} ${styles.pending}`}>
              <div className={styles.stepCircle}>3</div>
              <div className={styles.stepLabel}>You're in!</div>
            </div>
          </div>

          {/* Email Preview Card */}
          <div className={styles.emailPreview}>
            <div className={styles.emailPreviewHeader}>
              <span>📬</span>
              <div>noreply@lastpass.in → arjun@email.com</div>
            </div>
            <div className={styles.emailPreviewSub}>Subject: Your LastPass verification code</div>
            <div className={styles.emailPreviewCode}>
              <div className={styles.codeDigits}>847 291</div>
              <div className={styles.codeExpiry}>Expires in 10 minutes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form Side */}
      <div className={styles.authRight}>
        <div className={styles.formContainer}>
          <div className={styles.emailIconWrap}>
            <div className={styles.emailIcon}>📧</div>
          </div>

          <h2 className={styles.arH}>Check your inbox</h2>
          <p className={styles.arSub}>
            We sent a 6-digit code to
            <br />
            <strong>arjun@email.com</strong>
          </p>

          {/* OTP Input */}
          <div className={styles.otpRow} onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`${styles.otpBox} ${
                  digit ? styles.filled : ""
                } ${index === otp.findIndex((d) => d === "") && !digit ? styles.active : ""} ${
                  error && allFilled ? styles.error : ""
                }`}
              />
            ))}
          </div>

          {error && <div className={styles.otpError}>{error}</div>}

          <div className={styles.otpTimer}>{formatTime(timer)}</div>
          <div className={styles.otpHint}>Enter the 6-digit code from your email</div>

          <button
            className={styles.submitBtnBlue}
            onClick={handleVerify}
            disabled={isLoading || !allFilled}
          >
            {isLoading ? "Verifying..." : "Verify Email →"}
          </button>

          <div className={styles.otpResend}>
            Didn't get the code? <span onClick={handleResend}>Resend →</span>
          </div>

          <div className={styles.footerLink}>
            Wrong email? <span>Change it</span>
          </div>
        </div>
      </div>
    </div>
  );
}