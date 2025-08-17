"use client";
import React, { useContext } from "react";


import { useUserContext } from "./contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
import ThemeBtn from "./Buttons/ThemeBtn";
import ProfileDropDown from "./ProfileDropDown";

export default function Header() {
  const { user } = useUserContext();

  return (
    <header className="h-19 relative z-10 border-1 bg-transparent items-center justify-between  flex px-4 ">
       
          <Link href={"/"} className="flex items-center">
       <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="dark:text-white text-black font-semibold text-xl">UIMS</span>
            </div>
        </Link>

        <div className="flex gap-6">
      <ThemeBtn />
      <ProfileDropDown/>
      
      </div>
    </header>
  );
}
