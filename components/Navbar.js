// components/Navbar.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar({ totalQuantity = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
      <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        {/* Clickable Logo */}
        <Link href="/" passHref>
          <div className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-black transition">
            FAR
          </div>
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-gray-700">
          <li>
            <Link href="/" passHref>
              <span className="hover:text-black cursor-pointer transition">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/books" passHref>
              <span className="hover:text-black cursor-pointer transition">Shop</span>
            </Link>
          </li>
          <li>
            <Link href="/about" passHref>
              <span className="hover:text-black cursor-pointer transition">About</span>
            </Link>
          </li>
          <li>
            <Link href="/contact" passHref>
              <span className="hover:text-black cursor-pointer transition">Contact</span>
            </Link>
          </li>
        </ul>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Link href="/login" passHref>
            <div className="relative group cursor-pointer hover:scale-105 transition-transform">
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0" />
              </svg>
              <span className="absolute left-1/2 -translate-x-1/2 top-8 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Login</span>
            </div>
          </Link>

          <Link href="/bag" passHref>
            <div className="relative group cursor-pointer hover:scale-105 transition-transform">
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1.5 11.25a2 2 0 01-1.99 1.75H8.49a2 2 0 01-1.99-1.75L5 9z" />
              </svg>
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
              <span className="absolute left-1/2 -translate-x-1/2 top-8 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Shopping Bag</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
