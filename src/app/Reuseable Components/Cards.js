"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Cards() {
  const [pendingEvents, setPendingEvents] = useState("");
  const [publishedEvents, setPublishedEvents] = useState("");
  // Fetch events from the API
  const getEvents = async () => {
    const resp = await fetch("/API/Events", { method: "GET" });
    const data = await resp.json();
    const pending = data["data"].filter((event)=> event.status === "Pending");
    setPendingEvents(pending.length);

    const published = data["data"].filter((event)=> event.status === "Published");
    setPublishedEvents(published.length);
  };

  const [users, setUsers] = useState("");

  // Fetch all users from API
  const getAllUsers = async () => {
    const resp = await fetch("/API/UserLogin", { method: "GET" });
    const userData = await resp.json();
    const totalUsers = userData["data"];
    setUsers(totalUsers.length);
  };

  useEffect(() => {
    getEvents();
    getAllUsers();
  }, []);

  return (
    <div>
      <div className='w-full flex flex-col gap-8 justify-center lg:flex-row lg:justify-around pt-10'>
        <div className='w-full lg:w-[26%] flex justify-center gap-5 shadow-xl px-6 py-4 rounded-xl border-[1px] border-gray-300'>
          <div className='flex justify-center'>
            <Image src="/Icons/TicketsIcon.png" width={30} height={30} alt="Tickets Icon" className='w-[65px] h-[65px] lg:w-[70px] lg:h-[70px]'></Image>
          </div>
          <div className='text-center mt-1'>
            <h1 className='text-lg font-bold'>Events Pending</h1>
            <p>{pendingEvents}</p>
          </div>
        </div>

        <div className='w-full lg:w-[26%] flex justify-center gap-5 shadow-xl px-6 py-4 rounded-xl border-[1px] border-gray-300'>
          <div className='flex justify-center'>
            <Image src="/Icons/UserIcon.png" width={30} height={30} alt="Seats Icon" className='w-[65px] h-[65px] lg:w-[70px] lg:h-[70px]'></Image>
          </div>
          <div className='text-center mt-1'>
            <h1 className='text-lg font-bold'>Total Users</h1>
            <p>{users}</p>
          </div>
        </div>

        <div className='w-full lg:w-[26%] flex justify-center gap-5 shadow-xl px-6 py-4 rounded-xl border-[1px] border-gray-300'>
          <div className='flex justify-center'>
            <Image src="/Icons/BalanceIcon.png" width={30} height={30} alt="Balance Icon" className='w-[65px] h-[65px] lg:w-[70px] lg:h-[70px]'></Image>
          </div>
          <div className='text-center mt-1'>
            <h1 className='text-lg font-bold'>Events Published</h1>
            <p>{publishedEvents}</p>
          </div>
        </div>
      </div>
    </div>
  )
}