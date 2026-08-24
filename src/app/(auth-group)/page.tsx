"use client";
import { useUserContext } from "@/Components/contexts/UserContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "@/Components/ui/Spinner";

export default function page() {
  const { user } = useUserContext();
  const router = useRouter();
  const pathname = usePathname();
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    setNavigating(false);
  }, [pathname]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setNavigating(true);
    router.push("/product");
  };

  return (
    <div className="relative w-full h-[calc(100vh-4.75rem)] overflow-hidden flex items-center justify-center">
      {/* Full screen Background Image extending behind transparent header */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      ></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
          Unified Inventory
          <span className="block text-blue-400">Management System</span>
        </h1>

        <p className="text-lg md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Streamline your inventory operations with real-time tracking,
          analytics, and comprehensive management tools.
        </p>

        <button
          onClick={handleDashboardClick}
          disabled={navigating}
          className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-3.5 rounded-lg font-semibold text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl cursor-pointer disabled:opacity-80"
        >
          {navigating && <Spinner size={22} />}
          <span>{navigating ? "Loading Dashboard..." : "Go to Dashboard"}</span>
        </button>
      </div>
    </div>
  );
}
