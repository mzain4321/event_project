import { connectDB } from "@/app/lib/MongoConfig";
import { NextResponse } from "next/server";
import Contact from "@/app/Models/contact";

export async function POST(req) {
  await connectDB();
  try {
    const contactData = await req.json();
    const contact = await Contact.create(contactData);
  
    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}