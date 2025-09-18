"use client"
import { Categories } from '@/app/types/category.model'
import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
  } from "@/components/ui/card"

import Image from 'next/image';
import Link from 'next/link';


export default function CategoryGridComp({ category }: { category: Categories[] }) {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {category.map((cat) =>
          <>
            <Card key={cat._id} className='relative group overflow-hidden'>
              <Link href={`/categories/${cat._id}`}>
                  <CardContent>
                      <div className="relative w-full h-[320px]">
                          <Image src={cat.image} alt={cat.name} fill sizes='(max-width:768px) 100vw , (max-width:1200px) 50vw , 25vw'/>
                      </div>
                  </CardContent>
                  </Link>
                <CardFooter className='flex-col items-start gap-1'>
                  <p>{cat.name}</p>
                </CardFooter>
            </Card>

          </>
        )}

      </div>
    </>
  )
}
