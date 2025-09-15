import React from 'react'
import { useCart } from '../context/CartProvider'
import { useAuth } from '../context/AuthProvider'
import toast from 'react-hot-toast'

export default function Card({ item }) {
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
            <div className='mt-4 my-3 p-3'>
                <div className="card bg-base-100 w-96 shadow-sm  hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
                    <figure>
                        <img
                            src={item.image}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {item.name}
                            <div className="badge badge-secondary">{item.category}</div>
                        </h2>
                        <p className='text-left'>{item.title}</p>
                        <div className="card-actions justify-between mt-10">
                            <div className="badge badge-outline border-black mr-5">${item.price}</div>
                            <div 
                                className="border border-black cursor-pointer rounded-full hover:bg-pink-500 duration-200 px-2 py-1"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
