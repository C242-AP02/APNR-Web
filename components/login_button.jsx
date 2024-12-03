"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { provider, auth } from "@/utils/firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";

export default function LoginButton() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userName = Cookies.get("userName");
    const userEmail = Cookies.get("userEmail");
    const userPhotoUrl = Cookies.get("userPhotoUrl");

    if (userName && userEmail) {
      setUser({
        name: userName,
        email: userEmail,
        photoUrl: userPhotoUrl,
      });
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const response = await fetch(`${BACKEND_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);

        Cookies.set("userName", data.user.name, { secure: true, sameSite: "lax" });
        Cookies.set("userEmail", data.user.email, { secure: true, sameSite: "lax" });
        Cookies.set("userPhotoUrl", result.user.photoURL, { secure: true, sameSite: "lax" });

        setUser({
          name: data.user.name,
          email: data.user.email,
          photoUrl: result.user.photoURL,
        });

      } else {
        const errorData = await response.json();
        console.log("Login failed:", errorData.message);
        alert("Login failed: " + errorData.message);
      }
    } catch (error) {
      console.log("Login error:", error);
      alert("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Cookies.remove("userName");
    Cookies.remove("userEmail");
    Cookies.remove("userPhotoUrl");
  
    setUser(null);
  
    router.push("/");
  
    await fetch(`${BACKEND_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
  };

  return (
    <>
      {!user ? (
        <button
          onClick={handleLogin}
          className={`px-6 py-3 rounded-lg text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login with Google"}
        </button>
      ) : (
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center space-x-2 text-white bg-blue-600 p-3 rounded-full"
          >
            <img
              src={user.photoUrl || "/profile.jpg"}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
            <span>{user.name}</span>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2 w-40">
              <button
                onClick={handleLogout}
                className="block text-gray-700 hover:bg-gray-200 px-4 py-2 text-left w-full"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
