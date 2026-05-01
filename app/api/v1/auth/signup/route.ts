import { NextResponse } from "next/server";

// In-memory store for OTPs (in production, use Redis or database)
const otpStore = new Map<string, { otp: string; expiresAt: number; firstName: string; lastName: string }>();

// Generate a 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via email (mock implementation)
async function sendOTPByEmail(email: string, otp: string, firstName: string) {
  // Log the OTP for testing purposes
  console.log(`\n========== OTP VERIFICATION ==========`);
  console.log(`To: ${email}`);
  console.log(`Name: ${firstName}`);
  console.log(`Your OTP is: ${otp}`);
  console.log(`=====================================\n`);
  
  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
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

    // Password validation
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Check if user already exists (mock check)
    // In production, check database for existing user
    const existingUser = otpStore.get(email.toLowerCase());
    if (existingUser) {
      // User exists, generate new OTP
      const newOTP = generateOTP();
      otpStore.set(email.toLowerCase(), {
        otp: newOTP,
        expiresAt: Date.now() + 10 * 60 * 1000,
        firstName,
        lastName,
      });
      await sendOTPByEmail(email, newOTP, firstName);
      
      return NextResponse.json({
        success: true,
        message: "OTP sent! Please verify your email.",
        data: {
          email: email,
          firstName: firstName,
        },
      });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP with 10-minute expiration
    otpStore.set(email.toLowerCase(), {
      otp: otp,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
      firstName,
      lastName,
    });

    // Send OTP via email
    await sendOTPByEmail(email, otp, firstName);

    // In production, save user to database here
    
    return NextResponse.json({
      success: true,
      message: "Signup successful! OTP sent to your email.",
      data: {
        email: email,
        firstName: firstName,
      },
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
