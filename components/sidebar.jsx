"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { menuItems } from "@/constant/menuitems";
import { FaBars, FaTimes, FaHome, FaImage, FaVideo, FaList } from "react-icons/fa";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const [active, setActive] = useState("Dashboard");
  const router = useRouter();

  const handleClick = (item) => {
    setActive(item.name);
    router.push(item.url);
    if (window.innerWidth < 640) {
      setIsSidebarOpen(false);
    }
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <div
      className={`
        ${isSidebarOpen ? "w-full sm:w-64" : "w-0 invisible sm:visible sm:w-20"} 
        fixed top-0 left-0 h-full bg-white shadow-lg p-4 transition-all duration-300 z-50
      `}
    >
      <div className={`${isSidebarOpen ? "sm:block" : "hidden sm:block"}`}>
        <div
          className="w-full text-4xl font-extrabold cursor-pointer mb-6 text-center transition-transform transform hover:scale-110 hover:text-indigo-500 hover:shadow-lg hover:shadow-indigo-300"
          onClick={handleLogoClick}
        >
          <div className="flex w-full justify-center items-center">
            <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              A
            </span>
            <span className={`${isSidebarOpen ? "" : "hidden" } bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 bg-clip-text text-transparent`}>
              PNR
            </span>
          </div>
        </div>

        <div className="w-full flex justify-center items-center">
          <button
            className="text-gray-600 focus:outline-none mb-6"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => handleClick(item)}
              className={`flex sm:justify-start justify-center items-center space-x-4 p-3 rounded-lg cursor-pointer
                ${
                  active === item.name
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <span className="text-lg font-medium">{item.icon}</span>
              <div>
                {isSidebarOpen && <span className="font-medium">{item.name}</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
