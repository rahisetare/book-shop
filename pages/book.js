// pages/books.js
import React from 'react';
import BookCard from '../../components/BookCard';
// pages/anypage.js
import Navbar from "@/components/Navbar";

export default function book() {
  return (
    <>
      <Navbar />
      <div className="pt-24"> {/* padding-top to avoid overlap */}
        <h1 className="text-4xl font-bold">This is another page</h1>
        {/* Page content here */}
      </div>
    </>
  );
}


const books = [
  {
    id: 1,
    title: 'Let My People Go Surfing',
    description: 'The Education of a Reluctant Businessman by Yvon Chouinard.',
    image: '/images/book1.jpg',
  },
  {
    id: 2,
    title: 'The Responsible Company',
    description: 'What We’ve Learned from Patagonia’s First 40 Years.',
    image: '/images/book2.jpg',
  },
  {
    id: 3,
    title: 'Tools for Grassroots Activists',
    description: 'Best Practices for Success in the Environmental Movement.',
    image: '/images/book3.jpg',
  },
  // Add more book objects as needed
];

const BooksPage = () => (
  <div className="bg-gray-50 min-h-screen">
    {/* Hero Section */}
    <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: "url('/images/hero-books.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold">Books</h1>
      </div>
    </div>

    {/* Books Grid */}
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  </div>
);

export default BooksPage;
