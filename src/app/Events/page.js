"use client";
import Image from "next/image";
import EventCards from "../Reuseable Components/EventCards";

export default function page() {
 
  return (
    <div>
      <div>
        <div className="mt-10 py-20 bg-[#fff000]">
          <h1 className="text-center text-4xl md:text-5xl font-semibold">Attend a MS-EventSphere event</h1>
          <div className="w-full flex justify-center my-5">
            <div className="w-full lg:w-[60%] px-5 lg:px-10">
              <p className="text-lg">Join us for event industry webinars, in-person events, and more. Whether you prefer to attend live or watch on-demand, you’ll get the industry’s top insights and thought leadership.</p>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="w-full lg:w-[90%] shadow-2xl rounded-3xl flex justify-center flex-col md:flex-row mt-10">
              <div className="w-full lg:w-[50%] bg-white rounded-3xl px-16 py-10">
                <p className="text-md md:text-lg mt-10">Upcoming Event</p>
                <h1 className="text-4xl font-semibold mt-2">2025 Event Benchmarks:</h1>
                <p className="text-md md:text-lg font-semibold mt-2">From Insights to Action</p>
                <h1 className="text-2xl font-semibold mt-5">Jan 22, 2025 11 am ET / 8 am PT / 4 pm GMT</h1>
                <div className="mt-5">
                  <button className="bg-black text-white px-7 py-2 rounded-xl hover:scale-95">Register Now</button>
                </div>
              </div>
              <div className="w-full lg:w-[50%] rounded-3xl">
                <Image src="/Images/UpComingEventSideImg.png" width={300} height={300} alt="Up Coming Event Image" className="w-full h-[430px]"></Image>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-20 flex flex-col lg:flex-row gap-5 lg:gap-20 px-10 lg:px-20">
          <div className="bg-[#fff000] w-full lg:w-[50%] rounded-t-2xl rounded-b-full lg:rounded-t-3xl lg:rounded-b-full px-5 py-20 lg:py-32">
            <h1 className="text-center text-4xl lg:text-5xl font-semibold">Our approach to events</h1>
            <div className="flex justify-center">
              <Image src="/Images/OurApproachImg.png" width={300} height={300} alt="Our Approach Image" className="w-[250px] sm:w-[300px] sm:h-[200px] lg:w-[400px] lg:h-[220px]"></Image>
            </div>
          </div>
          <div className="w-full lg:w-[50%] py-8 lg:py-20">
            <p className="text-lg">We believe events should be attendee-centric, experience-driven, and leverage the most innovative technology to ensure day-of excitement lasts long after the event is over.</p>
            <h1 className="text-xl font-semibold text-black mt-3">Here’s our event philosophy:</h1>
            <div className="flex gap-7 mt-12 items-center">
              <h1 className="text-5xl md:text-6xl text-yellow-300">01</h1>
              <h1 className="text-md md:text-xl">Event experiences should be impactful, unforgettable, and exceed expectations.</h1>
            </div>
            <div className="flex gap-7 mt-12 items-center">
              <h1 className="text-5xl md:text-6xl text-yellow-300">02</h1>
              <h1 className="text-md md:text-xl">Gatherings should foster community, connection, and collaboration.</h1>
            </div>
            <div className="flex gap-7 mt-12 items-center">
              <h1 className="text-5xl md:text-6xl text-yellow-300">03</h1>
              <h1 className="text-md md:text-xl">Events should deliver ROI, drive pipeline, and help accelerate business growth.</h1>
            </div>
          </div>
        </div>

        <div className="bg-[#fff000] w-full py-12 mt-20 px-5 md:px-12">
          <div>
            <h1 className="text-4xl font-semibold text-center">Upcoming and On-demand Industry Events</h1>
             <EventCards dashboard={false}/>
          </div>
        </div>

      </div>
    </div>
  )
}