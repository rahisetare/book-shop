"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Navbar with mobile support
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-bold">MyBookStore</Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-sm">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/books" className="hover:underline font-semibold">Books</Link></li>
          <li><Link href="/about" className="hover:underline">About</Link></li>
          <li><Link href="/contact" className="hover:underline">Contact</Link></li>
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 px-6 text-sm">
          <Link href="/" className="block hover:underline">Home</Link>
          <Link href="/books" className="block hover:underline font-semibold">Books</Link>
          <Link href="/about" className="block hover:underline">About</Link>
          <Link href="/contact" className="block hover:underline">Contact</Link>
        </div>
      )}
    </nav>
  );
};

const BookCategoryFilter = () => {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params = new URLSearchParams();
if (searchQuery) params.append("searchQuery", searchQuery); // ✅ CORRECT
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

  const addToCart = (book) => {
    setCart((prevCart) => [...prevCart, book]);
  };

  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
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

      {/* Cart Section */}
      <div className="mb-10 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">No items in cart.</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-1"
              >
                <span className="text-sm">{item.title}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline text-xs"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
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
              <button
                onClick={() => addToCart(book)}
                className="mt-3 bg-black text-white px-3 py-1 rounded text-xs hover:bg-gray-800 transition"
              >
                Add to Bag
              </button>
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
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <BookCategoryFilter />
      </div>
    </div>
  );
}
