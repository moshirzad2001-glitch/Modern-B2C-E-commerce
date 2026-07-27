"use client";

import { useAppDispatch } from "@/redux/hooks";
import { addtocard } from "@/redux/createslice";
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
  const handleaddtocard = () => {
    dispatch(
      addtocard({
        name: productName,
        price: productPrice,
        image: productImage,
      }),
    );
  };
  return (
    <Button
      onClick={handleaddtocard}
      className="w-full bg-primary-text text-white hover:bg-[#0052CC] text-[10px] sm:text-xs font-medium uppercase py-2.5 h-auto tracking-wider rounded-sm shadow-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn"
    >
      <ShoppingBag className="w-3.5 h-3.5 stroke-[1.8] transition-transform duration-200 group-hover/btn:-translate-y-0.5" />
      Add To Bag
    </Button>
  );
}


