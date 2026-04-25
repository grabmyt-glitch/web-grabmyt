import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (!payload.from || !payload.to || !payload.date || !payload.time || !payload.listingPrice) {
      return NextResponse.json({ message: "Missing required ticket fields." }, { status: 400 });
    }

    return NextResponse.json({ message: "Ticket listing created successfully." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid ticket payload." }, { status: 400 });
  }
}
