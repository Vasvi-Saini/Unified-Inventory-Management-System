"use client";
import { useUserContext } from "@/Components/contexts/UserContext";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function page() {
  const { user } = useUserContext();

  if (!user) {
  redirect('/login')
  }

  return (
    // <div>
    //   home page
    //   <Link href={"/product"}>Go to dashboard</Link>
    // </div>
    // pages/index.js or app/page.js

    <div className="relative">
      {/* Hero Background Image */}
      <div
        className="fixed top-0 left-0 z-0 inset-0 w-[99vw]  bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      ></div>

      {/* Navigation Header */}
      {/* <header className="relative z-10 p-6">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <Link className="flex items-center space-x-3" href={"/"}>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-white font-semibold text-xl">UIMS</span>
          </Link>

          <div className="flex items-center space-x-2 text-white">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              {user?.name
                ?.split(" ")
                .map((word) => word[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()}
            </div>
            <span className="text-sm">{user?.name}</span>
            <span className="text-xs text-gray-400">{user?.role}</span>
          </div>
        </nav>
      </header> */}
 
      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center text-white max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Unified Inventory
            <span className="block text-blue-400">Management System</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Streamline your inventory operations with real-time tracking,
            analytics, and comprehensive management tools.
          </p>

          <Link
            href="/product"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
