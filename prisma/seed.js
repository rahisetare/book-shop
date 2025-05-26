import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.book.createMany({
    data: [
      {
        title: "Shahnameh",
        author: "Ferdowsi",
        price: 19.99,
        imageUrl: "/books/shahnameh.jpg",
        category: "LITERATURE", // Ensure this matches the enum in the Prisma schema
      },
      {
        title: "Divan of Hafez",
        author: "Hafez",
        price: 14.99,
        imageUrl: "/books/hafez.jpg",
        category: "LITERATURE", // Ensure this matches the enum in the Prisma schema
      },
      // You can add more books here
    ],
  });
}

main()
  .then(() => {
    console.log("✅ Database seeded");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    return prisma.$disconnect();
  });
