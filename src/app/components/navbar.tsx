'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import medlogo from '/public/Medlogo.png';

function Navbar() {
  const [isClicked, setIsClicked] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; avatar: string; role: string }>({
    name: "",
    avatar: "",
    role: "",
  });

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } else {
        setUser({ name: "", avatar: "", role: "" });
        setIsLoggedIn(false);
      }
    };

    loadUser();
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({ name: "", avatar: "", role: "" });
    setIsLoggedIn(false);
    setProfileOpen(false);
    setMenuOpen(false);
  };

  const navItems = ["Home", "Features", "Contact Us"];

  return (
    <div className="fixed top-0 left-0 w-full bg-[#000D44] z-20 shadow-md mb-20">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 md:py-0">
        <Link href="/" onClick={() => setIsClicked("")}>
          <Image
            className="cursor-pointer w-16 sm:w-20 md:w-24 h-auto"
            src={medlogo}
            alt="MedReminder logo"
            width={100}
            height={90}
            priority
          />
        </Link>

        <ul className="hidden md:flex items-center text-white space-x-6 lg:space-x-10 font-medium text-sm lg:text-base">
          {navItems.map((item) => (
            <Link
              href={
                item === "Home"
                  ? "/"
                  : item === "Contact Us"
                  ? "/about"
                  : `/${item.toLowerCase()}`
              }
              key={item}
              className={`cursor-pointer underline-offset-8 transition-all duration-200 
                ${isClicked === item ? "underline decoration-2" : "hover:underline"}`}
              onClick={() => setIsClicked(item)}
            >
              {item}
            </Link>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3 w-48 lg:w-56 justify-end">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                onClick={() => setIsClicked("")}
                className="flex-1 bg-white text-[#000D44] font-semibold border border-gray-200 px-3 py-2 lg:px-4 lg:py-2 rounded-xl text-center hover:bg-gray-100 transition text-sm lg:text-base"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsClicked("")}
                className="flex-1 bg-[#4B4EFC] text-white font-semibold border border-[#4B4EFC] px-3 py-2 lg:px-4 lg:py-2 rounded-xl text-center hover:bg-[#3737e8] transition text-sm lg:text-base"
              >
                SignUp
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                className="flex items-center gap-2 text-white focus:outline-none"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <Image
                  src={user.avatar || "/profile.png"}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full border border-gray-300"
                />
                <span className="hidden sm:inline font-medium">{user.name || "User"}</span>
                <ChevronDown size={18} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-30">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile
                  </Link>

                  {user.role === "medical" && (
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}

                  {user.role === "patient" && (
                    <Link
                      href="/notifications"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileOpen(false)}
                    >
                      Notifications
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`md:hidden bg-[#000D44] text-white px-6 py-4 space-y-3 transition-all duration-300 ease-in-out 
        ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <ul className="flex flex-col space-y-3 text-sm sm:text-base">
          {navItems.map((item) => (
            <Link
              href={
                item === "Home"
                  ? "/"
                  : item === "Contact Us"
                  ? "/about"
                  : `/${item.toLowerCase()}`
              }
              key={item}
              className={`cursor-pointer underline-offset-8 transition-all duration-200 
                ${isClicked === item ? "underline decoration-2" : "hover:underline"}`}
              onClick={() => {
                setIsClicked(item);
                setMenuOpen(false);
              }}
            >
              {item}
            </Link>
          ))}
        </ul>

        <div className="flex flex-col gap-3 mt-4 w-full">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                onClick={() => {
                  setIsClicked("");
                  setMenuOpen(false);
                }}
                className="w-full bg-white text-[#000D44] font-semibold border border-gray-200 px-4 py-2 rounded-xl text-center hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => {
                  setIsClicked("");
                  setMenuOpen(false);
                }}
                className="w-full bg-[#4B4EFC] text-white font-semibold border border-[#4B4EFC] px-4 py-2 rounded-xl text-center hover:bg-[#3737e8] transition"
              >
                SignUp
              </Link>
            </>
          ) : (
            <div className="border-t border-gray-600 pt-4">
              <div className="flex items-center gap-2 mb-3">
                <Image
                  src={user.avatar || "/profile.png"}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full border border-gray-300"
                />
                <span className="font-medium">{user.name || "User"}</span>
              </div>

              <Link
                href="/profile"
                className="block py-2 text-sm hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>

              {user.role === "medical" && (
                <Link
                  href="/dashboard"
                  className="block py-2 text-sm hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}

              {user.role === "patient" && (
                <Link
                  href="/notifications"
                  className="block py-2 text-sm hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  Notifications
                </Link>
              )}

              <button
                className="w-full text-left py-2 text-sm text-red-400 hover:underline"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
