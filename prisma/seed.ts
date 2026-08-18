import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with initial users and products...");

  // 1. Seed Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: "admin04@gmail.com" },
    update: {
      password: "Admin@04",
      role: "admin",
    },
    create: {
      name: "Admin User",
      email: "admin04@gmail.com",
      username: "admin04",
      password: "Admin@04",
      role: "admin",
    },
  });
  console.log("Admin guest user seeded:", adminUser.email);

  // 2. Seed Staff and Manager Users
  const sampleUsers = [
    {
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      username: "rahul_s",
      password: "User@123",
      role: "manager" as const,
    },
    {
      name: "Priya Patel",
      email: "priya@gmail.com",
      username: "priya_p",
      password: "User@123",
      role: "staff" as const,
    },
    {
      name: "Amit Verma",
      email: "amit@gmail.com",
      username: "amit_v",
      password: "User@123",
      role: "staff" as const,
    },
  ];

  for (const u of sampleUsers) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: u,
      create: u,
    });
  }
  console.log("Sample members seeded.");

  // 3. Seed Sample Products
  const sampleProducts = [
    {
      title: "MacBook Pro M3",
      description: "High-performance Apple laptop with M3 chip, 16GB RAM, 512GB SSD.",
      category: "electronics" as const,
      price: 1499.99,
      stock: 15,
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Sony WH-1000XM5 Headphones",
      description: "Industry leading noise canceling wireless headphones.",
      category: "electronics" as const,
      price: 399.99,
      stock: 30,
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Ergonomic Office Chair",
      description: "Breathable mesh chair with lumbar support and adjustable armrests.",
      category: "furniture" as const,
      price: 249.50,
      stock: 20,
      imageUrl: "https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Smart Fitness Watch",
      description: "Track heart rate, sleep, workouts and GPS navigation.",
      category: "electronics" as const,
      price: 199.00,
      stock: 45,
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Organic Skincare Serum",
      description: "Hydrating hyaluronic acid and Vitamin C face serum.",
      category: "beauty" as const,
      price: 34.99,
      stock: 60,
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Classic Denim Jacket",
      description: "Premium cotton vintage denim jacket.",
      category: "clothing" as const,
      price: 79.99,
      stock: 25,
      imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80",
    },
  ];

  for (const p of sampleProducts) {
    const existing = await prisma.product.findFirst({
      where: { title: p.title },
    });
    if (!existing) {
      await prisma.product.create({ data: p });
    }
  }
  console.log("Sample products seeded.");

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
