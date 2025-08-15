'use client';

import Home from '@/app/page';
import Image from 'next/image';
import React, { useState } from 'react'
import Link from 'next/link';


function Navbar() {
  const [isClicked, setIsClicked] = useState("Home");
  const navItems = ["Home", "Features", "About Us"];

  return (

    <div className="fixed top-0 left-0 w-full bg-[#42307D] z-20">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">


        <Link href={'/'}>
          <div>
            <Image
              className="text-black"
              src="/Medlogo.png"
              alt="MedReminder logo"
              width={100}
              height={90}
              priority
            />
          </div>
        </Link>



        <ul className="flex items-center text-white space-x-8">
          {navItems.map((item) => (
            <Link
              href={
                item === "Home"
                  ? "/"
                  : item === "About Us"
                    ? "/about"
                    : `/${item.toLowerCase()}`
              }
              key={item}
              className={`cursor-pointer underline-offset-8 transition-all duration-200 ${isClicked === item ? "underline" : "hover:underline"
                }`}
              onClick={() => setIsClicked(item)}
            >
              {item}
            </Link>
          ))}
        </ul>

        {/* Dropdown Menu for Login/Signup will be added when signin islogged =True */}
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className='bg-white border text-dark p-2 rounded-2xl px-4 '>Login</Link>
          <Link href="/signup" className='bg-[#4B4EFC] border text-white p-2 rounded-2xl px-4 '>SignUp</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar