interface paramprop {
  params: Promise<{ product: string }>;
}

import Imagefordynamicproduct from "@/components/ui/imagefordynamicproduct";
import { productitself } from "@/tanstack data/tanstack";
import { ChevronLeft } from "lucide-react";
import AddToCardButton from "@/components/ui/addtocardbutton";
import Link from "next/link";
export default async function page({ params }: paramprop) {
  const { product } = await params;
  const res = await fetch(`https://dummyjson.com/products/${product}`);
  const data: productitself = await res.json();

  return (
    <section className="flex flex-col gap-2">
      <div>
        <Link
          href={`/search?category=${data.category}`}
          className="p-3 inline-flex gap-2 hover:opacity-55"
        >
          <ChevronLeft />
          Go Back To Related Products
        </Link>
      </div>
      <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Imagefordynamicproduct data={data} />
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-secondary px-2 py-1 rounded">
            {data.category}
          </span>
          <h1 className="text-3xl font-bold mt-2">{data.title}</h1>
          <p className="text-2xl font-bold text-green-600 mt-2">
            ${data.price}
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed">
            {data.description}
          </p>

          <div className="mt-6 border-t pt-4 text-sm text-gray-500 space-y-1">
            <p>🌟 Rating: {data.rating} / 5</p>
            <p>📦 Stock Remaining: {data.stock} items</p>
            <p>🏢 Brand: {data.brand}</p>
          </div>

          <div className="mt-3">
            <AddToCardButton
            productName={data.title}
            productPrice={data.price}
            productImage={data.thumbnail}
          />
          </div>


        </div>
      </div>
    </section>
  );
}
