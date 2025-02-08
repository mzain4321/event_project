// page.js
"use client";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ImageUpload from "../Reuseable Components/ImageUpload";
import { Mail } from "../lib/send-mail";
import { toast } from "react-toastify";

export default function Page() {
  const [event, setEvent] = useState({
    Name: "",
    EventTitle: "",
    Date: "",
    StartingTime: "",
    EndingTime: "",
    NumOfPerson: "",
    Location: "",
    Description: "",
    Status: "Pending",
  });
  const [imageFile, setImageFile] = useState([]);
  const [loginedUserEmail, setLoginedUserEmail] = useState("");

  const handleImageUpload = (file) => {
    setImageFile(file);
  };

  useEffect(() => {
    const signedInUser = JSON.parse(localStorage.getItem("signedInUser"));
    setLoginedUserEmail(signedInUser?.email || "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (
      event.Name &&
      event.EventTitle &&
      event.StartingTime &&
      event.Date &&
      event.EndingTime &&
      event.NumOfPerson &&
      event.Location &&
      event.Description
    ) {
      try {
        const formData = new FormData();
        formData.append("name", event.Name);
        formData.append("email", loginedUserEmail);
        formData.append("eventTitle", event.EventTitle);
        formData.append("eventDate", event.Date);
        formData.append("eventStartingTime", event.StartingTime);
        formData.append("eventEndingTime", event.EndingTime);
        formData.append("noOfPerson", event.NumOfPerson);
        formData.append("eventLocation", event.Location);
        formData.append("eventDescription", event.Description);
        formData.append("status", event.Status); // Append status here

        if (imageFile) {
          formData.append("image", imageFile);
        }

        console.log(formData);

        const response = await fetch("/API/Events", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        
        if (response.ok) {
          toast.success("Event Submitted successfully!");
          setEvent({
            Name: "",
            EventTitle: "",
            Date: "",
            StartingTime: "",
            EndingTime: "",
            NumOfPerson: "",
            Location: "",
            Description: "",
            Status: "Pending",
          });
          setImageFile(null);
          document.querySelector('input[type="file"]').value = null;
          
          try {
            await Mail({
              to: loginedUserEmail,
              subject: `Thank You for Submitting Your Event, ${event.Name}! 🎉`,
              message: `<p>Dear ${event.Name},</p>
                <p>We appreciate you taking the time to share your event, "<strong>${event.EventTitle}</strong>", with us on EventSpher.</p>
                <p>Our team has received the details and will review them shortly. Once approved, your event will be published on our platform, making it accessible to our community of event enthusiasts.</p>
                <p>Thank you for choosing EventSpher to showcase your event. We’re excited to help you reach a wider audience and make your event a success!</p>
                <p>Best regards,</p>
                <p><strong>The EventSpher Team</strong></p>`,
            });
          } catch (mailError) {
            console.error("Error sending mail:", mailError);
            toast.error("Event submitted but email notification failed.");
          }
        } else {
          console.error(result);
          toast.error("Failed to create event");
        }
      } catch (error) {
        console.error("Error submitting event:", error);
        toast.error("An error occurred while creating the event");
      }
    }
  };

  return (
    <div className="bg-[#fff000]">
      <div className="py-6">
        <h1 className="text-center text-3xl md:text-4xl font-serif">
          Create An Event Of your Choice
        </h1>
      </div>
      <div className="w-full flex justify-center mb-10 mt-10">
        <form
          className="w-[90%] lg:w-[60%] px-5 lg:px-8 flex flex-col mt-5 mb-10 shadow-xl rounded-2xl py-14 bg-white"
          onSubmit={handleSubmit}
        >
          <label className="text-2xl lg:text-4xl font-serif text-center tracking-wide my-5">
            Event Form
          </label>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            <div>
              <h1 className="mb-3 ml-1 font-semibold">Name:</h1>
              <TextField
                id="outlined-basic"
                className="w-full"
                variant="outlined"
                value={event.Name}
                onChange={(e) => setEvent({ ...event, Name: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-col">
              <h1 className="mb-3 ml-1 font-semibold">Email:</h1>
              <TextField
                id="outlined-basic"
                type="email"
                className="w-full"
                variant="outlined"
                value={loginedUserEmail}
                disabled
                required
              />
            </div>
            <div>
              <h1 className="mb-3 ml-1 font-semibold">Event Title:</h1>
              <TextField
                id="outlined-basic"
                className="w-full"
                variant="outlined"
                value={event.EventTitle}
                onChange={(e) =>
                  setEvent({ ...event, EventTitle: e.target.value })
                }
                required
              />
            </div>
            <div>
              <h1 className="mb-3 ml-1 font-semibold">Date:</h1>
              <TextField
                id="outlined-basic"
                type="date"
                className="w-full"
                variant="outlined"
                value={event.Date}
                onChange={(e) => setEvent({ ...event, Date: e.target.value })}
                required
              />
            </div>
            <div>
              <h1 className="mb-3 ml-1 font-semibold">Starting Time:</h1>
              <TextField
                id="outlined-basic"
                className="w-full"
                variant="outlined"
                type="time"
                value={event.StartingTime}
                onChange={(e) =>
                  setEvent({ ...event, StartingTime: e.target.value })
                }
                required
              />
            </div>
            <div>
              <h1 className="mb-3 ml-1 font-semibold">Ending Time:</h1>
              <TextField
                id="outlined-basic"
                className="w-full"
                variant="outlined"
                type="time"
                value={event.EndingTime}
                onChange={(e) =>
                  setEvent({ ...event, EndingTime: e.target.value })
                }
                required
              />
            </div>
            <div>
              <h1 className="mb-3 ml-1 font-semibold">Number of Person:</h1>
              <TextField
                id="outlined-basic"
                className="w-full"
                variant="outlined"
                type="number"
                value={event.NumOfPerson}
                onChange={(e) =>
                  setEvent({ ...event, NumOfPerson: e.target.value })
                }
                required
              />
            </div>
            <div>
              <h1 className="mb-3 ml-1 font-semibold">Location</h1>
              <TextField
                id="outlined-basic"
                className="w-full"
                variant="outlined"
                value={event.Location}
                onChange={(e) =>
                  setEvent({ ...event, Location: e.target.value })
                }
                required
              />
            </div>

            <div>
              <div className="p-1">
                <h1 className="text-lg font-semibold mb-4">
                  Upload Event Image
                </h1>
                <ImageUpload onUpload={handleImageUpload} />
              </div>
            </div>
          </div>
          <div className="w-full">
            <h1 className="mb-3 ml-1 font-semibold">Event Description</h1>
            <textarea
              rows="6"
              placeholder="Description"
              value={event.Description}
              className="w-full border border-gray-300 px-4 py-2 ml-1"
              onChange={(e) =>
                setEvent({ ...event, Description: e.target.value })
              }
              required
            ></textarea>
          </div>
          <div className="flex justify-end mt-5">
            <Button
              type="submit"
              variant="outlined"
              className="py-2 border-black text-white bg-black tracking-wider rounded-xl hover:scale-95"
            >
              Submit Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}