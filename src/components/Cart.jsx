import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [authUser] = useAuth();

  const handleQuantityChange = (bookId, newQuantity) => {
    updateQuantity(bookId, newQuantity);
  };

  const handleRemoveItem = (bookId, bookName) => {
    removeFromCart(bookId);
    toast.success(`${bookName} removed from cart`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared");
  };

  const handleCheckout = () => {
    if (!authUser) {
      toast.error("Please login to proceed with checkout");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    // Here you can implement actual checkout logic
    toast.success("Checkout functionality coming soon!");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Your Cart is Empty</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Looks like you haven't added any books to your cart yet.
          </p>
          <Link
            to="/course"
            className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-700 duration-200"
          >
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20">
      <div className="max-w-screen-xl container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold dark:text-white">Shopping Cart</h1>
          <button
            onClick={handleClearCart}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 duration-200"
          >
            Clear Cart
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between border-b pb-4 last:border-b-0"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold dark:text-white">{item.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{item.title}</p>
                    <div className="badge badge-outline mt-1">{item.category}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white w-8 h-8 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500"
                    >
                      -
                    </button>
                    <span className="font-semibold dark:text-white w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white w-8 h-8 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-lg font-bold dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id, item.name)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold dark:text-white">
                Total: ${getTotalPrice().toFixed(2)}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/course"
                className="flex-1 bg-gray-500 text-white text-center py-3 rounded-md hover:bg-gray-700 duration-200"
              >
                Continue Shopping
              </Link>
              <button
                onClick={handleCheckout}
                className="flex-1 bg-pink-500 text-white py-3 rounded-md hover:bg-pink-700 duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
