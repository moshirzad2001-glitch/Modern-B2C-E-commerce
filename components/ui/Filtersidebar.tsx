"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import useTanstack from "@/tanstack data/tanstack";
import { ChevronDown, Star } from "lucide-react";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import { useTransition } from "react";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { cn } from "@/lib/utils";

interface SidebarProps {
  currentCategory: string | undefined;
  brand?: string[];
}

export default function FilterSidebar({
  currentCategory,
  brand,
}: SidebarProps) {
  const router = useRouter();
  const searchparams = useSearchParams();
  const { catagorybringing } = useTanstack();
  const [ispending, starttransition] = useTransition();
  const brandparams = searchparams.get("brands") || "";
  const currenturlcategory = searchparams.get("category") || "";
  const currentorder = searchparams.get("order") ?? "";
  const selectedbrands = brandparams ? brandparams.split("*") : [];
  const currentRating = searchparams.get("rating") || "";
  const handleurlchange = (
    newCatagory?: string,
    checked?: boolean,
    brandName?: string,
    order?: string,
    rating?: number,
  ) => {
    const params = new URLSearchParams(searchparams.toString());
    const isswicthcategory =
      newCatagory == "" || (newCatagory && newCatagory !== currenturlcategory);
    let updatedbrands: string[];

    if(brandName){
      params.delete('page')
    }

    if (isswicthcategory) {
      params.delete("brands");
      params.delete("order");
      params.delete("rating");
      params.delete('page')
    } else {
      // If caller explicitly passes brandName as empty string and leaves checked undefined,

      if (brandName === "" && checked === undefined) {
        params.delete("brands");
      } else if (brandName !== undefined && checked !== undefined) {
        if (checked) {
          updatedbrands = [...selectedbrands, brandName];
        } else {
          updatedbrands = selectedbrands.filter((item) => item !== brandName);
        }
        if (updatedbrands.length) {
          params.set("brands", updatedbrands.join("*"));
        } else {
          params.delete("brands");
        }
      }
    }
    const finalcategory = newCatagory ?? currentCategory;
    if (finalcategory) {
      params.set("category", finalcategory);
    } else {
      params.delete("category");
    }
    if (order === "") {
      params.delete("order");
    } else if (order !== undefined) {
      params.set("order", order);
    }

    if (currentRating === rating?.toString()) {
      params.delete("rating");
    } else if (rating !== undefined) {
      params.set("rating", rating.toString());
    }

    starttransition(() => {
      router.push(`/search?${params.toString()}`);
    });
  };
  const handlecategorychange = (category: string) => {
    handleurlchange(category, undefined, undefined, undefined);
  };
  const handleorderchange = (order: string) => {
    handleurlchange(undefined, undefined, undefined, order);
  };
  const ratingSteps = [4, 3, 2, 1];
  return (
    <div
      className={`space-y-6 min-w-0 flex sm:flex-col gap-10 w-full overflow-x-scroll sm:gap-0 sm:no-scrollbar p-4 border rounded-xs bg-card ${ispending ? "opacity-60" : ""}`}
    >
      {ispending && (
        <span className="text-xm text-muted-foreground animate-pulse">
          Updating...
        </span>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold mb-2">Active Category</h3>
        <p className="text-sm text-muted-foreground capitalize">
          {currentCategory ?? "all"}
        </p>
      </div>
      <div className="flex flex-col ">
        <span className="mb-2 sm:my-3">Change Category</span>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex " asChild>
            <Button>
              {currentCategory} <ChevronDown className="w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="scrollbar-thin rounded-md">
             <DropdownMenuItem
                onClick={() => handlecategorychange('')}
              
              >
                All
              </DropdownMenuItem>
            {catagorybringing?.map((item) => (
              <DropdownMenuItem
                onClick={() => handlecategorychange(item.slug)}
                key={item.slug}
              >
                {item.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold mb-2">Customer Reviews</h3>

        {currentCategory &&
          ratingSteps.map((rating) => {
            const isSelected = currentRating === rating.toString();

            return (
              <button
                key={rating}
                onClick={() =>
                  handleurlchange(
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    rating,
                  )
                }
                className={cn(
                  "flex items-center gap-2 text-sm text-left p-1 rounded-md transition-colors hover:bg-accent group w-full",
                  isSelected && "font-semibold text-primary bg-accent/50",
                )}
              >
                <div className="flex items-center text-amber-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={cn(
                        "h-4 w-4 transition-transform group-hover:scale-110",
                        // Fill the star if its index is less than the tier row
                        index < rating
                          ? "fill-amber-500 text-amber-500"
                          : "text-muted-foreground/30",
                      )}
                    />
                  ))}
                </div>

                <span className="text-muted-foreground group-hover:text-foreground text-xs">
                  & Up
                </span>
              </button>
            );
          })}
      </div>

      <div className="flex flex-col gap-2 ">
        <h3 className="font-semibold mb-2">Price Order</h3>
        {currentCategory && (
          <RadioGroup
            defaultValue="option-one"
            value={currentorder}
            onValueChange={handleorderchange}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem
                onClick={() => handleorderchange("highest")}
                value="highest"
                id="option-one"
              />
              <Label className="text-sm font-medium" htmlFor="option-one">
                Highest Price
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                onClick={() => handleorderchange("lowest")}
                value="lowest"
                id="option-two"
              />
              <Label className="text-sm font-medium" htmlFor="option-two">
                Lowest Price
              </Label>
            </div>
          </RadioGroup>
        )}
      </div>

      <div className="space-y-2 flex flex-col gap-2">
        <h3 className="font-semibold">Brand Filter</h3>

        {brand?.map((brandName, index: number) => {
          const isChecked = selectedbrands.includes(brandName);

          return (
            <div key={index} className="flex items-center space-x-2">

              <Checkbox
                id={`brand-${index}`}
                checked={isChecked}
                onCheckedChange={(checked) =>
                  handleurlchange(undefined, checked === true, brandName)
                }
              />
              <Label
                htmlFor={`brand-${index}`}
                className="text-sm font-medium cursor-pointer select-none"
              >
                {brandName}
              </Label>
            </div>
          );
        })}

        <Button onClick={() => handleurlchange(undefined, undefined, '')}>Clear Brands</Button>

      </div>
    </div>
  );
}
