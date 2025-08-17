import prismaClient from "@/services/prisma";
import { ProductCategory } from "../../../../../generated/prisma";

export async function addProduct(
  _: any,
  args: {
    title: string;
    description: string;
    imageUrl: string;
    category: ProductCategory;
    price: number;
    stock: number;
  }
) {
  try {
    const createProduct = await prismaClient.product.create({
      data: args,
    });
    return createProduct;
  } catch (e) {
    return null;
  }
}

export async function getAllProducts(_: any, args: {}) {
  try {
    const products = await prismaClient.product.findMany();
    return products;
  } catch (e: any) {
    alert(e.message);
    console.log("resolver s error", e.message);
  }
}

export async function getProduct(
  _: any,
  args: {
    id: string;
  }
) {
  const id = args.id;
  try {
    const product = await prismaClient.product.findUnique({
      where: {
        id: id,
      },
      include: {
        sales: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    if (product) return product;
    return null;
  } catch (e: any) {
    return null;
  }
}

export async function createSale(
  _: any,
  args: {
    id: string;
    quantity: number;
  }
) {
  try {
    const sale = await prismaClient.sale.create({
      data: {
        productId: args.id,
        quantity: args.quantity,
      },
    });
    if (sale) {
      await prismaClient.product.update({
        where: {
          id: args.id,
        },
        data: {
          stock: {
            decrement: args.quantity, // we have increment too
          },
        },
      });
    }
    return true;
  } catch (e) {
    return false;
  }
}

export async function removeprod(x: any, args: any) {
  try {
    const resp = await prismaClient.product.delete({
      where: {
        id: args.id,
      },
    });
    return true;
  } catch (e: any) {
    return false;
  }
}
