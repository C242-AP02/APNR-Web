'use client'
import LoadingSpinner from "@/components/LoadingSpinner";
import { provider, auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import React, { useContext, createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { BACKEND_URL } from "@/constant/configuration";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
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
          await response.json();
  
          setUser({
            name: Cookies.get("name"),
            email: Cookies.get("email"),
            photoUrl: Cookies.get("picture"),
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
      setUser(null);
    
      router.push("/");
    
      await fetch(`${BACKEND_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    };
    
    useEffect(() => {
    const name = Cookies.get("name");
    const email = Cookies.get("email");
    const picture = Cookies.get("picture");

    if (!!name && !!email) {
      setUser({
        name: name,
        email: email,
        photoUrl: picture,
      });
      }
    }, []);

    // useEffect(() => {
    //   const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
    //     if (authUser) {
    //       const token = Cookies.get("token");
    //       const name = Cookies.get("userName");
    //       const email = Cookies.get("userEmail");
    //       const photoUrl = Cookies.get("userPhotoUrl");
    //       const uid = Cookies.get("uid");

    //       setUser({
    //         idToken: token || await authUser.getIdToken(),
    //         name: name || authUser.displayName,
    //         email: email || authUser.email,
    //         photoUrl: photoUrl || authUser.photoURL,
    //         uid: uid || authUser.uid,
    //       });
    //     } else {
    //       setUser(null);
    //     }
    //   });
  
    //   return () => unsubscribe();
    // }, []);

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