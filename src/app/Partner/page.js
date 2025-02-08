"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Mail } from "../lib/send-mail";
import { toast } from "react-toastify";

const benefits = [
  {
    id: 1,
    title: "Business growth",
    description:
      "Scale your services and land more business with our flexible partnership options. This is your new platform for differentiation.",
    icon: "🌱💰",
  },
  {
    id: 2,
    title: "Going the extra mile",
    description:
      "When you’re a Bizzabo partner, you’re an extension of our team so take advantage of exclusive marketing, business development.",
    icon: "📊❤️",
  },
  {
    id: 3,
    title: "Lasting relationships",
    description:
      "With top NPS and CSAT scores, you can count on Bizzabo for seamless integrations, plus enterprise-grade security and support.",
    icon: "🤝💬",
  },
];

export default function Page() {
  const formRef = useRef(null);
  const scrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [partnershipType, setPartnershipType] = useState("");
  const [detail, setDetail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  
  const [loginedUserEmail, setLoginedUserEmail] = useState("");
  

  useEffect(() => {
    const signedInUser = JSON.parse(localStorage.getItem("signedInUser"));
    setLoginedUserEmail(signedInUser?.email || "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const partnerData = {
      firstName,
      lastName,
      email:loginedUserEmail,
      phoneNo,
      jobTitle,
      partnershipType,
      detail,
    };
    
      try {
        const response = await fetch("/API/Partners", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(partnerData),
        });

        const result = await response.json();

        if (result.success) {
          toast.success("Form submitted successfully!");
          setFirstName("");
          setLastName("");
          setPhoneNo("");
          setJobTitle("");
          setPartnershipType("");
          setDetail("");
          setIsChecked(false);
          const fullName = `${firstName} ${lastName}`;
           await Mail({
            to: loginedUserEmail,
            subject: `Thank You for Your Interest in Partnering with Us, ${fullName}!`,
            message: `<p>Dear <strong>${fullName}</strong>,</p>
            <p>I hope this message finds you well.</p>
            <p>Thank you for showing interest in becoming a part of our team. We truly appreciate your enthusiasm and the time you've taken to connect with us. We are currently reviewing all applications and will be in touch with you soon regarding the next steps.</p>
            <p>We look forward to possibly working together and will contact you shortly.</p>
            <p>Best regards, <br>
               <strong>Zain Imran</strong><br>
               <strong>CTO</strong><br>
               <strong>EventSphere</strong><br>
               <strong><a href="mailto:zanmirza3334@gmail.com">zanmirza3334@gmail.com</a></strong>
            </p>`,
          });
        } else {
          toast.error("Form not submitted!!!");
        }
      } catch (error) {
        toast.error("An error occurred. Please check your network."); 
      }
    
  };

  return (
    <div className="mt-10">
      {/* why join */}
      <div className=" bg-[#fff000] px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-10">
          Why join the Bizzabo partner program?
        </h2>
        <div className="grid md:grid-cols-3  gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="rounded-lg shadow-xl bg-[#fffc4b9a] p-8 py-16 text-center"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* ecosystem */}
      <div className="py-10 px-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-8">
          Our partner program ecosystem
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Card 1 */}
          <div className="bg-gray-100 rounded-lg shadow-2xl p-6">
            <div className="flex items-center mb-4">
              <Image
                width={"29"}
                height={"20"}
                src="/Images/App market partners.png"
                alt="App Market"
                className="w-12 h-12 mr-4"
              />
              <h2 className="text-xl font-semibold">App market partners</h2>
            </div>
            <p className="text-gray-600">
              Grow your business by building apps that help Event Experience
              Leaders deliver personalized and immersive experiences for
              participants.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-gray-100 rounded-lg shadow-2xl p-6">
            <div className="flex items-center mb-4">
              <Image
                width={"29"}
                height={"20"}
                src="/Images/Agency partners.png"
                alt="Agency Partners"
                className="w-12 h-12 mr-4"
              />
              <h2 className="text-xl font-semibold">Agency partners</h2>
            </div>
            <p className="text-gray-600">
              Our frictionless agency user experience platform provides
              dedicated business development and support resources, so you can
              create engagement strategies and unforgettable customer
              experiences.
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg shadow-2xl p-6">
            <div className="flex items-center mb-4">
              <Image
                width={"29"}
                height={"20"}
                src="/Images/Go to market partners.png"
                alt="App Market"
                className="w-12 h-12 mr-4"
              />
              <h2 className="text-xl font-semibold">Go-to-market partners</h2>
            </div>
            <p className="text-gray-600">
              Why go it alone? Expand your portfolio of product offerings to
              include our end-to-end solution for all kinds of events – while
              strengthening your relationships and credibility
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg shadow-2xl p-6">
            <div className="flex items-center mb-4">
              <Image
                width={"29"}
                height={"20"}
                src="/Images/Solutions & integrations partners.png"
                alt="App Market"
                className="w-12 h-12 mr-4"
              />
              <h2 className="text-xl font-semibold">
                Solutions & integrations partners
              </h2>
            </div>
            <p className="text-gray-600">
              Our frictionless agency user experience platform provides
              dedicated business development and support resources, so you can
              create engagement strategies and unforgettable customer
              experiences.
            </p>
          </div>
        </div>
      </div>
      {/* form */}
      <div
        ref={formRef}
        className="min-h-screen flex items-center justify-center bg-[#fff000] p-6"
      >
        <div className="w-full max-w-3xl bg-transparent">
          <h1 className="text-center text-3xl font-bold text-black mb-8">
            Join Our Growing Partner Community
          </h1>
          <form
            className="space-y-6 bg-white rounded-xl px-10 py-20"
            onSubmit={handleSubmit}
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-black font-medium mb-2">
                  First Name*
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    //console.log(e.target.value);
                  }}
                  placeholder="First name..."
                  className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              {/* Last Name */}
              <div>
                <label className="block text-black font-medium mb-2">
                  Last Name*
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    //console.log(e.target.value);
                  }}
                  placeholder="Last Name..."
                  className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              {/* Work Email */}
              <div>
                <label className="block text-black font-medium mb-2">
                  Work Email*
                </label>
                <input
                  type="email"
                  value={loginedUserEmail}
                  disabled
                  placeholder="Work email..."
                  className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
                
              </div>
              {/* Phone Number */}
              <div>
                <label className="block text-black font-medium mb-2">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  placeholder="Phone..."
                  className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              {/* Job Title */}
              <div>
                <label className="block text-black font-medium mb-2">
                  Job Title*
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Job Title"
                  className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              {/* Type of Partnership */}
              <div>
                <label className="block text-black font-medium mb-2">
                  Type of Partnership*
                </label>
                <select
                  value={partnershipType}
                  onChange={(e) => setPartnershipType(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black selected"
                  required
                >
                  <option disabled value="">
                    Type of Partnership
                  </option>
                  <option>App Market Partners</option>
                  <option>Agency Partners</option>
                </select>
              </div>
            </div>
            {/* Desired Partnership Details */}
            <div>
              <label className="block text-black font-medium mb-2">
                Desired partnership details*
              </label>
              <textarea
                rows="3"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder="Please share details on your desired partnership"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                required
              ></textarea>
            </div>
            {/* Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black "
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                required
              />
              <label className="ml-2 text-black text-sm">
                I consent to receive emails from Bizzabo about upcoming events
                and more. I reviewed and agree to mz_eventsphere
                <Link href={"/"} className="text-blue-500 underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-black text-white font-medium py-3 px-7 rounded-xl hover:scale-95"
              >
                Become a Partner
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}