import { getBrands } from '@/actions/brand.action';
import React from 'react'
import BrandsGridComp from './BrandsGridComp';

export default async function BrandsGrid() {
  const response = await getBrands()
  console.log(response, "response from brands grid");
  


  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-start text-4xl tracking-tighter my-7 font-extrabold">All Brands</h1>
        <div>
        <BrandsGridComp brand={response?.data}/>
        </div>
      </div>

    </>
  )
}
