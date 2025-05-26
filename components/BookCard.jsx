export default function BookCard({ book }) {
    return (
      <div className="p-4">
        <img src={book.image} alt={book.title} className="w-full h-64 object-cover rounded-xl" />
        <h3 className="text-lg mt-2 font-semibold">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.category}</p>
        <p className="mt-1 font-bold">${book.price}</p>
      </div>
    );
  }
  