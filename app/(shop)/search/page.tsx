import FilterSidebar from "@/components/ui/Filtersidebar";
import ProductGrid from "@/components/ui/productgrid";
import { productshape } from "@/tanstack data/tanstack";
import PaginationButton from "@/components/ui/paginationButton";
interface SearchPageProp {
  searchParams: Promise<{
    category?: string;
    brands?:string;
    order?:string;
    rating?:string;
    page?:string
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProp) {
  const resolvedparams = await searchParams;
  const currentcatagory = resolvedparams?.category;
  const selectedBrand = resolvedparams?.brands?.split("*");
  const rating = resolvedparams.rating;
  const order = resolvedparams.order
  const page = Number(resolvedparams.page)

  const apiUrl = currentcatagory ? `https://dummyjson.com/products/category/${currentcatagory}`
  : `https://dummyjson.com/products?limit=0&sortBy=title&order=asc&select=title,price,sku,rating,thumbnail,description`

  const res = await fetch(apiUrl);
  const data:productshape = await res.json();

  const brands:string[] = Array.from(
    new Set(
      data?.products
        ?.map((item) => item?.brand)
        .filter((brand): brand is string => typeof brand === "string"),
    ),
  );
  const firstfilteredProducts = data.products.filter((item)=>{
    const filteredcatagory = currentcatagory ? item?.category === currentcatagory : true;
    const filteredbrand = selectedBrand ? typeof item.brand ==="string" && selectedBrand.includes(item?.brand) : true
    const ratinfiltering = rating ? item.rating >= Number(rating) : true
    return filteredbrand && filteredcatagory && ratinfiltering
  })

  const filteredProducts = firstfilteredProducts?.sort((a,b)=>{
    if (order === 'highest') {
      return b.price - a.price;
    }
    if (order === 'lowest') {
      return a.price - b.price;
    }
    return 0;
  });
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page) || 1;
  const itemsperpage = 30;
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsperpage);
  const startIndex = (currentPage - 1) * itemsperpage;
  const endIndex = startIndex + itemsperpage;
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="flex sm:flex-row flex-col gap-8 w-full  p-6">
      <aside className="w-full sm:w-55 md:w-64 shrink-0 ">
        <FilterSidebar
          currentCategory={currentcatagory}
         brand = {brands}
        />
      </aside>

      {/* Right Column: The filtered results display */}
      <main className="flex-1 sm:w-[60%]">
        <h1 className="text-2xl font-bold mb-4 capitalize">
          Results for "{currentcatagory}" 

        </h1>

       <div>
        <span className="text-olive-400">totally {totalItems} items</span>
         <ProductGrid
          displayedProducts={displayedProducts}
          
        />

        <PaginationButton totalPages={totalPages} currentPage={currentPage} />
       </div>
      </main>
    </div>
  );
}
