"use client";
import { useState } from "react";
import AdminDashboard from "@/Components/AdminDashboard";
import { useUserContext } from "@/Components/contexts/UserContext";
import ProductList from "@/Components/ProductList";
import { Package, Shield } from "lucide-react";

export default function Home() {
  const { user } = useUserContext();
  const [activeTab, setActiveTab] = useState<"products" | "admin">("products");

  return (
    <main className="w-full px-4 sm:px-6 md:px-12 pb-12">
      {user?.role === "admin" ? (
        <div className="w-full">
          {/* Mobile Tab Toggle (< lg screens) */}
          <div className="flex lg:hidden w-full bg-gray-100 dark:bg-gray-900 p-1.5 rounded-xl my-4 border border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                activeTab === "products"
                  ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm font-semibold"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Package size={18} />
              <span>Products</span>
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                activeTab === "admin"
                  ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm font-semibold"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Shield size={18} />
              <span>Admin Panel</span>
            </button>
          </div>

          {/* Desktop & Mobile Responsive Grid */}
          <div className="flex flex-col lg:flex-row gap-6 justify-between w-full">
            <div
              className={`w-full lg:w-[70%] xl:w-[72%] ${
                activeTab === "products" ? "block" : "hidden lg:block"
              }`}
            >
              <ProductList
                className={
                  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                }
              />
            </div>
            <div
              className={`w-full lg:w-[28%] xl:w-[25%] ${
                activeTab === "admin" ? "block" : "hidden lg:block"
              }`}
            >
              <AdminDashboard />
            </div>
          </div>
        </div>
      ) : (
        <ProductList
          className={
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 w-full gap-6"
          }
        />
      )}
    </main>
  );
}
