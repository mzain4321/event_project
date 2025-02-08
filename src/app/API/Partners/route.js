import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/MongoConfig";
import Partner from "@/app/Models/partner";

export async function POST(req) {
  await connectDB();

  try {
    const dataPartner = await req.json();
    const partner = await Partner.create(dataPartner);


    return NextResponse.json({ success: true, data: partner }, { status: 201 });
  } catch (error) {
 
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ success: false, message: "Method not allowed" }, { status: 405 });
}