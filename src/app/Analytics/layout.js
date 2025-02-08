"use client";

import Header from "@/app/Reuseable Components/Header";
import SideBar from "@/app/Reuseable Components/SideBar";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);
  const closeSidebar = () => setIsSidebarVisible(false);

  return (
    <div className="w-full flex overflow-hidden">
      <div className="w-full flex overflow-hidden min-h-screen">
        {/* Sidebar */}
        <div
          className={`fixed w-[70%] sm:w-[50%] bg-gray-50 z-20 transform ${
            isSidebarVisible ? "translate-x-0" : "-translate-x-full"
          } transition-transform lg:static lg:translate-x-0 lg:w-[16%] h-full`}
        >
          <SideBar closeSidebar={closeSidebar} />
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 w-full ${
            isSidebarVisible ? "overflow-hidden" : ""
          } lg:w-[84%] h-full`}
        >
          <Header toggleSidebar={toggleSidebar} />
          <main className="h-full bg-white">{children}</main>
        </div>
      </div>

      {/* Overlay for small devices */}
      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
}
