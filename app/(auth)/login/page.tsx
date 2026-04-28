"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./login.module.scss";
import { API_ENDPOINTS } from "@/constants/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.SIGNIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.success) {
        // Success logic
        console.log("Login successful:", result.data);
        // Redirect or store token as needed
        alert(result.message);
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      {/* Left Panel - Brand Side */}
      <div className={styles.authLeft}>
        <div className={styles.alLogo}>
          <em>⚡</em>LastPass
        </div>
        <div className={styles.alBody}>
          <div className={styles.alTag}>🎟 Last-Minute Deals</div>
          <h1 className={styles.alH}>
            Welcome
            <br />
            back to
            <br />
            <em>LastPass</em>
          </h1>
          <p className={styles.alSub}>
            Log in to browse live last-minute tickets or manage your listings.
          </p>

          {/* Ticket Preview Card */}
          <div className={styles.alCard}>
            <div className={styles.alcRow1}>
              <div className={styles.alcRoute}>🎬 Dune: Part Two (4DX)</div>
              <div className={`${styles.alcBadge} ${styles.critical}`}>🔥 CRITICAL</div>
            </div>
            <div className={styles.alcProg}>
              <div className={styles.alcProgFill} style={{ width: "86%" }}></div>
            </div>
            <div className={styles.alcRow2}>
              <div>
                <div className={styles.alcPrice}>₹450</div>
                <div className={styles.alcMeta}>⏱ 19 mins · 👁 9 viewing</div>
              </div>
              <div className={styles.alcReq}>📨 Request</div>
            </div>
          </div>

          {/* Stats */}
          <div className={styles.alStats}>
            <div className={styles.als}>
              <div className={styles.alsNum}>48K+</div>
              <div className={styles.alsLbl}>Tickets resold</div>
            </div>
            <div className={styles.als}>
              <div className={styles.alsNum}>96%</div>
              <div className={styles.alsLbl}>Sell in 30min</div>
            </div>
            <div className={styles.als}>
              <div className={styles.alsNum}>4.9★</div>
              <div className={styles.alsLbl}>Avg rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form Side */}
      <div className={styles.authRight}>
        <div className={styles.formContainer}>
          <div className={styles.arTop}>
            <div className={styles.arEyebrow}>WELCOME BACK</div>
            <h2 className={styles.arH}>Log in to your account</h2>
            <p className={styles.arSub}>
              Don't have an account? <Link href="/signup">Sign up free →</Link>
            </p>
          </div>

          {/* Social Login */}
          <div className={styles.socialRow}>
            <button type="button" className={styles.socialBtn}>
              🌐 Google
            </button>
            <button type="button" className={styles.socialBtn}>
              📱 Phone
            </button>
          </div>

          <div className={styles.orDiv}>
            <div className={styles.orLine}></div>
            <div className={styles.orText}>or continue with email</div>
            <div className={styles.orLine}></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {error && (
              <div className={styles.errorAlert}>
                <span>⚠️</span>
                <div>{error}</div>
              </div>
            )}

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email address</label>
              <div className={`${styles.formInput} ${email ? styles.filled : ""}`}>
                <div className={styles.fiIcon}>✉️</div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={styles.fiText}
                />
                {email && <div className={styles.fiCheck}>✓</div>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Password</label>
              <div className={`${styles.formInput} ${password ? styles.filled : ""}`}>
                <div className={styles.fiIcon}>🔒</div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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
            </div>

            <Link href="/forgot-password" className={styles.formForgot}>
              Forgot password?
            </Link>

            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In →"}
            </button>
          </form>

          <div className={styles.arFooter}>
            New to LastPass? <Link href="/signup">Create account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}