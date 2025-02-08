"use client";

import Navbar from "@/app/Reuseable Components/Navbar";
import Footer from "@/app/Reuseable Components/Footer";

export default function HomeLayout({ children }) {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <div className="w-full flex justify-center py-10 px-1 md:py-12 md:px-10">
        <Footer />
      </div>
    </div>
  );
}
