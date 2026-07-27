import { productitself } from "@/tanstack data/tanstack";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import AddToCardButton from "./addtocardbutton";

import Image from "next/image";
import Link from "next/link";


interface GridProps {
  displayedProducts: productitself[];

}
export default async function ProductGrid({
  displayedProducts,
}: GridProps) {

  return (
    <div>
      {displayedProducts.length === 0 && (
        <h3 className="text-lg pt-5 text-muted-foreground mb-4">
          Please Change your Filter to Find Suitable Product.
        </h3>
      )}
      {displayedProducts.length !== 0 && (
        <p className="text-sm text-muted-foreground mb-4">
          Showing {displayedProducts.length} items
        </p>
      )}

      <div className="w-full grid grid-cols-2 sm:grid-cols-2 place-items-center md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 ">
        {displayedProducts.map((product: productitself) => {
          const productPrice = Number(product.price) || 0;
          const wholePounds = Math.floor(productPrice);
          const penceString = ((productPrice % 1) * 100)
            .toFixed(0)
            .padStart(2, "0");

          const ratingNumber = Number(product.rating) || 0;
          const discountNumber = Number(product.discountPercentage) || 0;
          return (
            <Card
              key={product.id}
              className="group relative w-full h-full flex flex-col justify-between overflow-hidden border border-gray-200 bg-white rounded-md shadow-xs transition-shadow duration-200 hover:shadow-md font-sans"
            >
              <CardHeader className="p-2 pb-0 flex flex-row items-center justify-between z-10 absolute top-2 left-2 pointer-events-none">
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider bg-white/90 backdrop-blur-sm border border-gray-200 px-1.5 py-0.5 rounded-xs">
                  SKU-{String(product.id).padStart(4, "0")}
                </span>
              </CardHeader>

              {/* Absolute Right Top: Real Amazon Badges */}
              <div className="absolute top-2 right-2 z-10 flex flex-col gap-1 items-end pointer-events-none">
                {/* PREMIUM PICK: Exceptional rating 4.8 or above */}
                {ratingNumber >= 4.8 && (
                  <span className="bg-slate-900 text-amber-400 text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-xs shadow-xs border border-amber-400/20">
                    ★ Premium Pick
                  </span>
                )}

                {/* BEST SELLER: Great rating between 4.4 and 4.79 */}
                {ratingNumber >= 4.4 && ratingNumber < 4.8 && (
                  <span className="bg-[#E47911] text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-xs shadow-xs">
                    Best Seller
                  </span>
                )}

                {/* LIMITED TIME DEAL: Discount is greater than 15% */}
                {discountNumber >= 15 && (
                  <span className="bg-[#CC0C39] text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-xs shadow-xs">
                    {discountNumber.toFixed(0)}% Off Deal
                  </span>
                )}
              </div>

              {/* Product Image Container */}
              <div className="relative w-full h-44 sm:h-52 flex items-center justify-center p-4 bg-gray-50 rounded-t-md transition-colors duration-300 group-hover:opacity-95">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={160}
                  height={160}
                  fetchPriority="high"
                  className="object-contain max-h-full max-w-full p-2 transition-transform duration-500 group-hover:scale-102 mix-blend-multiply"
                />
              </div>

              <CardContent className="p-3 flex-1 flex flex-col justify-between gap-2 bg-white">
                <div className="space-y-1">
                  <Link
                    href={`/search/${product.id}`}
                    className="text-xs sm:text-sm font-medium text-gray-950 line-clamp-2 hover:text-orange-700 leading-tight block wrap-break-word"
                  >
                    {product.title}
                  </Link>

                  <p className="text-[11px] text-gray-500 line-clamp-1">
                    {product.brand || product.description}
                  </p>
                </div>

                <div className="flex flex-col gap-1 mt-auto pt-1">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center text-amber-500 text-xs">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span className="text-gray-300">★</span>
                    </div>
                    <span className="text-[11px] text-cyan-700 hover:text-orange-700 cursor-pointer font-medium">
                      {ratingNumber.toFixed(1)}
                    </span>
                  </div>

                  {/* Pricing Display */}
                  <div className="flex items-baseline">
                    <span className="text-xs font-semibold pr-0.5 align-top text-gray-950">
                      £
                    </span>
                    <span className="text-lg sm:text-2xl font-bold tracking-tight leading-none text-gray-950">
                      {wholePounds}
                    </span>
                    <span className="text-xs font-semibold align-top text-gray-950">
                      {penceString}
                    </span>
                  </div>
                </div>
              </CardContent>

              {/* Action Button Container */}
              <CardFooter className="p-3 pt-0 bg-white w-full">
                <AddToCardButton
                  productName={product.title}
                  productPrice={product.price}
                  productImage={product.thumbnail}
                />
              </CardFooter>
            </Card>
          );
        })}
      </div>

    </div>
  );
}
