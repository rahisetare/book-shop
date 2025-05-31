"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

const BookCategoryFilter = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [quantities, setQuantities] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append("searchQuery", searchQuery);
        if (category) params.append("category", category);

        const res = await fetch(`/api/books?${params.toString()}`);
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Failed to fetch books", err);
      }
    };

    fetchBooks();
  }, [category, searchQuery]);

  const handleAddToBag = (book) => {
    const quantity = quantities[book.id] || 1;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingIndex = cart.findIndex((item) => item.id === book.id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
      if (cart[existingIndex].quantity > 10) {
        cart[existingIndex].quantity = 10;
      }
    } else {
      cart.push({ ...book, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${book.title} (x${quantity}) added to bag.`);
    router.refresh(); // refresh for reactivity
  };

  const handleQuantityChange = (bookId, value) => {
    const val = Math.max(1, Math.min(10, parseInt(value) || 1));
    setQuantities({ ...quantities, [bookId]: val });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Books</h1>

      {/* Filter */}
      <div className="my-4 text-center">
        <label htmlFor="category" className="block text-lg mb-1">
          Filter by Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All</option>
          <option value="HISTORY">History</option>
          <option value="ART">Art</option>
          <option value="SCIENCE">Science</option>
          <option value="LITERATURE">Literature</option>
        </select>
      </div>

      {/* Search input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title or author..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 lg:px-20">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book.id}
              className="border p-5 rounded-lg shadow-sm text-sm flex flex-col justify-between max-w-250px mx-5"
            >
              <div>
                <h2 className="font-semibold text-base">{book.title}</h2>
                <p className="text-xs text-gray-500">{book.author}</p>
                <p className="text-sm font-medium text-gray-700">${book.price}</p>
                {book.imageUrl && (
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="mt-2 w-full h-100 object-cover rounded"
                  />
                )}
              </div>

              {/* Quantity + Add to Bag */}
              <div className="mt-4 flex items-center justify-between gap-2">
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={quantities[book.id] || 1}
                  onChange={(e) => handleQuantityChange(book.id, e.target.value)}
                  className="w-16 border rounded p-1"
                />
                <button
                  onClick={() => handleAddToBag(book)}
                  className="bg-black text-white px-4 py-2 rounded text-sm"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg col-span-full">
            No books found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default function BooksPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 container mx-auto p-4">
        <BookCategoryFilter />
      </main>
    </>
  );
}
