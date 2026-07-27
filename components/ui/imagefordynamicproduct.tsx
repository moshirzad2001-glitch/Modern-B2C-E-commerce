"use client"

import { productitself } from '@/tanstack data/tanstack'
import Image from 'next/image'
import React, { useState } from 'react'

const Imagefordynamicproduct = ({data}:{data:productitself}) => {
    const [showingimage,setimage] = useState<string>(data.images[0])
  return (
    <div className='flex flex-col gap-2'>
        <div className='w-full rounded-lg border shadow'>
            <Image src={showingimage} alt={data.title} width={500} height={500} className=" hover:scale-120  transition-all duration-300" />
        </div>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {data.images?.map((img:string, index:number) => (
            <Image key={index} onClick={()=>setimage(img)} src={img} alt="" width={150} height={150} className="w-full hover:cursor-pointer h-16 object-cover border rounded" />
          ))}
        </div>
      </div>
  )
}

export default Imagefordynamicproduct