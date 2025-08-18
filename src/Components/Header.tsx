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
       
        <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-xl tracking-tight drop-shadow-lg">
                UIMS
              </span>
              <div className="text-xs text-white/80 -mt-0.5 drop-shadow-md">
                Inventory Management
              </div>
            </div>
          </Link>

        <div className="flex gap-6">
      <ThemeBtn />
      <ProfileDropDown/>
      
      </div>
    </header>
  );
}
