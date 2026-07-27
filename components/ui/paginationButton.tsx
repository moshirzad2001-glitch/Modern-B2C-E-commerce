"use client"

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "./button";
import { useTransition } from "react";

const PaginationButton = ({ totalPages, currentPage }: { totalPages: number; currentPage: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
    const [ispending, starttransition] = useTransition();

  // Directly sets the URL to the exact page clicked
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (page && page > 0) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }
    starttransition(()=>{
      router.push(`/search?${params.toString()}`);
    })
    
  };

  return (
    <div className="flex justify-center items-center gap-2 pt-6 border-t border-gray-100 font-sans"> 
      {(() => {
        // 1. Generate an array of all page numbers [1, 2, 3, ... totalPages]
        const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);

        // 2. Filter or transform them into a truncated list
        const pages: (number | string)[] = allPages.reduce<(number | string)[]>((acc, page) => {
          // Always include first and last pages
          if (page === 1 || page === totalPages) {
            return [...acc, page];
          }

          // Include pages immediately around the current page
          if (page >= currentPage - 1 && page <= currentPage + 1) {
            return [...acc, page];
          }

          // Add left ellipsis if we just passed page 1
          if (page === 2 && currentPage > 3) {
            return [...acc, '...'];
          }

          // Add right ellipsis if we are just before the last page
          if (page === totalPages - 1 && currentPage < totalPages - 2) {
            return [...acc, '...'];
          }

          return acc;
        }, []);

        // 3. Render the computed array
        return pages.map((pageNumber, idx) => {
          if (pageNumber === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-400">
                ...
              </span>
            );
          }

          // Safely cast to number since '...' is handled above
          const numericPage = pageNumber as number;
          const isActive = numericPage === currentPage;

          return (     

           
               <Button
              key={`page-${numericPage}`}
              onClick={() => handlePageChange(numericPage)}
              className={`w-8 h-8 flex ${ispending ? "opacity-60" : ""} items-center justify-center text-xs font-medium border rounded-md transition-all ${
                isActive 
                  ? "bg-slate-900 border-slate-900 text-white shadow-xs pointer-events-none" 
                  : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
              }`}
            >
              {numericPage} 
            </Button>

          );
        });
      })()}
    </div>
  );
};

export default PaginationButton;