"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./signup.module.scss";
import { API_ENDPOINTS } from "@/constants/api";

type Role = "buyer" | "seller" | "both";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("buyer");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const getPasswordStrength = (password: string) => {
    if (password.length < 4) return { level: 1, label: "Very weak" };
    if (password.length < 8) return { level: 2, label: "Weak" };
    if (password.length < 12) return { level: 3, label: "Medium" };
    return { level: 4, label: "Strong" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email address";
    }

    if (formData.phone.length < 10) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (formData.password.length < 8) {
      newErrors.password = "At least 8 characters required";
    }

    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.SIGNUP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Signup successful:", result.data);
        // Pass email to verification page
        router.push(`/verify-email?email=${encodeURIComponent(formData.email)}&firstName=${encodeURIComponent(formData.firstName)}`);
      } else {
        setErrors({ server: result.message || "Signup failed" });
      }
    } catch (err) {
      setErrors({ server: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
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
          <div className={styles.alTag}>🚀 Join Free Today</div>
          <h1 className={styles.alH}>
            Stop losing
            <br />
            money on
            <br />
            <em>cancelled</em>
            <br />
            tickets.
          </h1>
          <p className={styles.alSub}>
            List your ticket in 60 seconds and recover money you'd otherwise lose to cancellation penalties.
          </p>

          {/* Progress Steps */}
          <div className={styles.progressSteps}>
            <div className={styles.stepItem}>
              <div className={styles.stepCircle}>1</div>
              <div className={styles.stepLabel}>Your details</div>
              <div className={styles.stepStatus}>Current</div>
            </div>
            <div className={`${styles.stepItem} ${styles.pending}`}>
              <div className={styles.stepCircle}>2</div>
              <div className={styles.stepLabel}>Verify email</div>
            </div>
            <div className={`${styles.stepItem} ${styles.pending}`}>
              <div className={styles.stepCircle}>3</div>
              <div className={styles.stepLabel}>You're in!</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form Side */}
      <div className={styles.authRight}>
        <div className={styles.formContainer}>
          <div className={styles.arTop}>
            <div className={styles.arEyebrow}>STEP 1 OF 3</div>
            <h2 className={styles.arH}>Create your account</h2>
            <p className={styles.arSub}>
              Already have an account? <Link href="/login">Log in →</Link>
            </p>
          </div>

          {/* Role Selector */}
          <div className={styles.roleLabel}>I want to…</div>
          <div className={styles.roleSelector}>
            <button
              type="button"
              className={`${styles.roleBtn} ${role === "buyer" ? styles.sel : ""}`}
              onClick={() => setRole("buyer")}
            >
              🎟 Buy Tickets
            </button>
            <button
              type="button"
              className={`${styles.roleBtn} ${role === "seller" ? styles.sel : ""}`}
              onClick={() => setRole("seller")}
            >
              💸 Sell Tickets
            </button>
            <button
              type="button"
              className={`${styles.roleBtn} ${role === "both" ? styles.sel : ""}`}
              onClick={() => setRole("both")}
            >
              🔄 Both
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {errors.server && (
              <div className={styles.errorAlert} style={{ marginBottom: '1rem', color: 'red', fontSize: '0.8rem', padding: '0.5rem', background: '#fff0f0', borderRadius: '4px' }}>
                ⚠️ {errors.server}
              </div>
            )}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>First name</label>
                <div className={`${styles.formInput} ${formData.firstName ? styles.filled : ""}`}>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    placeholder="First name"
                    className={styles.fiText}
                  />
                  {formData.firstName && <div className={styles.fiCheck}>✓</div>}
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Last name</label>
                <div className={`${styles.formInput} ${formData.lastName ? styles.filled : ""}`}>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    placeholder="Last name"
                    className={styles.fiText}
                  />
                  {formData.lastName && <div className={styles.fiCheck}>✓</div>}
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email address</label>
              <div className={`${styles.formInput} ${errors.email ? styles.error : ""} ${formData.email && !errors.email ? styles.filled : ""}`}>
                <div className={styles.fiIcon}>✉️</div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter your email"
                  className={styles.fiText}
                />
                {errors.email && <div className={styles.fiErr}>✗</div>}
                {formData.email && !errors.email && <div className={styles.fiCheck}>✓</div>}
              </div>
              {errors.email && <div className={styles.formError}>⚠️ {errors.email}</div>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Phone number</label>
              <div className={`${styles.formInput} ${errors.phone ? styles.error : ""} ${formData.phone && !errors.phone ? styles.filled : ""}`}>
                <div style={{ fontSize: "11px", color: "#666", borderRight: "1px solid #ddd", paddingRight: "10px", marginRight: "10px" }}>🇮🇳 +91</div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="98XXXXXXXX"
                  className={styles.fiText}
                  maxLength={10}
                />
                {errors.phone && <div className={styles.fiErr}>✗</div>}
                {formData.phone && !errors.phone && <div className={styles.fiCheck}>✓</div>}
              </div>
              {errors.phone && <div className={styles.formError}>⚠️ {errors.phone}</div>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Password</label>
              <div className={`${styles.formInput} ${errors.password ? styles.error : ""} ${formData.password && !errors.password ? styles.filled : ""}`}>
                <div className={styles.fiIcon}>🔒</div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Create a strong password"
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
              {errors.password && <div className={styles.formError}>⚠️ {errors.password}</div>}
              
              {/* Password Strength */}
              {formData.password && (
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

            {/* Terms Checkbox */}
            <div className={styles.checkRow}>
              <div 
                className={`${styles.checkBox} ${agreedToTerms ? styles.checked : ""}`}
                onClick={() => setAgreedToTerms(!agreedToTerms)}
              >
                {agreedToTerms && "✓"}
              </div>
              <label className={styles.checkLbl}>
                I agree to the <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>.
              </label>
            </div>
            {errors.terms && <div className={styles.formError}>⚠️ {errors.terms}</div>}

            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? "Creating account..." : "Continue → Verify Email"}
            </button>
          </form>

          <div className={styles.orDiv}>
            <div className={styles.orLine}></div>
            <div className={styles.orText}>or sign up with</div>
            <div className={styles.orLine}></div>
          </div>

          <div className={styles.socialRow}>
            <button type="button" className={styles.socialBtn}>
              🌐 Google
            </button>
            <button type="button" className={styles.socialBtn}>
              📱 Phone OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}