"use client";
import { GET_ALL_PRODUCTS } from "@/lib/gql/queries";
import gqlClient from "@/services/graphql";
import { useEffect, useState } from "react";
import { Product } from "../../generated/prisma";
import AddProduct from "./Buttons/AddProduct";
import ProductCard from "./Card/ProductCard";
import { useUserContext } from "./contexts/UserContext";

export default function ProductList({ className }: { className: string }) {

  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useUserContext();

  useEffect(() => {
    async function getProducts() {
      try {
        const data: { getAllProducts: Product[] } = await gqlClient.request(
          GET_ALL_PRODUCTS
        );
        setProducts(data?.getAllProducts || []);
      } catch (e: any) {
        return e.message;
      }
    }
    getProducts();
  }, []);

  return (
    <div className="flex w-[70%] flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-4 py-3 sm:py-4 md:py-5 lg:py-6 ">

      <h1 className="flex text-4xl text-center justify-between items-center w-full ">
        Products {user?.role !== "staff" && user && <AddProduct />}
      </h1>

      <div className={`${className} gap-6 w-full`} >
        {products?.map((product) => (
          
         
            
            <ProductCard  key={product.id} product={product} />

         

        ))}
      </div>
    </div>
  );
}
