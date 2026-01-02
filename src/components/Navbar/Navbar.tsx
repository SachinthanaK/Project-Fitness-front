"use client";
import React from "react";
import logo from "@/assets/logo.png";
import "./Navbar.css";
import Image from "next/image";
import Link from "next/link";
import AuthPopup from "../AuthPopup/AuthPopup";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isloggedin, setIsloggedin] = React.useState<boolean>(false);
  const [showpopup, setShowpopup] = React.useState<boolean>(false);

  const checklogin = async () => {
    // to check if user is logged in and return boolean
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/auth/checklogin", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.ok) {
          setIsloggedin(true);
        } else {
          setIsloggedin(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogOut = async () => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/auth/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setIsloggedin(false);
          toast.success("Logged out successfully", { position: "top-center" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    checklogin();
  }, [showpopup]);

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isloggedin) {
      window.location.href = "/profile";
    } else {
      setShowpopup(true);
      toast.info("Please login to view your profile", {
        position: "top-center",
      });
    }
  };

  return (
    <nav>
      <Image
        src={logo}
        alt="Logo"
        onClick={() => {
          window.location.href = "/";
        }}
      />
      <div className="tabs">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <a href="/profile" onClick={handleProfileClick}>
          Profile
        </a>
      </div>

      {isloggedin ? (
        <button onClick={handleLogOut}>Logout</button>
      ) : (
        <button
          onClick={() => {
            setShowpopup(true);
          }}
        >
          Login
        </button>
      )}

      {showpopup && <AuthPopup setShowpopup={setShowpopup} />}
    </nav>
  );
};

export default Navbar;
