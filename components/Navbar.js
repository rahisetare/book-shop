"use client";
import Link from "next/link";

export default function Navbar({ isScrolled }) {
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
      <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-gray-800">FAR</div>
        <ul className="flex space-x-6 text-gray-700">
          {["Home", "Shop", "About", "Contact"].map((item) => (
            <li key={item} className="hover:text-black cursor-pointer transition">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
