"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { menuItems } from "@/constant/menuitems";

export default function TopBar({ isSidebarOpen }) {
  const currentPath = usePathname();
  const currentItem = menuItems.find(item => item.url === currentPath);

  return (
    <div
      className={`
        fixed flex items-center justify-between bg-white py-4 shadow-md w-screen z-10 pl-8  ${isSidebarOpen ? "pr-72" : "pr-24"}
      }`}
    >
      {/* Path Breadcrumb */}
      <div className="text-lg font-semibold text-indigo-900">
        {currentItem ? currentItem.title : "Page Not Found"}
      </div>

      <div className="flex items-center space-x-4">
        <Image
          src="/profile.jpg"
          alt="Profile"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="text-right">
          <p className="text-left text-sm font-medium text-gray-900">Nadif</p>
          <p className="text-xs text-gray-500">alyzakhoirunnadif@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
