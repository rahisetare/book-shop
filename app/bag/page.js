"use client";

import { useEffect, useState } from "react";

export default function Bag() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  // Fetch cart from server on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart/load");
        if (res.ok) {
          const data = await res.json();
          setCartItems(data.cartItems);
          updateSubtotal(data.cartItems);
        } else {
          // fallback to localStorage for guests
          const storedCart = localStorage.getItem("cart");
          if (storedCart) {
            const parsed = JSON.parse(storedCart);
            setCartItems(parsed);
            updateSubtotal(parsed);
          }
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };

    fetchCart();
  }, []);

  const updateSubtotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubtotal(total);
  };

  const saveCartToServer = async (items) => {
    try {
      await fetch("/api/cart/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: items }),
      });
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    updateSubtotal(updatedItems);
    saveCartToServer(updatedItems); // sync with server
  };

  const increaseQuantity = (bookId) => {
    const updated = cartItems.map((item) =>
      item.id === bookId && item.quantity < 10
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCart(updated);
  };

  const decreaseQuantity = (bookId) => {
    const updated = cartItems.map((item) =>
      item.id === bookId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(updated);
  };

  const removeItem = (bookId) => {
    const updated = cartItems.filter((item) => item.id !== bookId);
    updateCart(updated);
  };

  return (
    <div className="max-w-6xl mx-auto mt-24 px-4">
      <h1 className="text-3xl font-bold mb-10">Your Shopping Bag</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section – Product List */}
        <div className="md:col-span-2 border border-gray-300 rounded-lg p-6 min-h-[200px]">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 italic">Your bag is empty. Add books to see them here.</p>
          ) : (
            <ul className="space-y-6">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-20 h-28 object-cover rounded border"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.author}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-2 py-1 border rounded text-sm hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-2 py-1 border rounded text-sm hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-sm mt-2 hover:underline"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-sm">${item.price.toFixed(2)} each</p>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Section – Order Summary */}
        <div className="border border-gray-300 rounded-lg p-6 h-fit bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Shipping</span>
            <span>$0.00</span>
          </div>
          <div className="border-t border-gray-300 my-4"></div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button
            className="mt-6 w-full py-3 rounded bg-black text-white font-semibold"
            disabled={cartItems.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
