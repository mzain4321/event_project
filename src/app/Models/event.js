// Models/event.js
import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Email is invalid", // Proper email validation regex here
      ],
    },
    eventTitle: { 
      type: String, 
      required: true 
    },
    eventDate: { 
      type: Date, 
      required: true 
    },
    eventStartingTime: { 
      type: String, 
      required: true 
    },
    eventEndingTime: { 
      type: String, 
      required: true 
    },
    eventLocation: { 
      type: String, 
      required: true 
    },
    noOfPerson: { 
      type: Number, 
      required: true 
    },
    eventDescription: { 
      type: String, 
      required: true 
    },
    image: { 
      type: String, // Store the image path or URL here
      default: null 
    },
    status: {
      type: String,
      enum: ["Pending", "Published","UnPublished"], // Limit the status to these three values
      default: "Pending",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Ensure the Event model is created or retrieved correctly.
const Event = mongoose.models?.event || mongoose.model("event", eventSchema);
export default Event;