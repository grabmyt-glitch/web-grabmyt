import { NextResponse } from "next/server";

// In-memory store for password reset tokens
const resetTokenStore = new Map<string, { token: string; expiresAt: number }>();

// Generate a random token
function generateToken(): string {
  return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
}

// Send reset link via email (mock implementation)
async function sendResetLinkByEmail(email: string, token: string) {
  // Log the reset link for testing purposes
  console.log(`\n========== PASSWORD RESET ==========`);
  console.log(`To: ${email}`);
  console.log(`Reset Link: http://localhost:3000/reset-password?token=${token}`);
  console.log(`==================================\n`);
  
  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Generate reset token
    const token = generateToken();
    
    // Store token with 30-minute expiration
    resetTokenStore.set(email.toLowerCase(), {
      token: token,
      expiresAt: Date.now() + 30 * 60 * 1000, // 30 minutes
    });

    // Send reset link via email
    await sendResetLinkByEmail(email, token);

    // Always return success to prevent email enumeration
    return NextResponse.json({
      success: true,
      message: "Password reset link sent to your email!",
    });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}