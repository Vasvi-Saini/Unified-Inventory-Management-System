"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Product } from "../../../generated/prisma";
import { useUserContext } from "../contexts/UserContext";
import Removeprod from "../RemoveProd";
import Updateproduct from "../UpdateProduct";
import { Spinner } from "../ui/Spinner";

export default function ProductCard({ product }: { product: Product }) {
  const { user } = useUserContext();
  const router = useRouter();
  const pathname = usePathname();
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    setNavigating(false);
  }, [pathname]);

  const categoryColors: Record<string, string> = {
    electronics: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    beauty: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
    food: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
    accessories: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
    clothing: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    furniture: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    decor: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    others: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  };

  const handleCardClick = () => {
    setNavigating(true);
    router.push("/product/" + product.id);
  };

  return (
    <div className="rounded-lg shadow-lg p-6 relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 group hover:shadow-xl transition-all duration-300">
      {navigating && (
        <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-[2px] rounded-lg flex items-center justify-center gap-2 text-white font-medium">
          <Spinner size={24} className="text-blue-500" />
          <span className="text-sm">Loading details...</span>
        </div>
      )}

      <div
        onClick={handleCardClick}
        className="cursor-pointer space-y-3"
      >
        <div className="relative overflow-hidden rounded-lg mb-4">
          <img
            src={product.imageUrl || undefined}
            alt={product.title}
            className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold dark:text-white group-hover:text-blue-500 transition-colors">
            {product.title}
          </h3>
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-xs px-2 py-1 rounded">
            NEW
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
          {product.description}
        </p>

        <div className="text-xl font-bold dark:text-white">
          ${product.price}
        </div>
      </div>

      <div className="flex justify-between items-center text-sm pt-3 border-t border-gray-100 dark:border-gray-800 mt-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            categoryColors[product.category] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          {product.category}
        </span>

        {user?.role !== "staff" && user ? (
          <div className="flex gap-2">
            <span>
              <Updateproduct prod={product} />
            </span>
            <span>
              <Removeprod id={product.id} />
            </span>
          </div>
        ) : (
          <span className="text-gray-500 dark:text-gray-400">{product.stock} left</span>
        )}
      </div>
    </div>
  );
}
