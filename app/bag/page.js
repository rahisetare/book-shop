// app/bag/page.js
"use client";

import { useState, useEffect } from "react";

export default function BagPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (id, delta) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, Math.min(10, item.quantity + delta));
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Bag</h1>

      {cart.length === 0 ? (
        <p className="text-center text-lg">Your bag is empty.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full md:w-48 h-64 object-cover"
                />
              )}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <p className="text-sm text-gray-600">{item.author}</p>
                  <p className="text-base font-semibold mt-1">
                    ${item.price} × {item.quantity} = ${
                      item.price * item.quantity
                    }
                  </p>
                </div>
                <div className="flex items-center mt-2 gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="text-right text-xl font-bold mt-4">
            Total: ${totalPrice.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}
