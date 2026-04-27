import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Mock signin logic
    // In a real app, you would verify credentials and generate a JWT
    
    return NextResponse.json({
      success: true,
      message: "Signin successful.",
      data: {
        id: "user_123456",
        firstName: "John",
        lastName: "Doe",
        email: email,
        phone: "+919876543210",
        accessToken: "mock_jwt_token_" + Math.random().toString(36).substring(7),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
