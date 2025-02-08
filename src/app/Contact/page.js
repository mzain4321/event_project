"use client";
import { useEffect, useState } from "react";
import { Mail } from "../lib/send-mail";
import { toast } from "react-toastify";
export default function Page() {
  const [fullName, setFullName] = useState("");

  const [message, setMessege] = useState("");
  const [loginedUserEmail, setLoginedUserEmail] = useState("");

  useEffect(() => {
    const signedInUser = JSON.parse(localStorage.getItem("signedInUser"));
    setLoginedUserEmail(signedInUser?.email || "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ContactData = {
      fullName,
      email: loginedUserEmail,
      message,
    };
    console.log(ContactData.loginedUserEmail);
    const response = await fetch("/API/Contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ContactData),
    });

    const result = await response.json();

    if (result.success) {
      toast.success("Form submitted successfully!");
      setFullName("");
      setMessege("");
      await Mail({
        to: loginedUserEmail,
        subject: ` Thank You for Reaching Out, ${fullName}!`,
        message: `<h1>Hello ${fullName},</h1>
          <p>Thank you for getting in touch with us. We have received your message:</p>
          <p>"${message}"</p>
          <p>Our team will review it shortly. We’ll get back to you as soon as possible with a response.</p>
          <p>If you have any additional details to share or urgent concerns, feel free to reply to this email. We're here to assist you!</p>
               <a href="http://localhost:3000/About" style="
             display: inline-block;
             background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 15px;
           font-size: 16px;
           font-weight: bold;
           border-radius: 5px;
            margin-top: 10px;
           ">CLICK HERE</a>
          <p>Best regards,</p>
          <p><strong>The EventSpher Team</strong></p>
          `,
      });
    } else {
      toast.error(result.message);
    }
  };
  return (
    <div>
      <div className="min-h-screen bg-[#fff000] mt-16 px-6 py-7">
        {/* Header Section */}
        <div className="text-center my-10">
          <h1 className="text-4xl font-bold text-black">Contact Us</h1>
          <p className="text-lg text-black mt-2">
            We’d love to hear from you! Reach out to us for any inquiries or
            collaborations.
          </p>
        </div>

        <div className="w-full flex gap-5 flex-col lg:flex-row justify-around px-5">
          {/* Contact Info */}
          <section className="w-full lg:w-[55%] mt-16 lg:mt-28 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
              Contact Information
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-5">
              <div className="text-lg">
                <p>
                  <strong>Phone:</strong> +92 343 3326500
                </p>
                <p>
                  <strong>Email:</strong> Shawaizbutt555@gmail.com
                </p>
              </div>
              <div className="text-lg">
                <p>
                  <strong>Address:</strong>
                </p>
                <p>Jalal Pur Jattan, Gujrat </p>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <div className="w-full lg:w-[45%] mx-auto bg-white rounded-2xl shadow-lg py-16 px-10">
            <h2 className="text-2xl font-bold text-black mb-6">Get In Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block  font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block  font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={loginedUserEmail}
                    disabled
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block  font-medium mb-2">Message</label>
                <textarea
                  rows="6"
                  value={message}
                  onChange={(e) => {
                    setMessege(e.target.value);
                  }}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Write your message here"
                ></textarea>
              </div>
              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="bg-black text-white font-medium py-3 px-10 rounded-xl hover:scale-95"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
