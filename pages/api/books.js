import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { searchQuery = "", category = "All" } = req.query;

  const filters = [];

  if (searchQuery) {
    filters.push({
      OR: [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { author: { contains: searchQuery, mode: "insensitive" } },
      ],
    });
  }

  if (category !== "All") {
    filters.push({ category });
  }

  const where = filters.length ? { AND: filters } : {};

  try {
    const books = await prisma.book.findMany({ where });
    res.status(200).json(books);
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "Failed to fetch books." });
  }
}
