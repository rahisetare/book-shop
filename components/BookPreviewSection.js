import Link from "next/link";

export default function BookPreviewSection() {
  return (
    <section className="px-6 py-12 bg-white">
      <div className="max-w-6xl mx-auto"> {/* Corrected the typo here */}
        <h2 className="text-3xl font-bold mb-4">Books of Persia</h2>
        <p className="text-gray-600 mb-6">Explore a curated collection of classic and contemporary Iranian books.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Replace with real book images and links */}
          <Link href="/books/book-1">
            <div className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition">
              <img
                src="/images/book1.jpg"
                alt="Book Title"
                className="w-full h-auto transform group-hover:scale-105 transition duration-300"
              />
            </div>
          </Link>

          <Link href="/books/book-1">
            <div className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition">
              <img
                src="/images/book1.jpg"
                alt="Book Title"
                className="w-full h-auto transform group-hover:scale-105 transition duration-300"
              />
            </div>
          </Link>

          <Link href="/books/book-1">
            <div className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition">
              <img
                src="/images/book1.jpg"
                alt="Book Title"
                className="w-full h-auto transform group-hover:scale-105 transition duration-300"
              />
            </div>
          </Link>

          <Link href="/books/book-1">
            <div className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition">
              <img
                src="/images/book1.jpg"
                alt="Book Title"
                className="w-full h-auto transform group-hover:scale-105 transition duration-300"
              />
            </div>
          </Link>
        </div>
        <div className="mt-8">
          <Link href="/books">
            <span className="inline-block bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition">
              Explore More Books →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
