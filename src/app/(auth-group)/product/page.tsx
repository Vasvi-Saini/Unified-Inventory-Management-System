"use client";
import AdminDashboard from "@/Components/AdminDashboard";
import { useUserContext } from "@/Components/contexts/UserContext";

import ProductList from "@/Components/ProductList";

export default function Home() {
  const { user } = useUserContext();

  return (

  <main className="w-full px-12">
    {user?.role === "admin" ? (
      <div className="flex justify-between w-full">
        <ProductList className={
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        } />
        <AdminDashboard />
      </div>
    ) : (
      <ProductList className={
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 w-full gap-6"
      } />
    )}
  </main>

  );
}
