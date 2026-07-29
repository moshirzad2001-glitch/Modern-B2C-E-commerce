"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addone, defaultvalue, removefromcard, removeone } from "@/redux/createslice";
import Image from "next/image";
import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const router = useRouter()
  const cartItems: defaultvalue[] = useAppSelector((item) => item.cart.card);
  const [loading, setLoading] = useState(false);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const handleCheckout = async () => {
    setLoading(true);
    const response = await axios.post("/api/checkout", { cartItems });
    const data = response.data;

    if (data && data.url) {
      window.location.href = data.url;
    } else {
      setLoading(false)

    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased text-gray-900">
      <span onClick={() => router.back()} className="flex items-center text-primary-text hover:opacity-65 m-2">
        <ArrowLeft /> Go Back
      </span>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold tracking-tight mb-8">
          Shopping Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xl text-gray-500 mb-6">Your cart is empty.</p>

            <Link
              href="/search"
              className="  px-6 py-3 h-10 w-10 bg-primary-text text-white rounded-xl font-medium"
            >
              {" "}
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              {cartItems?.map((item) => (
                <div
                  key={item.name}
                  className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 sm:items-center justify-between transition-all hover:shadow-md"
                >
                  <div className="flex gap-4 items-center">
                    {/* Product Image */}
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={150}
                      height={150}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl bg-gray-100 shrink-0"
                    />

                    {/* Product Details */}
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg text-gray-900 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="font-bold text-indigo-600 mt-1 sm:hidden">
                        £{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-8 border-t sm:border-t-0 pt-3 sm:pt-0">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                      <button
                        onClick={() => {
                          dispatch(removeone(item));
                        }}
                        disabled={item.quantity <= 1 || loading}
                        className="px-3 py-1 disabled:opacity-30 font-medium"
                      >
                        -
                      </button>
                      <span className="px-2 text-sm font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        disabled={loading}
                        onClick={() => {
                          dispatch(addone(item));
                        }}
                        className="px-3 py-1 text-gray-500 hover:text-gray-700 font-medium"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right hidden sm:block min-w-20">
                      <p className="font-bold text-lg">
                        £{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="destructive"
                      disabled={loading}
                      onClick={() => {
                        // REDUX LINK: dispatch(removeItem(item.id))
                        dispatch(removefromcard(item));
                      }}
                      className=" rounded-sm hover:bg-red-50 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-8">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 border-b border-gray-100 pb-6 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    £{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>E-Commerce Tax</span>
                  <span className="font-semibold text-gray-900">
                    £{tax.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center py-6">
                <span className="text-base font-bold">Total</span>
                <span className="text-2xl font-black text-yellow-500 hover:opacity-85">
                  £{total.toFixed(2)}
                </span>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={loading}

                className="w-full bg-[#FFD814] text-gray-950 rounded-full py-2.5"
              >
                {loading ? "Processing Secure Checkout..." : "Proceed to Checkout"}
              </Button>

              <div className="mt-4 text-center">
                <Link
                  href="/search"
                  className="text-sm font-medium text-primary-text hover:opacity-65"
                >
                  or Continue Shopping →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
