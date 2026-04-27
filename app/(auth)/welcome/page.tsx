"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./welcome.module.scss";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className={styles.authPage}>
      {/* Left Panel - Success State */}
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

          {/* Progress Steps */}
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

      {/* Right Panel - Success Content */}
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

            {/* Quick Actions */}
            <div className={styles.quickActions}>
              <div className={styles.actionCard} onClick={() => router.push("/")}>
                <div className={styles.actionIcon}>🔍</div>
                <div className={styles.actionTitle}>Browse Deals</div>
                <div className={styles.actionSub}>Find last-minute tickets</div>
              </div>
              <div className={styles.actionCardBlue} onClick={() => router.push("/sell-ticket")}>
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