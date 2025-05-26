import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Fetch books from the database with optional search and category filters.
 *
 * @param {string} searchQuery - Optional search term for title/author.
 * @param {string|null} category - Optional enum category (e.g., "ART", "HISTORY", "SCIENCE").
 * @returns {Promise<Array>} - List of matching books.
 */
export default async function getBooks(searchQuery = "", category = "All") {
  const filters = [];

  // Search by title or author
  if (searchQuery) {
    filters.push({
      OR: [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { author: { contains: searchQuery, mode: "insensitive" } }
      ]
    });
  }

  // Filter by category (must match enum exactly)
  if (category && category !== "All") {
    filters.push({ category }); // enum match, case-sensitive
  }

  const where = filters.length > 0 ? { AND: filters } : {};

  return await prisma.book.findMany({ where });
}
