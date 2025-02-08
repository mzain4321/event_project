"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header({ toggleSidebar }) {
  const [signedInUser, setSignedInUser] = useState(null);

  const route = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('signedInUser');
    setSignedInUser(null);
    route.push("/");
  }

  useEffect(() => {
    // Access localStorage inside useEffect
    const user = JSON.parse(localStorage.getItem("signedInUser"));
    if (user) {
      setSignedInUser(user);
    }
  }, []);

  return (
    <div className="w-full flex flex-col lg:flex-row px-5 border-[1px] border-gray-100 py-2 bg-gray-50">
      <div className="w-full lg:w-[50%] flex items-center">
        {/* Toggle Button for Small and Medium Devices */}
        <button
          onClick={toggleSidebar}
          className="py-2 px-5 bg-black text-white rounded mr-4 mt-1 lg:hidden"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5h16v2H2V5zm0 6h16v2H2v-2zm0 6h16v2H2v-2z" />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Search..."
          name="search"
          className="w-full lg:w-[70%] mt-1 text-black border-[1px] border-gray-200 px-5 py-2 rounded-md"
        />
      </div>
     
        <div className="w-full lg:w-[50%]">
        {signedInUser ? (
          <div className="w-full flex gap-3 justify-center lg:justify-around py-1">
            <div className="flex items-center">
              <h1 className="tracking-wide">
                <b>Email :</b> {signedInUser.email || "User Not Signed In"}
              </h1>
            </div>
            <div>
              <button className="bg-black text-white px-8 py-2 rounded-xl tracking-wider hover:scale-95" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
          ) : (<div className="flex items-center font-semibold">
            <p>No Admin Signed In!!!</p>
          </div>)}
        </div>
      
    </div>
  );
}