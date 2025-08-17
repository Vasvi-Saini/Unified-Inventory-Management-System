// 'use client'
// import { useEffect, useState } from "react";
// import { Product } from "../../../../generated/prisma";
// import gqlClient from "@/services/graphql";
// import { GET_PRODUCT } from "@/lib/gql/queries";
// import AddSaleButton from "@/Components/Buttons/addSaleBtn";
// import ProductSaleChart from "@/Components/ProductSaleChart";

// type Param = Promise<{
//   id: string;
// }>;

// export default function ProductDetail({ params }: { params: Param }) {
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(false);
//   const { id } = await params;

//   useEffect(() => {
//     async function getProductDetails() {
//       const productData = await gqlClient.request(GET_PRODUCT, {
//         getProductId: id,
//       });
//       if (data?.getProduct) setProduct(data?.getProduct);
//     }
//     getProductDetails();
//   }, [id]);

//   console.log(product?.sales)

//   const chartData = product?.sales?.map((sale)=>{
//     const date = new Date(Number.parseInt(sale.createAt));
//     const format = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear;
//     const quantity = sale.qauntity;
//     const obj = {
//         date : format,
//         quantity
//     }
//     return obj;
//     console.log(data);
//   }) || [];
  
//   return (
//     <div>
//       {product?.map((p) => {
//         return (
//           <div>
//             <p>{p?.title}</p>
//             <p>{p?.stock}</p>
//             <AddSaleButton product={product} />
//             <div className="w-96 h-96"> 
//                   <ProductSaleChart data={chartData}/>
//             </div>
           
//           </div>
//         );
//       })}
//     </div>
//   );
// }



import AddSaleButton from "@/Components/Buttons/addSaleBtn";
import { GET_PRODUCT } from "@/lib/gql/queries";
import gqlClient from "@/services/graphql";
import { ProductWithSales } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";

type Param = Promise<{
  id: string;
}>;

export default async function page({ params }: { params: Param }) {
  const { id } = await params;
  
  let product;
  try {
    const res: {
      product: ProductWithSales;
    } = await gqlClient.request(GET_PRODUCT, { id });

    if (res?.product) {
      product = res.product;
    } else {
      notFound();
    }
  } catch (err: any) {
    console.log(err.message);
    notFound();
  }

  const chartData =
    product?.sales.map((sale) => {
      const date = new Date(Number(sale.createdAt));
      const format =
        date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
      const quantity = sale.quantity;
      const obj = {
        date: format,
        quantity,
      };
      return obj;
    }) || [];
    
  return (
    <div className="w-full h-[85vh] min-h-[85vh] p-6 ">
      <div className="flex justify-between h-[80%] w-full">
        <div className="w-[35%] h-full p-4">
          <div className="relative h-full w-full">
            <Image fill src={product.imageUrl} alt={"product_image"} />
          </div>
        </div>
        <div className="w-[25%] p-4 flex flex-col gap-4 items-center justify-between">
          <div className="flex flex-col gap-4 items-center">
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <p className="text-lg">Description: {product.description}</p>
          <span>Price: ${product.price}</span>
          <span>Stocks: {product.stock}</span>
          <span className="border border-white rounded-2xl w-fit min-w-10 py-0.5 px-3">
            {product.category}
          </span>
          </div>
         <AddSaleButton product={product}/>
        </div>
        
        <div className="flex flex-col gap-4 w-[40%] items-center">
         
          {/* <ProductSaleChart chartData={chartData} /> */}
        </div>
      </div>
    </div>
  );
}


