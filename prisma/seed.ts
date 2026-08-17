import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

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

  console.log("Admin guest user seeded successfully:", adminUser);
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
