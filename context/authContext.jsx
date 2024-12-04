'use client'
import LoadingSpinner from "@/components/LoadingSpinner";
import { provider, auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import React, { useContext, createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const router = useRouter()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)

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
          Cookies.set("token", result.user.idToken, { secure: true, sameSite: "lax" });
          Cookies.set("uid", result.user.uid, { secure: true, sameSite: "lax" });
  
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
      Cookies.remove("token");
      Cookies.remove("uid")
    
      setUser(null);
    
      router.push("/");
    
      await fetch(`${BACKEND_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    };
    
    useEffect(() => {
    const userName = Cookies.get("userName");
    const userEmail = Cookies.get("userEmail");
    const userPhotoUrl = Cookies.get("userPhotoUrl");
    const token = Cookies.get("token");
    const uid = Cookies.get("uid");

    if (userName && userEmail) {
      setUser({
        name: userName,
        email: userEmail,
        photoUrl: userPhotoUrl,
        token: token,
        uid: uid
      });
      }
    }, []);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
        if (authUser) {
          const token = Cookies.get("token");
          const name = Cookies.get("userName");
          const email = Cookies.get("userEmail");
          const photoUrl = Cookies.get("userPhotoUrl");
          const uid = Cookies.get("uid");

  
          setUser({
            idToken: token || await authUser.getIdToken(),
            name: name || authUser.displayName,
            email: email || authUser.email,
            photoUrl: photoUrl || authUser.photoURL,
            uid: uid || authUser.uid,
          });
        } else {
          setUser(null);
        }
      });
  
      return () => unsubscribe();
    }, []);

    return (
      <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
        {loading && <LoadingSpinner overlay/>}
        {children}
      </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return context;
};