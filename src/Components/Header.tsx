"use client";
import React from "react";
import { useUserContext } from "./contexts/UserContext";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ThemeBtn from "./Buttons/ThemeBtn";
import ProfileDropDown from "./ProfileDropDown";

export default function Header() {
  const { user } = useUserContext();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={`h-19 sticky top-0 z-50 items-center justify-between flex px-4 sm:px-6 transition-all duration-300 ${
        isHome
          ? "bg-transparent"
          : "backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm"
      }`}
    >
       
        <Link href="/" className="flex items-center space-x-3 group">
          <Image
            src="/icon.png"
            alt="UIMS Logo"
            width={40}
            height={40}
            className="w-10 h-10 rounded-xl object-cover shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105"
          />
          <div className="hidden sm:block">
              <span className="dark:text-white font-bold text-xl tracking-tight drop-shadow-lg">
                UIMS
              </span>
              <div className="text-xs dark:text-white/80 -mt-0.5 drop-shadow-md">
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
