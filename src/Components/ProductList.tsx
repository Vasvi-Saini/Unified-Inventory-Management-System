"use client";
import { GET_ALL_PRODUCTS } from "@/lib/gql/queries";
import gqlClient from "@/services/graphql";
import { useEffect, useState } from "react";
import { Product } from "../../generated/prisma";
import AddProduct from "./Buttons/AddProduct";
import ProductCard from "./Card/ProductCard";
import { useUserContext } from "./contexts/UserContext";

import { ProductCardSkeleton } from "./ui/Skeleton";

export default function ProductList({ className }: { className: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      try {
        const data: { getAllProducts: Product[] } = await gqlClient.request(
          GET_ALL_PRODUCTS
        );
        setProducts(data?.getAllProducts || []);
      } catch (e: any) {
        console.error(e.message);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  return (
    <div className="flex w-full flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-4 py-3 sm:py-4 md:py-5 lg:py-6">
      <h1 className="flex text-2xl sm:text-3xl md:text-4xl text-center justify-between items-center w-full font-bold">
        Products {user?.role !== "staff" && user && <AddProduct />}
      </h1>

      <div className={`${className} gap-6 w-full`}>
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center py-10 text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
}
