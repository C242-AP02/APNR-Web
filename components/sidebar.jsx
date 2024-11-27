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
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } fixed top-0 left-0 h-full bg-white shadow-lg p-4 transition-all duration-300 z-50`}
    >
      {/* Logo Section */}
      <div
        className="text-xl font-bold cursor-pointer mb-6"
        onClick={handleLogoClick}
      >APNR
      </div>

      <button
        className="text-gray-600 focus:outline-none mb-6"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => handleClick(item)}
            className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all
              ${
                active === item.name
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            <span className="text-lg">{item.icon}</span>
            {isSidebarOpen && <span className="font-medium">{item.name}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
