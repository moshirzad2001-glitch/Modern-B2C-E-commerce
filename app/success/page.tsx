import { Suspense } from "react";
import SuccessPagecontent from "@/components/ui/successcontent";

export default function successPage (){
  return(
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Suspense fallback={<p>Loading pyament Details</p>}> <SuccessPagecontent/></Suspense>
     
    </main>
  )
}