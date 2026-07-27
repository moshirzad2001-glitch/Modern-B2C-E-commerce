"use client";

import Link from "next/link";
import { XCircle, ShoppingBag, ArrowLeft } from "lucide-react";

export default function CancelPage() {
  return (
    <main className="max-w-md mx-auto text-center p-8 mt-16 bg-white border border-gray-100 rounded-2xl shadow-md font-sans">
      {/* Red Error/Warning Icon Anchor */}
      <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 text-red-600 rounded-full text-2xl mb-4">
        <XCircle className="w-6 h-6 stroke-[2.5]" />
      </div>

      <h1 className="text-2xl font-black text-gray-950 tracking-tight">
        Checkout Cancelled
      </h1>
      
      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
        Your payment session was closed, and your card was not charged. Don't worry—your items are still safe in your shopping basket!
      </p>

      {/* Action Navigation Box Options */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Link 
          href="/cart" 
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-950 font-medium text-sm rounded-full shadow-xs transition-colors border border-[#FCD200]"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Basket
        </Link>
        
        <Link 
          href="/search" 
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-full transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          Keep Shopping
        </Link>
      </div>
    </main>
  );
}
