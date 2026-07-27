"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Menu, ShoppingBag } from "lucide-react";
import { BrandLogo } from "./brandlogo";
import { Button } from "./button";
import { TooltipContent, TooltipTrigger, Tooltip } from "./tooltip";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";

const header = () => {
  const pathname = usePathname();
  const data = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/search" },
  ];
  const [mounted,setMounted] = useState(false)
  useEffect(()=>{
    setMounted(true)
  },[])
  const cartitems = useAppSelector((item) => item.cart.card.length);
  return (
    <div className="flex items-center  border-b justify-between z-50 p-4 bg-slate-800">
      <div className="flex  items-center justify-center gap-4">
        <div className="lg:hidden flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="rounded-md transition-all duration-200"
              align="end"
            >
              {data.map(
                (Head: { name: string; href: string }, index: number) => {
                  const isactive = pathname === Head.href;
                  return (
                    <DropdownMenuItem key={Head.href} asChild>
                      <Link
                        href={Head.href}
                        aria-current={isactive ? "page" : undefined}
                        className={`p-4 ${isactive ? "bg-secondary-text" : ""}`}
                      >
                        {Head.name}
                      </Link>
                    </DropdownMenuItem>
                  );
                },
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <BrandLogo />
        <div className="hidden lg:flex gap-5 px-6">
          {data.map((Head: { name: string; href: string }, index: number) => {
            const isactive = pathname === Head.href;
            return (
              <Link
                href={Head.href}
                key={index}
                aria-current={isactive ? "page" : undefined}
                className={`px-4 text-slate-300 ${isactive ? "hover:cursor-pointer bg-secondary-text/20 rounded-sm" : ""}`}
              >
                {Head.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger className=" relative">
            <Link
              href="/cart"
              className="p-1.5 bg-primary-text text-backround w-7.5 h-7.5  flex items-center justify-center rounded-sm"
            >
              <ShoppingBag />
            </Link>
            {
              mounted && cartitems > 0 && (
                <span
              className={`absolute -top-2 -right-2 text-xs ${cartitems > 0 ? "bg-white text-black" : ""} w-5 h-5 rounded-full flex items-center transition-all duration-200 justify-center`}
            >
              {cartitems > 0 ? cartitems : ""}
            </span>
              )
            }
          </TooltipTrigger>
          <TooltipContent className="transition-all duration-300 rounded-sm ">
            Cart
          </TooltipContent>
        </Tooltip>
        <Show when="signed-out">
          <SignInButton>
            <Button className="cursor-pointer">Sign In</Button>
          </SignInButton>
          <SignUpButton>
            <Button className="cursor-pointer">Sign Up</Button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </div>
  );
};

export default header;
