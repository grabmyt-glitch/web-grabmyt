import { NextResponse } from "next/server";

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

    // Mock signup logic
    // In a real app, you would save the user to a database here
    
    return NextResponse.json({
      success: true,
      message: "Signup successful. Please enter OTP sent to email.",
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
