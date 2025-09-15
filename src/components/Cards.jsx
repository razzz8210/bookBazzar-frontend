import React from "react";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Cards({ item }) {
  const { addToCart } = useCart();
  const [authUser] = useAuth();

  const handleAddToCart = () => {
    if (!authUser) {
      toast.error("Please login to add items to cart");
      return;
    }
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img src={item.image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions justify-between">
              <div className="badge badge-outline">${item.price}</div>
              <div 
                className=" cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200"
                onClick={handleAddToCart}
              >
                Add to Cart
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
