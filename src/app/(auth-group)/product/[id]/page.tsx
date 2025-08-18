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



// import AddSaleButton from "@/Components/Buttons/addSaleBtn";
// import ProductSaleChart from "@/Components/ProductSaleChart";
// import { GET_PRODUCT } from "@/lib/gql/queries";
// import gqlClient from "@/services/graphql";
// import { ProductWithSales } from "@/types";
// import { AlertCircle, CheckCircle, Clock } from "lucide-react";
// import Image from "next/image";
// import { notFound } from "next/navigation";

// type Param = Promise<{
//   id: string;
// }>;

// export default async function page({ params }: { params: Param }) {
//   const { id } = await params;
  
//   let product;
//   try {
//     const res: {
//       product: ProductWithSales;
//     } = await gqlClient.request(GET_PRODUCT, { id });

//     if (res?.product) {
//       product = res.product;
//     } else {
//       notFound();
//     }
//   } catch (err: any) {
//     console.log(err.message);
//     notFound();
//   }

//   const chartData =
//     product?.sales.map((sale) => {
//       const date = new Date(Number(sale.createdAt));
//       const format =
//         date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
//       const quantity = sale.quantity;
//       const obj = {
//         date: format,
//         quantity,
//       };
//       return obj;
//     }) || [];
    
//    const getStockStatus = () => {
//     if (product.stock === 0)
//       return {
//         icon: AlertCircle,
//         text: "Out of Stock",
//         color: "text-red-400",
//         bg: "bg-red-500/10",
//         border: "border-red-500/30",
//       };
//     if (product.stock <= 5)
//       return {
//         icon: Clock,
//         text: "Low Stock",
//         color: "text-amber-400",
//         bg: "bg-amber-500/10",
//         border: "border-amber-500/30",
//       };
//     return {
//       icon: CheckCircle,
//       text: "In Stock",
//       color: "text-green-400",
//       bg: "bg-green-500/10",
//       border: "border-green-500/30",
//     };
//   };

//   const stockStatus = getStockStatus();
//   const StockIcon = stockStatus.icon;

//   return (
//     <div className="w-full h-[85vh] min-h-[85vh] p-6 ">
//       <div className="flex justify-between h-[80%] w-full">
//         <div className="w-[35%] h-full p-4">
//           <div className="relative h-full w-full">
//             <Image fill src={product.imageUrl} alt={"product_image"} />
//           </div>
//         </div>
//         <div className="w-[25%] p-4 flex flex-col gap-4 items-center justify-between">
//           <div className="flex flex-col gap-4 items-center">
//           <h1 className="text-4xl font-bold">{product.title}</h1>
//           <p className="text-lg">Description: {product.description}</p>
//           <span>Price: ${product.price}</span>
//           <span>Stocks: {product.stock}</span>
//           <span className="border border-white rounded-2xl w-fit min-w-10 py-0.5 px-3">
//             {product.category}
//           </span>
//           </div>
//          <AddSaleButton product={product}/>
//         </div>
        
//        <div className=" dark:bg-gray-800/50 rounded-lg border border-gray-700 p-4 w-[40%]">
//               <ProductSaleChart chartData={chartData} />
//             </div>
//       </div>
//     </div>
//   );
// }


// import AddSaleButton from "@/Components/Buttons/addSaleBtn";
// import ProductSaleChart from "@/Components/ProductSaleChart";
// import { GET_PRODUCT } from "@/lib/gql/queries";
// import gqlClient from "@/services/graphql";
// import { ProductWithSales } from "@/types";
// import { AlertCircle, CheckCircle, Clock } from "lucide-react";
// import Image from "next/image";
// import { notFound } from "next/navigation";

// type Param = Promise<{
//   id: string;
// }>;

// export default async function page({ params }: { params: Param }) {
//   const { id } = await params;
  
//   let product;
//   try {
//     const res: {
//       product: ProductWithSales;
//     } = await gqlClient.request(GET_PRODUCT, { id });

//     if (res?.product) {
//       product = res.product;
//     } else {
//       notFound();
//     }
//   } catch (err: any) {
//     console.log(err.message);
//     notFound();
//   }

//   const chartData =
//     product?.sales.map((sale) => {
//       const date = new Date(Number(sale.createdAt));
//       const format =
//         date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
//       const quantity = sale.quantity;
//       const obj = {
//         date: format,
//         quantity,
//       };
//       return obj;
//     }) || [];
    
//   const getStockStatus = () => {
//     if (product.stock === 0)
//       return {
//         icon: AlertCircle,
//         text: "Out of Stock",
//         color: "text-red-400",
//         bg: "bg-red-500/10",
//         border: "border-red-500/30",
//       };
//     if (product.stock <= 5)
//       return {
//         icon: Clock,
//         text: "Low Stock",
//         color: "text-amber-400",
//         bg: "bg-amber-500/10",
//         border: "border-amber-500/30",
//       };
//     return {
//       icon: CheckCircle,
//       text: "In Stock",
//       color: "text-green-400",
//       bg: "bg-green-500/10",
//       border: "border-green-500/30",
//     };
//   };

//   const stockStatus = getStockStatus();
//   const StockIcon = stockStatus.icon;

