"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { clearcard } from "@/redux/createslice";
import { useAppDispatch } from "@/redux/hooks";
export default function SuccessPagecontent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
    const dispatch = useAppDispatch()
  useEffect(() => {
   dispatch( clearcard())
    console.log("Stripe Tracking Session ID:", sessionId);
  }, [sessionId]);

  return (
    <main className="max-w-md mx-auto text-center p-8 mt-16 bg-white border border-gray-100 rounded-2xl shadow-md font-sans">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-700 rounded-full text-2xl mb-4 font-bold">
        ✓
      </div>
      <h1 className="text-2xl font-black text-gray-950 tracking-tight">
        Payment Successful!
      </h1>
      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
        Thank you for your purchase. Your sandbox order has been processed securely via Stripe.
      </p>
      
      <Link 
        href="/search" 
        className="inline-block mt-6 px-6 py-2.5 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-950 font-medium text-sm rounded-full shadow-xs transition-colors border border-[#FCD200]"
      >
        Continue Shopping →
      </Link>
    </main>
  );
}