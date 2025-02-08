// "use server";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/MongoConfig";
import { ObjectId } from "mongodb";
import Event from "@/app/Models/event";
import upload from "@/app/Middleware/multer";

import fs from 'fs';
import path from 'path';

// Disable Next.js built-in body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await connectDB();
  let collection = [];
  if (!id) {
    collection = await Event.find({});
  } else {
    collection = await Event.find({ _id: new ObjectId(id) });
  }
  return NextResponse.json({ data: collection });
}

export async function POST(req) {
  try {
    // Connect to the database
    await connectDB();
    const formData = await req.formData();
    const file = formData.get('image');
    console.log("form data", formData, file);

    // Validate required fields
    const requiredFields = [
      "name",
      "email",
      "eventTitle",
      "eventDate",
      "eventStartingTime",
      "eventEndingTime",
      "eventLocation",
      "noOfPerson",
      "eventDescription",
      // "status",
    ];

    // Ensure all fields are provided
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    // Save file information
    let image = null;
    if (file) {
      // Save the file path to the server directory
      const filename = `${Date.now()}-${file.name}`;
      const filepath = path.join(process.cwd(), 'public', 'uploads', filename); // Store the file in the 'uploads' directory

      // Save the file to the server
      await fs.promises.writeFile(filepath, file.stream());

      // Store the file path in the database
      image = `/uploads/${filename}`; // Save the path in the database, not the file object
    }

    // Create a new event
    const event = new Event({
      name: formData.get('name'),
      email: formData.get('email'),
      eventTitle: formData.get('eventTitle'),
      eventDate: new Date(formData.get('eventDate')),
      eventStartingTime: formData.get('eventStartingTime'),
      eventEndingTime: formData.get('eventEndingTime'),
      eventLocation: formData.get('eventLocation'),
      noOfPerson: parseInt(formData.get('noOfPerson')),
      eventDescription: formData.get('eventDescription'),
      image, // Store the image path here
      // status: formData.get('status'),
    });

    await event.save();

    return NextResponse.json({ message: "Event created successfully!" }, { status: 201 });
  } 
  catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "id is required", status: 400 });
  }

  await connectDB();

  try {
    const jsonBody = await req.json();

    // Merge parsed body with additional fields
    const updatedData = { ...jsonBody };

    // Update the event in the database
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatedData },
      { new: true } // Return the updated document
    );

    if (!updatedEvent) {
      return NextResponse.json({
        message: `Event with id ${id} not found`,
        status: 404,
      });
    }

    return NextResponse.json({
      message: `Event with ${id} is updated successfully`,
      data: updatedEvent,
    });
  } 
  catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error updating event", error });
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "id is required", status: 400 });
  }

  await connectDB();

  try {
    const deletedEvent = await Event.findOneAndDelete({ _id: new ObjectId(id) });
    return NextResponse.json({
      message: `Event with ${id} is deleted successfully`,
      data: deletedEvent,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error deleting event", error });
  }
}