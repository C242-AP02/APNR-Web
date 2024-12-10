"use client";

import { useState } from "react";
import { UserAuth } from "@/context/authContext";
import Image from "next/image";
import { IoMdExit } from "react-icons/io";

export default function LoginButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, handleLogin, handleLogout } = UserAuth();

  return (
    <>
      {!user ? (
        <button
          onClick={handleLogin}
          className="px-6 py-3 rounded-lg text-black transition hover:text-white bg-white hover:bg-blue-700 flex items-center space-x-2"
        >
          <Image
            src="/google.svg"
            alt="Google Logo"
            width={20}
            height={20}
            className="inline-block"
          />
          <span>Login</span>
        </button>
      ) : (
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center space-x-2 text-white bg-blue-600 rounded-full"
          >
            <img
              src={user?.photoUrl || "/profile.jpg"}
              alt={user?.name}
              className="w-8 h-8 sm:w-12 sm:h-12 rounded-full"
            />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2 w-40">
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:bg-gray-200 px-4 py-2 text-left w-full gap-2"
              >
                  <IoMdExit size={23} />
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