//   return (
//     <div className="w-full min-h-screen p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
//           {/* Product Image */}
//           <div className="w-full lg:w-[35%]">
//             <div className="relative aspect-square w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
//               <Image 
//                 fill 
//                 src={product.imageUrl} 
//                 alt={product.title}
//                 className="object-cover"
//                 priority
//               />
//             </div>
//           </div>

//           {/* Product Details */}
//           <div className="w-full lg:w-[30%] bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
//             <div className="space-y-4">
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
//                 {product.title}
//               </h1>
              
//               <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
//                 {product.description}
//               </p>
              
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600 dark:text-gray-400">Price:</span>
//                   <span className="text-xl font-semibold text-blue-600 dark:text-blue-400">
//                     ${product.price}
//                   </span>
//                 </div>
                
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600 dark:text-gray-400">Stock:</span>
//                   <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${stockStatus.bg} ${stockStatus.border} border`}>
//                     <StockIcon className={`w-4 h-4 ${stockStatus.color}`} />
//                     <span className={stockStatus.color}>
//                       {product.stock} {stockStatus.text}
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600 dark:text-gray-400">Category:</span>
//                   <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600">
//                     {product.category}
//                   </span>
//                 </div>
//               </div>
              
//               <div className="pt-4">
//                 <AddSaleButton product={product} />
//               </div>
//             </div>
//           </div>
          
//           {/* Sales Chart */}
//           <div className="w-full lg:w-[35%] bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
//             <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//               Sales Analytics
//             </h2>
//             <div className="w-full h-64 md:h-80">
//               <ProductSaleChart chartData={chartData} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import AddSaleButton from "@/Components/Buttons/addSaleBtn";
import ProductSaleChart from "@/Components/ProductSaleChart";
import { GET_PRODUCT } from "@/lib/gql/queries";
import gqlClient from "@/services/graphql";
import { ProductWithSales } from "@/types";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
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
    
  const getStockStatus = () => {
    if (product.stock === 0)
      return {
        icon: AlertCircle,
        text: "Out of Stock",
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/30",
      };
    if (product.stock <= 5)
      return {
        icon: Clock,
        text: "Low Stock",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/30",
      };
    return {
      icon: CheckCircle,
      text: "In Stock",
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/30",
    };
  };

  const stockStatus = getStockStatus();
  const StockIcon = stockStatus.icon;

  return (
    <div className="w-full min-h-screen p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Product Image */}
          <div className="w-full lg:w-[35%]">
            <div className="relative aspect-square w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <Image 
                fill 
                src={product.imageUrl} 
                alt={product.title}
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-[30%] bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {product.title}
              </h1>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                {product.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Price:</span>
                  <span className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                    ${product.price}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Stock:</span>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${stockStatus.bg} ${stockStatus.border} border`}>
                    <StockIcon className={`w-4 h-4 ${stockStatus.color}`} />
                    <span className={stockStatus.color}>
                      {product.stock} {stockStatus.text}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Category:</span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="pt-4">
                <AddSaleButton product={product} />
              </div>
            </div>
          </div>
          
          {/* Sales Chart */}
          <div className="w-full lg:w-[35%] bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Sales Analytics
            </h2>
            <div className="w-full h-64 md:h-80">
              <ProductSaleChart chartData={chartData} />
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Product Specifications */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Product Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Product ID:</span>
                <span className="text-gray-900 dark:text-white font-mono">{product.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Created At:</span>
                <span className="text-gray-900 dark:text-white">
                 {product.sales.length > 0 
                    ? new Date(Number(product.sales[product.sales.length - 1].createdAt)).toLocaleDateString()
                    : 'No sales yet'
                  }
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Total Sales:</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                  {product.sales.length} transactions
                </span>
              </div>
            </div>
          </div>

          {/* Sales Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Sales Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Total Quantity Sold:</span>
                <span className="text-green-600 dark:text-green-400 font-semibold">
                  {product.sales.reduce((sum, sale) => sum + sale.quantity, 0)} units
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Revenue Generated:</span>
                <span className="text-green-600 dark:text-green-400 font-semibold">
                  ${(product.sales.reduce((sum, sale) => sum + sale.quantity, 0) * product.price).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Average per Sale:</span>
                <span className="text-gray-900 dark:text-white">
                  {product.sales.length > 0 
                    ? (product.sales.reduce((sum, sale) => sum + sale.quantity, 0) / product.sales.length).toFixed(1)
                    : '0'} units
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Stock Turnover:</span>
                <span className="text-gray-900 dark:text-white">
                  {product.sales.length > 0 
                    ? ((product.sales.reduce((sum, sale) => sum + sale.quantity, 0) / (product.stock + product.sales.reduce((sum, sale) => sum + sale.quantity, 0))) * 100).toFixed(1)
                    : '0'}%
                </span>
              </div>
            </div>
          </div>

          {/* Inventory Management */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Inventory Status
            </h3>
            <div className="space-y-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${Math.min(100, (product.stock / 20) * 100)}%` 
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Current Stock:</span>
                <span className="font-semibold">{product.stock} units</span>
              </div>
              
              {product.stock <= 5 && (
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="text-amber-800 dark:text-amber-200 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Stock running low. Consider restocking soon.
                  </p>
                </div>
              )}
              
              {product.stock === 0 && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-800 dark:text-red-200 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Out of stock! Immediate restocking required.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

