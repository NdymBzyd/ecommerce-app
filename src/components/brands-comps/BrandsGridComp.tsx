"use client"
import { Brand } from '@/app/types/brands.model';
import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
  } from "@/components/ui/card"

import Image from 'next/image';
import Link from 'next/link';


export default function BrandsGridComp({ brand }: { brand: Brand[] }) {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2">
        {brand.map((brand) =>
          <>
                          <Link href={`/brands/${brand._id}`}>
            <Card key={brand._id} className='relative group overflow-hidden'>
                  <CardContent>
                      <div className="relative w-full h-[120px]">
                          <Image src={brand.image} alt={brand.name} fill sizes='(max-width:768px) 100vw , (max-width:1200px) 50vw , 25vw'/>
                      </div>
                  </CardContent>
                  
                <CardFooter className='flex-col items-start gap-1'>
                  <p className='font-bold'>{brand.name}</p>
                </CardFooter>
              </Card>
              </Link>


          </>
        )}

      </div>
    </>
  )
}
