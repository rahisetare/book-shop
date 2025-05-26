"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const books = [
  {
    title: "Shahnameh",
    image: "/images/books/shahnameh.jpg",
    slug: "shahnameh",
  },
  {
    title: "Divan of Hafez",
    image: "/images/books/hafez.jpg",
    slug: "hafez",
  },
  {
    title: "The Blind Owl",
    image: "/images/books/blind-owl.jpg",
    slug: "blind-owl",
  },
  {
    title: "Conference of the Birds",
    image: "/images/books/conference.jpg",
    slug: "conference",
  },
];

export default function BookSection() {
  return (
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900 mb-10">Books</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book, i) => (
            <motion.div
              key={book.slug}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href={`/books/${book.slug}`}>
                <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="mt-2 text-center text-gray-800 font-medium group-hover:underline">
                  {book.title}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
