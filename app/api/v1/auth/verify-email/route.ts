import { NextResponse } from "next/server";

// In-memory store for OTPs (in production, use Redis or database)
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

// Generate a 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via email (mock implementation)
// In production, integrate with email service like SendGrid, Resend, etc.
async function sendOTPByEmail(email: string, otp: string, firstName: string) {
  // Log the OTP for testing purposes
  console.log(`\n========== OTP VERIFICATION ==========`);
  console.log(`To: ${email}`);
  console.log(`Name: ${firstName}`);
  console.log(`Your OTP is: ${otp}`);
  console.log(`=====================================\n`);
  
  // In production, you would call an email API here
  // Example with SendGrid:
  // await sendGrid.send({
  //   to: email,
  //   from: 'noreply@lastpass.in',
  //   subject: 'Verify your email - OTP',
  //   html: `<p>Hi ${firstName}, your OTP is <strong>${otp}</strong></p>`
  // });
  
  return true;
}

// POST - Verify OTP
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Check if OTP exists for this email
    const storedData = otpStore.get(email.toLowerCase());
    
    if (!storedData) {
      return NextResponse.json(
        { success: false, message: "OTP expired or not found. Please request a new OTP." },
        { status: 400 }
      );
    }

    // Check if OTP is expired
    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(email.toLowerCase());
      return NextResponse.json(
        { success: false, message: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP. Please try again." },
        { status: 400 }
      );
    }

    // OTP is valid - clear it after successful verification
    otpStore.delete(email.toLowerCase());

    // In production, create user in database and generate JWT
    return NextResponse.json({
      success: true,
      message: "Email verified successfully!",
      data: {
        id: "user_" + Date.now(),
        email: email,
        firstName: "User",
        accessToken: "jwt_token_" + Math.random().toString(36).substring(7),
      },
    });
  } catch (error: any) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Resend OTP
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { email, firstName } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Generate new OTP
    const newOTP = generateOTP();
    
    // Store OTP with 10-minute expiration
    otpStore.set(email.toLowerCase(), {
      otp: newOTP,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    // Send OTP via email
    await sendOTPByEmail(email, newOTP, firstName || "User");

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully! Check your email.",
    });
  } catch (error: any) {
    console.error("Resend OTP error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to send OTP" },
      { status: 500 }
    );
  }
}