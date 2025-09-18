import { getProducts } from '@/actions/products.action'
import ProductsGrid from '@/components/products-components/ProductsGrid'
import React from 'react'
import Link from 'next/link';

export default async function ThankYouPage() {

  const {data : products} = await getProducts()


  return (
    <>
      <div className="mx-auto container">
        <div className='mx-auto border-1 bg-slate-50 rounded-md p-8'>
        <h1 className='text-4xl font-bold text-start'>Thank you!</h1>
          <p className='text-lg text-slate-500'>Your order has been placed successfully. An email will shortly be sent with a copy of the receipt.</p>
          <p className='text-lg text-slate-500'>You can check the status of your order <Link href='/allorders'><span className='cursor-pointer text-blue-400 font-thin'>here</span></Link> </p>
</div>
        <ProductsGrid products={products}/>
      </div>
        
    </>
  )
}