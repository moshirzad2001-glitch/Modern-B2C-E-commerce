"use client";

import { useAppDispatch } from "@/redux/hooks";
import { addtocard } from "@/redux/createslice";
import { useState } from "react";
import { Button } from "./button";
import { ShoppingBag } from "lucide-react";
export default function addtocardbutton({
  productName,
  productPrice,
  productImage,
}: {
  productName: string;
  productPrice: number;
  productImage: string;
}) {
  const dispatch = useAppDispatch();
  const [isadded, setIsAdded] = useState(false);
  const handleaddtocard = () => {
    dispatch(
      addtocard({
        name: productName,
        price: productPrice,
        image: productImage,
      }),
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };
  return (
    <Button
      onClick={handleaddtocard} className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2 ${isadded ? 'bg-green-600 text-white font-semibold scale-105' : 'bg-black text-white hover:bg-zinc-800'}`} > <span> {isadded ? ' Added to Bag' : 'Add to Bag'} </span>
    </Button>
  );
}


